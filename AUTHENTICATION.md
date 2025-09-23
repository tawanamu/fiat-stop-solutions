# Authentication System

This document describes the authentication system implemented for the Fiat Stop Solutions application.

## Features

### 🔐 Authentication Context

- **File**: `src/contexts/AuthContext.tsx`
- Manages user authentication state across the application
- Provides login, registration, and logout functionality
- Handles persistent authentication using localStorage
- Includes loading states and error handling

### 📝 Login Page

- **File**: `src/pages/Login.tsx`
- **Route**: `/login`
- Email and password authentication
- Form validation with error messages
- Password visibility toggle
- Remember me functionality
- Redirects to intended page after login

### 📋 Registration Page

- **File**: `src/pages/Register.tsx`
- **Route**: `/register`
- Complete user registration form
- Fields: First Name, Last Name, Email, Phone, Address, Password
- Password confirmation validation
- Terms and conditions acceptance
- Form validation with comprehensive error handling

### 🛡️ Protected Routes

- **File**: `src/components/ProtectedRoute.tsx`
- Wrapper component for protecting authenticated pages
- Automatic redirect to login for unauthenticated users
- Loading states during authentication checks
- Configurable redirect behavior

### 👤 User Profile

- **File**: `src/pages/Profile.tsx`
- **Route**: `/profile`
- Displays user information and account status
- Protected route requiring authentication
- Account management options

### 📦 Orders Page

- **File**: `src/pages/Orders.tsx`
- **Route**: `/orders`
- Order history and tracking
- Protected route requiring authentication
- Mock order data for demonstration

### 🧭 Navigation Integration

- **File**: `src/components/Header.tsx`
- Dynamic authentication UI in header
- Sign In/Sign Up buttons for unauthenticated users
- User dropdown menu for authenticated users
- Mobile-responsive authentication options

## Usage

### Basic Authentication Flow

1. **Registration**: Users can create accounts at `/register`
2. **Login**: Users can sign in at `/login`
3. **Protected Access**: Authenticated users can access protected pages
4. **Logout**: Users can sign out from the header dropdown

### Protecting Pages

Wrap any component that requires authentication with the `ProtectedRoute` component:

```tsx
import ProtectedRoute from "@/components/ProtectedRoute";

const MyProtectedPage = () => (
  <ProtectedRoute>
    <div>This content requires authentication</div>
  </ProtectedRoute>
);
```

### Using Authentication Context

Access authentication state and methods in any component:

```tsx
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Use authentication state and methods
};
```

## Authentication State

The authentication context provides:

- `user`: Current user object or null
- `isAuthenticated`: Boolean indicating if user is logged in
- `loading`: Boolean indicating if authentication is being processed
- `login(email, password)`: Function to authenticate user
- `register(userData)`: Function to create new user account
- `logout()`: Function to sign out user

## Security Notes

⚠️ **Important**: This is a demonstration implementation using localStorage for persistence. In a production environment:

1. Replace localStorage with secure HTTP-only cookies
2. Implement proper backend authentication with JWT tokens
3. Add password hashing and validation
4. Implement proper session management
5. Add rate limiting and CSRF protection
6. Use HTTPS for all authentication endpoints

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context
├── components/
│   ├── Header.tsx               # Updated with auth UI
│   └── ProtectedRoute.tsx       # Route protection wrapper
├── pages/
│   ├── Login.tsx                # Login page
│   ├── Register.tsx             # Registration page
│   ├── Profile.tsx              # User profile page
│   └── Orders.tsx               # Orders page (protected)
└── App.tsx                      # Updated with auth routes
```

## Routes

- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (protected)
- `/orders` - Order history (protected)

All other existing routes remain unchanged and accessible to all users.

