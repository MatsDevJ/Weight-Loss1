import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProtectedRoute = ({ children }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const _hasHydrated = useUserStore((state) => state._hasHydrated);

  if (!_hasHydrated) {
    return null; // Or a loading spinner
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
