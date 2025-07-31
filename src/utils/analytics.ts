// Google Analytics 4 integration

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initializeGA = () => {
  // Create gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    // Enhanced ecommerce and user engagement
    send_page_view: true,
    // Privacy settings
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.origin + path,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: parameters?.event_category,
      event_label: parameters?.event_label,
      value: parameters?.value,
      ...parameters?.custom_parameters,
    });
  }
};

// Track IPO-specific events
export const trackIPOEvent = (
  action: 'view' | 'apply' | 'favorite' | 'share',
  ipoName: string,
  additionalData?: Record<string, any>
) => {
  trackEvent(`ipo_${action}`, {
    event_category: 'IPO',
    event_label: ipoName,
    custom_parameters: {
      ipo_name: ipoName,
      ...additionalData,
    },
  });
};

// Track broker events
export const trackBrokerEvent = (
  action: 'view' | 'click_apply' | 'compare',
  brokerName: string,
  additionalData?: Record<string, any>
) => {
  trackEvent(`broker_${action}`, {
    event_category: 'Broker',
    event_label: brokerName,
    custom_parameters: {
      broker_name: brokerName,
      ...additionalData,
    },
  });
};

// Track search events
export const trackSearchEvent = (
  searchTerm: string,
  resultCount: number,
  category?: string
) => {
  trackEvent('search', {
    event_category: 'Search',
    event_label: searchTerm,
    custom_parameters: {
      search_term: searchTerm,
      result_count: resultCount,
      search_category: category,
    },
  });
};

// Track user engagement
export const trackEngagement = (
  engagementType: 'scroll_depth' | 'time_on_page' | 'click' | 'download',
  value: number,
  additionalData?: Record<string, any>
) => {
  trackEvent('engagement', {
    event_category: 'User Engagement',
    event_label: engagementType,
    value,
    custom_parameters: {
      engagement_type: engagementType,
      ...additionalData,
    },
  });
};

// Track performance metrics
export const trackPerformance = (metrics: {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}) => {
  Object.entries(metrics).forEach(([metric, value]) => {
    if (value !== undefined) {
      trackEvent('web_vitals', {
        event_category: 'Performance',
        event_label: metric.toUpperCase(),
        value: Math.round(value),
        custom_parameters: {
          metric_name: metric,
          metric_value: value,
        },
      });
    }
  });
};

// Track errors
export const trackError = (
  errorType: 'javascript' | 'network' | 'user',
  errorMessage: string,
  additionalData?: Record<string, any>
) => {
  trackEvent('exception', {
    event_category: 'Error',
    event_label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      ...additionalData,
    },
  });
};

// Enhanced ecommerce tracking (for IPO applications)
export const trackIPOApplication = (
  ipoName: string,
  applicationAmount: number,
  category: 'retail' | 'hni' | 'qib'
) => {
  trackEvent('purchase', {
    event_category: 'IPO Application',
    custom_parameters: {
      transaction_id: `ipo_${Date.now()}`,
      value: applicationAmount,
      currency: 'INR',
      items: [{
        item_id: ipoName.toLowerCase().replace(/\s+/g, '_'),
        item_name: ipoName,
        item_category: 'IPO',
        item_category2: category,
        quantity: 1,
        price: applicationAmount,
      }],
    },
  });
};

// Consent management
export const updateAnalyticsConsent = (
  adStorage: 'granted' | 'denied',
  analyticsStorage: 'granted' | 'denied'
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'update', {
      ad_storage: adStorage,
      analytics_storage: analyticsStorage,
    });
  }
};

// Initialize consent (call this before initializing GA)
export const initializeConsent = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
      wait_for_update: 500,
    });
  }
};

// Google Search Console verification
export const addSearchConsoleVerification = (verificationCode: string) => {
  const meta = document.createElement('meta');
  meta.name = 'google-site-verification';
  meta.content = verificationCode;
  document.head.appendChild(meta);
};

// Initialize all analytics
export const initializeAnalytics = (options?: {
  gaId?: string;
  searchConsoleCode?: string;
  enableConsent?: boolean;
}) => {
  try {
    // Initialize consent if enabled
    if (options?.enableConsent) {
      initializeConsent();
    }

    // Initialize Google Analytics
    initializeGA();

    // Add Search Console verification if provided
    if (options?.searchConsoleCode) {
      addSearchConsoleVerification(options.searchConsoleCode);
    }

    console.log('Analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};
