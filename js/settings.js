// Settings Service
class SettingsService {
    // Get user settings
    async getSettings() {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.SETTINGS.GET);
        } catch (error) {
            console.error('Error fetching settings:', error);
            return this.getMockSettings();
        }
    }

    // Update user settings
    async updateSettings(settings) {
        try {
            return await apiService.put(API_CONFIG.ENDPOINTS.SETTINGS.UPDATE, settings);
        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }

    // Update notification settings
    async updateNotificationSettings(notificationSettings) {
        try {
            return await apiService.put(API_CONFIG.ENDPOINTS.SETTINGS.NOTIFICATIONS, notificationSettings);
        } catch (error) {
            console.error('Error updating notification settings:', error);
            throw error;
        }
    }

    // Mock settings data
    getMockSettings() {
        return {
            profile: {
                fullName: 'محمد أحمد',
                username: '@mohammed',
                email: 'mohammed@example.com',
                phone: '+963 987 654 321',
                location: 'سوريا',
                language: 'ar'
            },
            appearance: {
                darkMode: false,
                autoColorChange: true,
                theme: 'light'
            },
            notifications: {
                email: {
                    weeklyReports: true,
                    followerActivity: true
                },
                app: {
                    sound: false,
                    popup: true
                }
            },
            privacy: {
                profileVisibility: 'public',
                dataSharing: 'limited'
            }
        };
    }
}

// Create global instance
window.settingsService = new SettingsService();