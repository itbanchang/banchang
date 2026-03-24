// ============================================================
// useAuth Hook - Access authentication context
// Usage: const { user, login, logout, tokens } = useAuth();
// ============================================================
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
