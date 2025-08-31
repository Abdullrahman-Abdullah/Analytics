// Authentication Guard - Include this in protected pages
(function() {
    // Check if user is authenticated when page loads
    function checkAuth() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
            return false;
        }
        
        // Check if token is expired (basic check)
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (tokenData.exp < currentTime) {
                // Token expired, clear data and redirect
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                window.location.href = 'login.html';
                return false;
            }
        } catch (error) {
            // Invalid token format, clear and redirect
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
            return false;
        }
        
        return true;
    }
    
    // Add logout functionality to all pages
    function addLogoutHandler() {
        // Create logout button if it doesn't exist
        const userMenu = document.querySelector('.user-menu');
        if (userMenu && !document.querySelector('.logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
            logoutBtn.style.cssText = `
                background: none;
                border: none;
                color: #666;
                font-size: 1.2rem;
                cursor: pointer;
                margin-right: 10px;
                padding: 5px;
                border-radius: 4px;
                transition: all 0.3s ease;
            `;
            
            logoutBtn.addEventListener('mouseenter', function() {
                this.style.color = '#ef4444';
                this.style.background = '#fef2f2';
            });
            
            logoutBtn.addEventListener('mouseleave', function() {
                this.style.color = '#666';
                this.style.background = 'none';
            });
            
            logoutBtn.addEventListener('click', async function() {
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    try {
                        if (window.authService) {
                            await window.authService.logout();
                        } else {
                            localStorage.removeItem('authToken');
                            localStorage.removeItem('user');
                        }
                        window.location.href = 'login.html';
                    } catch (error) {
                        console.error('Logout error:', error);
                        // Force logout even if API call fails
                        localStorage.removeItem('authToken');
                        localStorage.removeItem('user');
                        window.location.href = 'login.html';
                    }
                }
            });
            
            userMenu.insertBefore(logoutBtn, userMenu.firstChild);
        }
    }
    
    // Run authentication check
    if (checkAuth()) {
        // Add logout handler when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addLogoutHandler);
        } else {
            addLogoutHandler();
        }
    }
})();