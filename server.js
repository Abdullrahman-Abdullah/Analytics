const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware للمصادقة
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// routes/user.js
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'المستخدم موجود بالفعل' });
    }
    
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // إنشاء المستخدم
    const user = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // إنشاء token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // التحقق من كلمة المرور
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
    
    // إنشاء token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

// routes/analysis.js
app.post('/api/analyze', authenticateToken, async (req, res) => {
  try {
    const { targetUsername, platform } = req.body;
    
    // التحقق من الحدود المسموحة حسب الاشتراك
    const user = await User.findById(req.user.userId);
    const analysisCount = await Analysis.countDocuments({ 
      userId: user._id, 
      requestedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
    });
    
    let maxAnalyses = 3; // الحد الافتراضي للباقة المجانية
    
    if (user.subscription.plan === 'personal') maxAnalyses = 10;
    if (user.subscription.plan === 'business') maxAnalyses = 50;
    if (user.subscription.plan === 'enterprise') maxAnalyses = 1000;
    
    if (analysisCount >= maxAnalyses) {
      return res.status(429).json({ error: 'تجاوزت الحد المسموح للتحليلات اليومية' });
    }
    
    // إنشاء طلب تحليل جديد
    const analysis = new Analysis({
      userId: user._id,
      targetUsername,
      platform,
      status: 'pending'
    });
    
    await analysis.save();
    
    // بدء عملية التحليل (خلفية)
    processAnalysis(analysis._id);
    
    res.json({ 
      message: 'طلب التحليل قيد المعالجة', 
      analysisId: analysis._id 
    });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

app.get('/api/analysis/:id', authenticateToken, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });
    
    if (!analysis) {
      return res.status(404).json({ error: 'لم يتم العثور على التحليل' });
    }
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

// وظيفة معالجة التحليل (خلفية)
async function processAnalysis(analysisId) {
  try {
    const analysis = await Analysis.findById(analysisId);
    if (!analysis) return;
    
    analysis.status = 'processing';
    await analysis.save();
    
    // محاكاة جمع البيانات من واجهات برمجة التطبيقات
    // في التطبيق الحقيقي، سيتم استبدال هذا بطلب APIs حقيقية
    const mockData = generateMockAnalytics(analysis.targetUsername);
    
    analysis.metrics = mockData.metrics;
    analysis.insights = mockData.insights;
    analysis.status = 'completed';
    analysis.completedAt = new Date();
    
    await analysis.save();
  } catch (error) {
    console.error('Error processing analysis:', error);
    await Analysis.findByIdAndUpdate(analysisId, { 
      status: 'failed' 
    });
  }
}

// توليد بيانات تحليل وهمية (لأغراض التجربة)
function generateMockAnalytics(username) {
  const followers = Math.floor(Math.random() * 100000) + 1000;
  const avgLikes = Math.floor(followers * (Math.random() * 0.05 + 0.01));
  const avgComments = Math.floor(avgLikes * 0.1);
  const engagementRate = ((avgLikes + avgComments) / followers * 100).toFixed(2);
  
  return {
    metrics: {
      followers,
      engagementRate: parseFloat(engagementRate),
      avgLikes,
      avgComments,
      postsCount: Math.floor(Math.random() * 500) + 10
    },
    insights: [
      { type: 'optimalPostingTime', value: '7:00 PM - 9:00 PM' },
      { type: 'topHashtags', value: ['#socialmedia', '#digitalmarketing', '#growth'] },
      { type: 'audienceDemographics', value: { age: '18-34', gender: '55% Female, 45% Male' } }
    ]
  };
}

// routes/subscription.js
app.get('/api/subscription/plans', async (req, res) => {
  try {
    const plans = await Subscription.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

app.post('/api/subscription/subscribe', authenticateToken, async (req, res) => {
  try {
    const { planId } = req.body;
    
    const plan = await Subscription.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'الباقة غير موجودة' });
    }
    
    const user = await User.findById(req.user.userId);
    
    // في التطبيق الحقيقي، هنا سيتم دمج مع بوابة الدفع
    user.subscription.plan = plan.name.toLowerCase();
    user.subscription.purchasedAt = new Date();
    user.subscription.expiresAt = new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000);
    
    await user.save();
    
    res.json({ 
      message: 'تم الاشتراك بنجاح', 
      subscription: user.subscription 
    });
  } catch (error) {
    res.status(500).json({ error: 'خطأ في السيرفر' });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});