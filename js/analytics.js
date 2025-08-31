// Analytics Service
class AnalyticsService {
    // Get overview analytics
    async getOverview(period = 'month') {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.ANALYTICS.OVERVIEW, { period });
        } catch (error) {
            console.error('Error fetching overview:', error);
            // Return mock data as fallback
            return this.getMockOverview();
        }
    }

    // Get followers analytics
    async getFollowersAnalytics(period = 'month') {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.ANALYTICS.FOLLOWERS, { period });
        } catch (error) {
            console.error('Error fetching followers analytics:', error);
            return this.getMockFollowersData();
        }
    }

    // Get posts analytics
    async getPostsAnalytics(period = 'month', type = 'all') {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.ANALYTICS.POSTS, { period, type });
        } catch (error) {
            console.error('Error fetching posts analytics:', error);
            return this.getMockPostsData();
        }
    }

    // Get comparison analytics
    async getComparisonAnalytics(compareWith = 'previous_period') {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.ANALYTICS.COMPARE, { compareWith });
        } catch (error) {
            console.error('Error fetching comparison analytics:', error);
            return this.getMockComparisonData();
        }
    }

    // Mock data methods (fallback when API is not available)
    getMockOverview() {
        return {
            totalFollowers: 24583,
            followersChange: { value: 254, percentage: 1.04, trend: 'positive' },
            engagementRate: 7.8,
            engagementChange: { value: 0.6, percentage: 8.3, trend: 'positive' },
            postsThisMonth: 24,
            postsChange: { value: -3, percentage: -11.1, trend: 'negative' },
            followersGrowth: 1254,
            growthChange: { value: 12.4, percentage: 12.4, trend: 'positive' }
        };
    }

    getMockFollowersData() {
        return {
            totalFollowers: 24583,
            newFollowers: 1254,
            unfollowers: 327,
            engagementRate: 7.8,
            demographics: {
                age: {
                    '18-24': 32,
                    '25-34': 28,
                    '35-44': 20,
                    '45-54': 12,
                    '55+': 8
                },
                gender: {
                    female: 55,
                    male: 45
                },
                location: {
                    'السعودية': 45,
                    'مصر': 18,
                    'الإمارات': 12,
                    'الكويت': 8,
                    'أخرى': 17
                }
            },
            activeFollowers: [
                { username: '@سالم_الغامدي', interactions: 12, comments: 24 },
                { username: '@منيرة_العتيبي', interactions: 9, likes: 18 },
                { username: '@فهد_السعدون', interactions: 7, comments: 5 },
                { username: '@لينا_الفهيد', interactions: 6, saves: 9 }
            ]
        };
    }

    getMockPostsData() {
        return {
            totalPosts: 247,
            averageLikes: 1854,
            averageComments: 142,
            shareRate: 7.8,
            topPosts: [
                {
                    id: 1,
                    content: 'منظر طبيعي رائع من رحلتي الأخيرة...',
                    likes: 2458,
                    comments: 184,
                    saves: 327,
                    shares: 89,
                    reach: 24587,
                    type: 'image'
                },
                {
                    id: 2,
                    content: 'تحدي الصباح اليومي #صباح_الخير...',
                    likes: 1987,
                    comments: 142,
                    saves: 289,
                    shares: 76,
                    reach: 18254,
                    type: 'video'
                }
            ],
            contentTypes: {
                images: 45,
                videos: 25,
                reels: 20,
                stories: 10
            }
        };
    }

    getMockComparisonData() {
        return {
            currentPeriod: {
                followers: 24583,
                engagementRate: 7.8,
                reach: 18.5
            },
            previousPeriod: {
                followers: 24329,
                engagementRate: 7.2,
                reach: 17.3
            },
            competitors: [
                { name: '@المنافس_الأول', followers: 42100, engagementRate: 5.2 },
                { name: '@المنافس_الثاني', followers: 38500, engagementRate: 6.8 }
            ]
        };
    }
}

// Create global instance
window.analyticsService = new AnalyticsService();