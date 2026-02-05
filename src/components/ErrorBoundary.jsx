import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            We're sorry for the inconvenience. Please try refreshing the page.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          {/* Optional: Display error details during development */}
          {import.meta.env.MODE === 'development' && (
            <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 1, background: '#f0f0f0' }}>
              <Typography variant="subtitle2">Error Details (Development Only):</Typography>
              <pre>{this.state.error && this.state.error.toString()}</pre>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
