import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import theme from './theme/theme';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// --- Page Components ---
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Meal from './pages/Meal';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar /> 
      <main style={{ padding: '20px' }}>
        <ErrorBoundary>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/meal" 
              element={
                <ProtectedRoute>
                  <Meal />
                </ProtectedRoute>
              } 
            />

          </Routes>
        </ErrorBoundary>
      </main>
    </ThemeProvider>
  );
}

export default App;
