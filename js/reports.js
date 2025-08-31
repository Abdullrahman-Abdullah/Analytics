// Reports Service
class ReportsService {
    // Generate new report
    async generateReport(reportData) {
        try {
            return await apiService.post(API_CONFIG.ENDPOINTS.REPORTS.GENERATE, reportData);
        } catch (error) {
            console.error('Error generating report:', error);
            throw error;
        }
    }

    // Get all reports
    async getReports() {
        try {
            return await apiService.get(API_CONFIG.ENDPOINTS.REPORTS.LIST);
        } catch (error) {
            console.error('Error fetching reports:', error);
            return this.getMockReports();
        }
    }

    // Download report
    async downloadReport(id) {
        try {
            const response = await apiService.request(`/reports/${id}/download`, {
                method: 'GET'
            });
            
            // Handle file download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading report:', error);
            throw error;
        }
    }

    // Delete report
    async deleteReport(id) {
        try {
            return await apiService.delete(`/reports/${id}`);
        } catch (error) {
            console.error('Error deleting report:', error);
            throw error;
        }
    }

    // Mock data for fallback
    getMockReports() {
        return [
            {
                id: 1,
                type: 'performance',
                period: 'month',
                createdAt: '2023-11-01T10:00:00Z',
                status: 'completed'
            },
            {
                id: 2,
                type: 'audience',
                period: 'quarter',
                createdAt: '2023-10-15T14:30:00Z',
                status: 'completed'
            }
        ];
    }
}

// Create global instance
window.reportsService = new ReportsService();