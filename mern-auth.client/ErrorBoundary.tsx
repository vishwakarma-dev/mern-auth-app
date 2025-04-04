import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { Component, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
  error: string | null;
  filename: string | null;
  lineNumber: string | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren, State> {
  state: State = {
    hasError: false,
    error: null,
    filename: null,
    lineNumber: null,
  };

  static getDerivedStateFromError(error: Error): State {
    // Update state to show fallback UI
    return { hasError: true, error: error.message, filename: null, lineNumber: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    // Extract filename and line number from the stack trace, if available
    const componentStack = errorInfo.componentStack;
    if (componentStack) {
      const match = componentStack.match(/at (.*):(\d+):\d+/);
      const filename = match ? match[1] : 'Unknown file';
      const lineNumber = match ? match[2] : 'Unknown line';

      // Update state with filename and line number
      this.setState({ filename, lineNumber });
    } else {
      this.setState({ filename: 'Unknown file', lineNumber: 'Unknown line' });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          height="100vh"
        >
          <Card elevation={24} sx={{ maxWidth: 800 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Something went wrong!
              </Typography>
              <Divider />
              {this.state.error && (
                <Typography marginTop={2} variant="body2" color="error">
                  {this.state.error}
                </Typography>
              )}
              {this.state.filename && (
                <Typography marginTop={2} variant="body2">
                  <strong>File:</strong> {this.state.filename}
                </Typography>
              )}
              {this.state.lineNumber && (
                <Typography marginTop={2} variant="body2">
                  <strong>Line:</strong> {this.state.lineNumber}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
