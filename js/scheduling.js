// Scheduling Service
class SchedulingService {
    // Get scheduled posts
    async getScheduledPosts(status = 'all') {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.SCHEDULING.POSTS, { status });
        } catch (error) {
            console.error('Error fetching scheduled posts:', error);
            return this.getMockScheduledPosts();
        }
    }

    // Create new scheduled post
    async createScheduledPost(postData) {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.SCHEDULING.POSTS, postData);
        } catch (error) {
            console.error('Error creating scheduled post:', error);
            throw error;
        }
    }

    // Update scheduled post
    async updateScheduledPost(id, postData) {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.SCHEDULING.POSTS.replace(':id', id);
            return await apiService.put(`/scheduling/posts/${id}`, postData);
        } catch (error) {
            console.error('Error updating scheduled post:', error);
            throw error;
        }
    }

    // Delete scheduled post
    async deleteScheduledPost(id) {
        try {
            return await apiService.delete(`/scheduling/posts/${id}`);
        } catch (error) {
            console.error('Error deleting scheduled post:', error);
            throw error;
        }
    }

    // Get calendar data
    async getCalendar(year, month) {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.SCHEDULING.CALENDAR, { year, month });
        } catch (error) {
            console.error('Error fetching calendar:', error);
            return this.getMockCalendarData();
        }
    }

    // Mock data for fallback
    getMockScheduledPosts() {
        return {
            scheduled: 24,
            published: 18,
            pending: 6,
            successRate: 92,
            posts: [
                {
                    id: 1,
                    platform: 'instagram',
                    content: 'منظر طبيعي رائع من رحلتي الأخيرة إلى الشمال #سفر #طبيعة',
                    scheduledDate: '2023-11-15T10:00:00Z',
                    status: 'scheduled',
                    expectedLikes: 1200
                },
                {
                    id: 2,
                    platform: 'facebook',
                    content: 'شاركنا رأيك في جديد المنتجات التي نعمل عليها! #تفاعل #منتج_جديد',
                    scheduledDate: '2023-11-16T18:00:00Z',
                    status: 'scheduled',
                    expectedLikes: 850
                }
            ]
        };
    }

    getMockCalendarData() {
        return {
            year: 2023,
            month: 11,
            posts: [
                { date: 1, platform: 'instagram', time: '10:00', type: 'image' },
                { date: 2, platform: 'twitter', time: '14:00', type: 'text' },
                { date: 5, platform: 'instagram', time: '11:00', type: 'reel' },
                { date: 16, platform: 'facebook', time: '17:00', type: 'post' }
            ]
        };
    }
}

// Create global instance
window.schedulingService = new SchedulingService();