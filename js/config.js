// API Configuration
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000/api',
    ENDPOINTS: {
        // Authentication
        AUTH: {
            REGISTER: '/auth/register',
            LOGIN: '/auth/login',
            REFRESH_TOKEN: '/auth/refresh-token',
            LOGOUT: '/auth/logout',
            FORGOT_PASSWORD: '/auth/forgot-password'
        },
        // Users
        USERS: {
            ME: '/users/me',
            UPDATE_PROFILE: '/users/me',
            CHANGE_PASSWORD: '/users/change-password'
        },
        // Analytics
        ANALYTICS: {
            OVERVIEW: '/analytics/overview',
            FOLLOWERS: '/analytics/followers',
            POSTS: '/analytics/posts',
            COMPARE: '/analytics/compare'
        },
        // Social Media Integration
        INTEGRATION: {
            INSTAGRAM_CONNECT: '/integration/instagram/connect',
            INSTAGRAM_DISCONNECT: '/integration/instagram/disconnect',
            INSTAGRAM_SYNC: '/integration/instagram/sync',
            CONNECTED_ACCOUNTS: '/integration/connected-accounts'
        },
        // Scheduling
        SCHEDULING: {
            POSTS: '/scheduling/posts',
            CALENDAR: '/scheduling/calendar'
        },
        // Reports
        REPORTS: {
            GENERATE: '/reports/generate',
            LIST: '/reports',
            DOWNLOAD: '/reports/:id/download',
            DELETE: '/reports/:id'
        },
        // Settings
        SETTINGS: {
            GET: '/settings',
            UPDATE: '/settings',
            NOTIFICATIONS: '/settings/notifications'
        },
        // Notifications
        NOTIFICATIONS: {
            LIST: '/notifications',
            MARK_READ: '/notifications/:id/read',
            DELETE: '/notifications/:id',
            DELETE_ALL: '/notifications'
        },
        // Subscription
        SUBSCRIPTION: {
            GET: '/subscription',
            UPGRADE: '/subscription/upgrade',
            CANCEL: '/subscription/cancel',
            INVOICES: '/subscription/invoices'
        }
    }
};

// Export configuration
window.API_CONFIG = API_CONFIG;