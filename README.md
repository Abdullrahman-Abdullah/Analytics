# SocialInsight Frontend-Backend Integration

## Overview
This project integrates the SocialInsight frontend with the backend API endpoints. The integration includes authentication, data fetching, and real-time updates across all dashboard pages.

## Architecture

### JavaScript Modules
- **config.js**: API configuration and endpoint definitions
- **auth.js**: Authentication service with login, register, logout functionality
- **api.js**: Generic API service for HTTP requests with token management
- **analytics.js**: Analytics data service
- **scheduling.js**: Scheduling and calendar service
- **reports.js**: Reports generation and management service
- **settings.js**: User settings management service
- **notifications.js**: Notifications service
- **integration.js**: Social media integration service
- **utils.js**: Utility functions and helpers
- **auth-guard.js**: Authentication guard for protected pages

### Features Implemented

#### Authentication
- User registration with validation
- Login with email/password
- Token-based authentication
- Automatic token refresh
- Logout functionality
- Password reset

#### Dashboard Integration
- Real-time analytics data loading
- Dynamic chart updates
- Statistics cards with live data
- Error handling with fallback to mock data

#### Data Management
- Automatic API calls on page load
- Filter functionality with backend integration
- Loading states and user feedback
- Toast notifications for user actions

#### Security
- Authentication guards on all protected pages
- Automatic redirect to login for unauthenticated users
- Token expiration handling
- Secure API request headers

## API Endpoints Used

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Token refresh
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset

### Analytics Endpoints
- `GET /api/analytics/overview` - Dashboard overview
- `GET /api/analytics/followers` - Followers analytics
- `GET /api/analytics/posts` - Posts analytics
- `GET /api/analytics/compare` - Comparison analytics

### Scheduling Endpoints
- `GET /api/scheduling/posts` - Get scheduled posts
- `POST /api/scheduling/posts` - Create scheduled post
- `PUT /api/scheduling/posts/:id` - Update scheduled post
- `DELETE /api/scheduling/posts/:id` - Delete scheduled post
- `GET /api/scheduling/calendar` - Get calendar data

### Reports Endpoints
- `POST /api/reports/generate` - Generate new report
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id/download` - Download report
- `DELETE /api/reports/:id` - Delete report

### Settings Endpoints
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update user settings
- `PUT /api/settings/notifications` - Update notification settings

## Usage

### Starting the Application
1. Ensure your backend server is running on `http://localhost:3000`
2. Open `index.html` in a web browser
3. Navigate to login page and create an account or login
4. Access the dashboard and other features

### Configuration
Update the `API_CONFIG.BASE_URL` in `js/config.js` to match your backend server URL:

```javascript
const API_CONFIG = {
    BASE_URL: 'http://your-backend-url/api',
    // ... rest of config
};
```

### Error Handling
The application includes comprehensive error handling:
- Network errors show user-friendly messages
- Authentication errors redirect to login
- API errors display toast notifications
- Fallback to mock data when API is unavailable

### Mobile Responsiveness
All pages are fully responsive and include:
- Mobile-friendly navigation
- Touch-optimized interactions
- Responsive charts and tables
- Mobile-specific UI adjustments

## Development Notes

### Adding New API Calls
1. Add endpoint to `js/config.js`
2. Create service method in appropriate service file
3. Add error handling and loading states
4. Update UI components to use real data

### Authentication Flow
1. User logs in through `login.html`
2. Token is stored in localStorage
3. `auth-guard.js` checks authentication on protected pages
4. API calls include authentication headers
5. Token is automatically refreshed when expired

### Data Flow
1. Page loads and checks authentication
2. Service modules load required data from API
3. UI components update with real data
4. User interactions trigger API calls
5. Success/error feedback shown to user

This integration provides a complete connection between your frontend and backend, with proper error handling, authentication, and user experience considerations.