import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Meal from './pages/Meal';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import useUserStore from './store/userStore';
import ErrorBoundary from './components/ErrorBoundary';
import { shallow } from 'zustand/shallow';

// These components are now defined outside of the App component
// to prevent them from being recreated on every render.
const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const PublicRoute = ({ currentUser, children }) => {
  if (currentUser) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  // Use shallow comparison to prevent infinite loops by only re-rendering
  // when the top-level properties of the returned object change.
  const { currentUser, _hasHydrated } = useUserStore(
    (state) => ({
      currentUser: state.currentUser,
      _hasHydrated: state._hasHydrated,
    }),
    shallow
  );

  // This loading indicator is crucial for preventing race conditions on page load.
  if (!_hasHydrated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Box>
        {currentUser && <Navbar />}
        <Box p={currentUser ? 3 : 0}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meal"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <Meal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute currentUser={currentUser}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute currentUser={currentUser}>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
