import React, { useState, useEffect, ErrorInfo } from 'react';
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import DownloadNow from './pages/DownloadNow';
// Import feature-specific components
import SecureStorage from './pages/features/SecureStorage';
import QrScan from './pages/features/QrScan';
import MultiDevice from './pages/features/MultiDevice'; // Add this import
import Alerts from './pages/features/Alerts'; // Add this import
import Sync from './pages/features/Sync'; // Add this import
import Sharing from './pages/features/Sharing'; // Add this import

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Fallback UI
const ErrorFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50 p-4">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
    <p className="text-gray-700 mb-4">We're sorry, but there was an error loading this page.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
    >
      Try again
    </button>
  </div>
);

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('mockAuth') === 'true';
  
  // If not authenticated, redirect to sign in page
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // If authenticated, render the children components
  return <>{children}</>;
};

// Create router with future flag enabled
const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/how-it-works", element: <HowItWorks /> },
    { path: "/features", element: <Features /> },
    // Define specific feature routes explicitly
    { path: "/features/secure-storage", element: <SecureStorage /> },
    { path: "/features/qr-scan", element: <QrScan /> },
    { path: "/features/multi-device", element: <MultiDevice /> },
    { path: "/features/alerts", element: <Alerts /> }, // Add this route
    { path: "/features/sync", element: <Sync /> }, // Add this route
    { path: "/features/sharing", element: <Sharing /> }, // Add this route
    // Keep the catch-all route for other features
    { path: "/about", element: <About /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/faq", element: <FAQ /> },
    { path: "/blog", element: <Blog /> },
    { path: "/contact", element: <Contact /> },
    { path: "/download", element: <DownloadNow /> },
    { 
      path: "/dashboard/*", 
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    },
    { path: "*", element: <Navigate to="/" replace /> }
  ],
  {
    future: {
      v7_startTransition: true,
    } as any, // Type assertion to bypass TypeScript check
  }
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    // Simulate initial loading
    const loadApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error during app initialization:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    loadApp();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }
  
  if (hasError) {
    return <ErrorFallback />;
  }
  
  // Return RouterProvider with error boundary
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;