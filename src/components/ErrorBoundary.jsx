import React, { Component } from 'react';
import { Box, Typography } from '@mui/material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          p={2}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong.
          </Typography>
          {this.state.error && (
            <Typography color="error" paragraph>
              {this.state.error.toString()}
            </Typography>
          )}
          {this.state.errorInfo && (
            <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', mt: 2, p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
              {this.state.errorInfo.componentStack}
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
