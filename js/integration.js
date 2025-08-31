// Social Media Integration Service
class IntegrationService {
    // Get connected accounts
    async getConnectedAccounts() {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.INTEGRATION.CONNECTED_ACCOUNTS);
        } catch (error) {
            console.error('Error fetching connected accounts:', error);
            return this.getMockConnectedAccounts();
        }
    }

    // Connect Instagram account
    async connectInstagram() {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.INTEGRATION.INSTAGRAM_CONNECT);
        } catch (error) {
            console.error('Error connecting Instagram:', error);
            throw error;
        }
    }

    // Disconnect Instagram account
    async disconnectInstagram() {
        try {
            return await apiService.delete(API_CONFIG.ENDPOINTS.INTEGRATION.INSTAGRAM_DISCONNECT);
        } catch (error) {
            console.error('Error disconnecting Instagram:', error);
            throw error;
        }
    }

    // Sync Instagram data
    async syncInstagram() {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.INTEGRATION.INSTAGRAM_SYNC);
        } catch (error) {
            console.error('Error syncing Instagram:', error);
            throw error;
        }
    }

    // Mock data for fallback
    getMockConnectedAccounts() {
        return [
            {
                platform: 'instagram',
                username: '@mohammed_photos',
                connected: true,
                lastSync: '2023-11-01T10:00:00Z'
            },
            {
                platform: 'facebook',
                username: 'Mohammed Ahmed',
                connected: false,
                lastSync: null
            }
        ];
    }
}

// Create global instance
window.integrationService = new IntegrationService();