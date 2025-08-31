// Subscription Service
class SubscriptionService {
    // Get current subscription
    async getSubscription() {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.SUBSCRIPTION.GET);
        } catch (error) {
            console.error('Error fetching subscription:', error);
            return this.getMockSubscription();
        }
    }

    // Upgrade subscription
    async upgradeSubscription(plan, paymentMethod) {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.SUBSCRIPTION.UPGRADE, {
                plan,
                paymentMethod
            });
        } catch (error) {
            console.error('Error upgrading subscription:', error);
            throw error;
        }
    }

    // Cancel subscription
    async cancelSubscription() {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.SUBSCRIPTION.CANCEL);
        } catch (error) {
            console.error('Error canceling subscription:', error);
            throw error;
        }
    }

    // Get invoices
    async getInvoices() {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.SUBSCRIPTION.INVOICES);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            return this.getMockInvoices();
        }
    }

    // Mock subscription data
    getMockSubscription() {
        return {
            plan: 'business',
            status: 'active',
            startDate: '2023-10-01T00:00:00Z',
            endDate: '2023-11-01T00:00:00Z',
            features: [
                'تحليل 10 حسابات كحد أقصى',
                'تقارير متقدمة عن الأداء',
                'تحليل غير محدود للمنشورات',
                'مقارنة مع 5 منافسين',
                'دعم فني سريع'
            ],
            price: 49.99,
            currency: 'USD'
        };
    }

    getMockInvoices() {
        return [
            {
                id: 1,
                date: '2023-10-01T00:00:00Z',
                amount: 49.99,
                status: 'paid',
                plan: 'business'
            },
            {
                id: 2,
                date: '2023-09-01T00:00:00Z',
                amount: 49.99,
                status: 'paid',
                plan: 'business'
            }
        ];
    }
}

// Create global instance
window.subscriptionService = new SubscriptionService();