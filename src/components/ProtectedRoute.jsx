import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = ({ children }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const _hasHydrated = useUserStore((state) => state._hasHydrated);

  if (!_hasHydrated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div>Loading...</div>
      </div>
    );  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
