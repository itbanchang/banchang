// ============================================================
// BCH 360° Intelligence V.10 - Login Form Component
// Example implementation showing how to use AuthContext
// ============================================================
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import './LoginForm.css';

export default function LoginForm({ onLoginSuccess }) {
  const { login, loading, error: authError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username || !password) {
      setLocalError('Username and password are required');
      return;
    }

    try {
      await login(username, password);
      
      // Call parent callback if provided
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        // Default: redirect to dashboard
        window.location.href = '/';
      }
    } catch (err) {
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        setLocalError('ไม่สามารถเชื่อมต่อ server ได้ กรุณาลองใหม่อีกครั้ง (Timeout)');
      } else {
        setLocalError(err.message || 'Login failed. Please try again.');
      }
    }
  };

  const displayError = localError || authError;

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🏥 BCH 360° Intelligence</h1>
          <p>Hospital Dashboard & Analytics</p>
        </div>

        {displayError && (
          <div className="error-banner" role="alert">
            <span>⚠️</span>
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="credentials-hint">
            Demo credentials: Username: <code>admin</code>
          </p>
          <p className="security-note">
            ✅ Passwords are encrypted with bcrypt · Tokens expire automatically
          </p>
        </div>
      </div>
    </div>
  );
}
