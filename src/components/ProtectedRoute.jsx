// ============================================================
// ProtectedRoute Component
// Wraps routes that require authentication
// Redirects to login if user is not authenticated
// ============================================================
import React from 'react';
import { useAuth } from '../hooks/useAuth.js';
import LoginForm from './LoginForm.jsx';

/**
 * Protected Route Component
 * 
 * Usage:
 *   <ProtectedRoute>
 *     <YourDashboardComponent />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return children;
}

// Optional: Role-based protected route
export function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return (
      <div className="access-denied-container">
        <h1>🚫 Access Denied</h1>
        <p>Your role ({user?.role}) does not have permission to access this page.</p>
        <p>Allowed roles: {allowedRoles.join(', ')}</p>
      </div>
    );
  }

  return children;
}
