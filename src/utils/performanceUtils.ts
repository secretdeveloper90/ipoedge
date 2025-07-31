// Performance monitoring utilities for Core Web Vitals
import React from 'react';

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

// Track Core Web Vitals
export const trackCoreWebVitals = (callback: (metrics: PerformanceMetrics) => void) => {
  const metrics: PerformanceMetrics = {};

  // Track FCP (First Contentful Paint)
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
      callback(metrics);
    }
  });

  // Track LCP (Largest Contentful Paint)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      metrics.lcp = lastEntry.startTime;
      callback(metrics);
    }
  });

  // Track FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (entry.processingStart && entry.startTime) {
        metrics.fid = entry.processingStart - entry.startTime;
        callback(metrics);
      }
    });
  });

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        metrics.cls = clsValue;
        callback(metrics);
      }
    });
  });

  // Track TTFB (Time to First Byte)
  const navigationObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry: any) => {
      if (entry.responseStart && entry.requestStart) {
        metrics.ttfb = entry.responseStart - entry.requestStart;
        callback(metrics);
      }
    });
  });

  try {
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    fidObserver.observe({ entryTypes: ['first-input'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    navigationObserver.observe({ entryTypes: ['navigation'] });
  } catch (error) {
    console.warn('Performance Observer not supported:', error);
  }

  // Cleanup function
  return () => {
    fcpObserver.disconnect();
    lcpObserver.disconnect();
    fidObserver.disconnect();
    clsObserver.disconnect();
    navigationObserver.disconnect();
  };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload critical images (you can add your critical images here)
  const criticalImages = [
    '/logo.png',
    '/og-image.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Optimize images with WebP support detection
export const getOptimizedImageUrl = (originalUrl: string, width?: number, height?: number): string => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  // If it's already an optimized URL, return as is
  if (originalUrl.includes('?') || originalUrl.includes('&')) {
    return originalUrl;
  }

  // Build optimization parameters
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  if (supportsWebP) params.append('format', 'webp');
  params.append('q', '85'); // Quality

  return `${originalUrl}?${params.toString()}`;
};

// Lazy load components
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  return React.lazy(importFunc);
};

// Debounce function for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Check if device is low-end
export const isLowEndDevice = (): boolean => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check for slow connection
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData
  );

  // Check for low memory
  const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

  // Check for low CPU cores
  const isLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  return prefersReducedMotion || isSlowConnection || isLowMemory || isLowCPU;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationConfig = () => {
  const isLowEnd = isLowEndDevice();
  
  return {
    duration: isLowEnd ? 150 : 300,
    easing: isLowEnd ? 'ease' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    reduceMotion: isLowEnd,
    enableParallax: !isLowEnd,
    enableComplexAnimations: !isLowEnd,
  };
};

// Resource hints for better performance
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const domains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.google-analytics.com',
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const criticalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
  ];

  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Track Core Web Vitals
  const cleanup = trackCoreWebVitals((metrics) => {
    // You can send these metrics to your analytics service
    console.log('Core Web Vitals:', metrics);
  });

  return cleanup;
};
