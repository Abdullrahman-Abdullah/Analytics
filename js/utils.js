// Utility functions
class Utils {
    // Format numbers with Arabic locale
    static formatNumber(number) {
        return new Intl.NumberFormat('ar-SA').format(number);
    }

    // Format dates with Arabic locale
    static formatDate(dateString, options = {}) {
        const date = new Date(dateString);
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        return new Intl.DateTimeFormat('ar-SA', defaultOptions).format(date);
    }

    // Format relative time (e.g., "منذ 3 أيام")
    static formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'منذ لحظات';
        if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
        if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
        if (diffInSeconds < 2592000) return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
        if (diffInSeconds < 31536000) return `منذ ${Math.floor(diffInSeconds / 2592000)} شهر`;
        return `منذ ${Math.floor(diffInSeconds / 31536000)} سنة`;
    }

    // Show loading spinner
    static showLoading(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        element.disabled = true;
        return originalContent;
    }

    // Hide loading spinner
    static hideLoading(element, originalContent) {
        element.innerHTML = originalContent;
        element.disabled = false;
    }

    // Show toast notification
    static showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles if not already added
        if (!document.getElementById('toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    padding: 15px 20px;
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    max-width: 400px;
                }
                .toast.show {
                    transform: translateX(0);
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .toast-success { border-left: 4px solid #10b981; }
                .toast-error { border-left: 4px solid #ef4444; }
                .toast-warning { border-left: 4px solid #f59e0b; }
                .toast-info { border-left: 4px solid #3b82f6; }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM and show
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 5000);
    }

    // Get toast icon based on type
    static getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Validate email format
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate password strength
    static validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            errors: [
                ...(password.length < minLength ? ['كلمة المرور يجب أن تكون 8 أحرف على الأقل'] : []),
                ...(!hasUpperCase ? ['يجب أن تحتوي على حرف كبير'] : []),
                ...(!hasLowerCase ? ['يجب أن تحتوي على حرف صغير'] : []),
                ...(!hasNumbers ? ['يجب أن تحتوي على رقم'] : [])
            ]
        };
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check if user is authenticated and redirect if not
    static requireAuth() {
        if (!authService.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // Update user display in header
    static updateUserDisplay() {
        const user = authService.getCurrentUser();
        if (user) {
            const userNameElements = document.querySelectorAll('.user-menu span');
            const userAvatarElements = document.querySelectorAll('.user-avatar');
            
            userNameElements.forEach(el => {
                el.textContent = user.fullName || user.username;
            });
            
            userAvatarElements.forEach(el => {
                el.textContent = (user.fullName || user.username).charAt(0).toUpperCase();
            });
        }
    }
}

// Create global instance
window.utils = Utils;