/**
 * Error Boundary component for graceful error handling
 */
import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div className="modern-card" style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
            <div style={{ padding: '3rem 2rem' }}>
              <AlertTriangle size={64} color="var(--danger-color)" style={{ marginBottom: '1rem' }} />
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Something went wrong</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                We encountered an unexpected error. Please try refreshing the page or return to the home page.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details style={{ 
                  textAlign: 'left', 
                  marginBottom: '2rem',
                  background: 'var(--secondary-bg)',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error Details</summary>
                  <pre style={{ 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem'
                  }}>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <button 
                  className="btn btn-primary"
                  onClick={this.handleReset}
                >
                  <RefreshCw size={16} className="me-2" />
                  Try Again
                </button>
                <Link to="/" className="btn btn-secondary" onClick={this.handleReset}>
                  <Home size={16} className="me-2" />
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
