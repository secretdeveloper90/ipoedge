/**
 * Utility functions for formatting data display values
 */

// Format any value for display, showing "-" for null/undefined values
export const formatDisplayValue = (value: any): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return '-';
  }
  
  return value.toString();
};

// Format numeric values for display, showing "-" for null/undefined
export const formatNumericValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  
  return value.toString();
};

// Format currency values for display, showing "-" for null/undefined
export const formatCurrencyValue = (value: number | null | undefined, currency: string = '₹'): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  
  return `${currency}${value.toLocaleString()}`;
};

// Format percentage values for display, showing "-" for null/undefined
export const formatPercentageValue = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  
  return `${value}%`;
};

// Format broker value for display (enhanced version of existing function)
export const formatBrokerValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  
  if (value === 'Free' || value === 'Zero' || value === 0) {
    return 'Free';
  }
  
  if (typeof value === 'number') {
    return `₹${value}`;
  }
  
  return value.toString();
};

// Format subscription times for display
export const formatSubscriptionTimes = (times: number | null | undefined): string => {
  if (times === null || times === undefined) {
    return '-';
  }
  
  return `${times.toFixed(2)}x`;
};

// Format shares count for display
export const formatSharesCount = (shares: number | null | undefined): string => {
  if (shares === null || shares === undefined) {
    return '-';
  }
  
  return shares.toLocaleString();
};

// Safe calculation for subscription progress width
export const calculateSubscriptionWidth = (times: number | null | undefined, multiplier: number = 20): number => {
  if (times === null || times === undefined) {
    return 0;
  }
  
  return Math.min(times * multiplier, 100);
};

// Check if subscription is oversubscribed
export const isOversubscribed = (times: number | null | undefined): boolean => {
  if (times === null || times === undefined) {
    return false;
  }
  
  return times > 1;
};

// Format subscription status text
export const formatSubscriptionStatus = (times: number | null | undefined): string => {
  if (times === null || times === undefined) {
    return 'Not Available';
  }
  
  return times > 1 ? 'Oversubscribed' : 'Undersubscribed';
};
