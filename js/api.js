// API Service for making HTTP requests
class ApiService {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...authService.getAuthHeaders(),
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            // Handle 401 - Unauthorized (token expired)
            if (response.status === 401) {
                try {
                    await authService.refreshToken();
                    // Retry request with new token
                    config.headers = {
                        ...config.headers,
                        ...authService.getAuthHeaders()
                    };
                    const retryResponse = await fetch(url, config);
                    return await this.handleResponse(retryResponse);
                } catch (refreshError) {
                    authService.clearAuthData();
                    window.location.href = 'login.html';
                    throw new Error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
                }
            }

            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }

    // Handle response
    async handleResponse(response) {
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP Error: ${response.status}`);
            }
            
            return data;
        } else {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response;
        }
    }

    // GET request
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT request
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // Upload file
    async upload(endpoint, formData) {
        return this.request(endpoint, {
            method: 'POST',
            headers: {
                ...authService.getAuthHeaders(),
                // Don't set Content-Type for FormData, let browser set it
            },
            body: formData
        });
    }
}

// Create global instance
window.apiService = new ApiService();