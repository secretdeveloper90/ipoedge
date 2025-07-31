import { DATE_FORMATS } from '../constants';

// Date formatting utilities
export const formatDate = (date: string | Date, format: string = DATE_FORMATS.DISPLAY): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {};
  
  switch (format) {
    case DATE_FORMATS.DISPLAY:
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
      break;
    case DATE_FORMATS.FULL:
      options.year = 'numeric';
      options.month = 'long';
      options.day = '2-digit';
      break;
    case DATE_FORMATS.SHORT:
      return dateObj.toLocaleDateString('en-GB');
    default:
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
  }

  return dateObj.toLocaleDateString('en-US', options);
};

// Number formatting utilities
export const formatCurrency = (amount: number, currency: string = '₹'): string => {
  if (amount >= 10000000) {
    return `${currency}${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `${currency}${(amount / 100000).toFixed(2)} L`;
  } else if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(2)} K`;
  }
  return `${currency}${amount.toLocaleString()}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-IN');
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Array utilities
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// Local storage utilities
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage:`, error);
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage:`, error);
  }
};

export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage:`, error);
  }
};

// URL utilities
export const buildQueryString = (params: Record<string, string | number | boolean | string[]>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
};

// Debounce utility
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Color utilities
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    upcoming: '#1890ff',
    current: '#52c41a',
    listed: '#722ed1',
    closed: '#8c8c8c',
    live: '#52c41a',
    'pre-apply': '#faad14',
  };
  
  return statusColors[status.toLowerCase()] || '#8c8c8c';
};

// Random utilities
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const getRandomColor = (): string => {
  const colors = ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#eb2f96', '#13c2c2'];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Re-export slug utilities
export * from './slugUtils';
