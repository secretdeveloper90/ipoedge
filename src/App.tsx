import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import AppRouter from './router';
import { ErrorBoundary, ScrollToTop } from './components/common';
import { initializePerformanceOptimizations } from './utils/performanceUtils';
import { initializeAnalytics } from './utils/analytics';
import { BrokerComparisonProvider } from './contexts/BrokerComparisonContext';

function App() {
  // Initialize performance optimizations and analytics
  useEffect(() => {
    const cleanup = initializePerformanceOptimizations();

    // Initialize analytics (replace with your actual codes)
    initializeAnalytics({
      // gaId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
      // searchConsoleCode: 'your-search-console-verification-code',
      enableConsent: true,
    });

    return cleanup;
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0ea5e9',
            colorSuccess: '#22c55e',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            borderRadius: 12,
            borderRadiusLG: 16,
            borderRadiusSM: 8,
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 14,
            fontSizeLG: 16,
            fontSizeSM: 12,
            lineHeight: 1.5,
            colorBgContainer: '#ffffff',
            colorBgElevated: '#ffffff',
            colorBgLayout: '#f8fafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            boxShadowSecondary: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          components: {
            Button: {
              borderRadius: 8,
              fontWeight: 600,
              primaryShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.3)',
            },
            Card: {
              borderRadius: 16,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            Menu: {
              borderRadius: 8,
              itemBorderRadius: 6,
            },
            Input: {
              borderRadius: 8,
            },
            Select: {
              borderRadius: 8,
            },
            Drawer: {
              borderRadius: 16,
            },
            Modal: {
              borderRadius: 16,
            },
          },
        }}
      >
        <BrokerComparisonProvider>
          <Router>
            <ScrollToTop />
            <AppRouter />
          </Router>
        </BrokerComparisonProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}

export default App;
