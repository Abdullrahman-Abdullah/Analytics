// Notifications Service
class NotificationsService {
    // Get notifications
    async getNotifications(page = 1, limit = 20, read = null) {
        try {
            const params = { page, limit };
            if (read !== null) params.read = read;
            return await apiService.get(API_CONFIG.ENDPOINTS.NOTIFICATIONS.LIST, params);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return this.getMockNotifications();
        }
    }

    // Mark notification as read
    async markAsRead(id) {
        try {
            return await apiService.put(`/notifications/${id}/read`);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }

    // Delete notification
    async deleteNotification(id) {
        try {
            return await apiService.delete(`/notifications/${id}`);
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    }

    // Delete all notifications
    async deleteAllNotifications() {
        try {
            return await apiService.delete(API_CONFIG.ENDPOINTS.NOTIFICATIONS.DELETE_ALL);
        } catch (error) {
            console.error('Error deleting all notifications:', error);
            throw error;
        }
    }

    // Mock notifications data
    getMockNotifications() {
        return {
            notifications: [
                {
                    id: 1,
                    type: 'follower_milestone',
                    title: 'تهانينا! وصلت إلى 25,000 متابع',
                    message: 'لقد حققت إنجازاً رائعاً بوصولك إلى 25 ألف متابع',
                    read: false,
                    createdAt: '2023-11-01T10:00:00Z'
                },
                {
                    id: 2,
                    type: 'high_engagement',
                    title: 'منشورك يحقق تفاعلاً عالياً',
                    message: 'منشورك الأخير حقق 2,500 إعجاب في أول ساعة',
                    read: true,
                    createdAt: '2023-10-30T15:30:00Z'
                }
            ],
            total: 15,
            unread: 3
        };
    }
}

// Create global instance
window.notificationsService = new NotificationsService();