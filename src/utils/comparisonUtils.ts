import type { Broker } from '../types';
import { trackBrokerEvent } from './analytics';

/**
 * Comparison utility functions for broker comparison feature
 */

export interface ComparisonMetrics {
  bestAccountOpening: string;
  bestAccountMaintenance: string;
  bestEquityDelivery: string;
  bestEquityIntraday: string;
  bestRating: number;
  averageRating: number;
}

/**
 * Calculate comparison metrics for a set of brokers
 */
export const calculateComparisonMetrics = (brokers: Broker[]): ComparisonMetrics => {
  if (brokers.length === 0) {
    return {
      bestAccountOpening: 'N/A',
      bestAccountMaintenance: 'N/A',
      bestEquityDelivery: 'N/A',
      bestEquityIntraday: 'N/A',
      bestRating: 0,
      averageRating: 0,
    };
  }

  // Find best account opening (Free is best, then lowest number)
  const bestAccountOpening = brokers.reduce((best, broker) => {
    if (broker.accountOpening === 'Free') return broker;
    if (best.accountOpening === 'Free') return best;
    
    const brokerValue = typeof broker.accountOpening === 'number' ? broker.accountOpening : 0;
    const bestValue = typeof best.accountOpening === 'number' ? best.accountOpening : Infinity;
    
    return brokerValue < bestValue ? broker : best;
  });

  // Find best account maintenance (Free is best, then lowest number)
  const bestAccountMaintenance = brokers.reduce((best, broker) => {
    if (broker.accountMaintenance === 'Free') return broker;
    if (best.accountMaintenance === 'Free') return best;
    
    const brokerValue = typeof broker.accountMaintenance === 'number' ? broker.accountMaintenance : 0;
    const bestValue = typeof best.accountMaintenance === 'number' ? best.accountMaintenance : Infinity;
    
    return brokerValue < bestValue ? broker : best;
  });

  // Find best equity delivery (Zero/Free is best)
  const bestEquityDelivery = brokers.find(broker => 
    broker.brokerage?.equityDelivery === 'Zero' || 
    broker.brokerage?.equityDelivery === 'Free'
  ) || brokers[0];

  // Find best equity intraday (lowest percentage or flat fee)
  const bestEquityIntraday = brokers.reduce((best, broker) => {
    const brokerBrokerage = broker.brokerage?.equityIntraday || '';
    const bestBrokerage = best.brokerage?.equityIntraday || '';
    
    // Simple comparison - prefer "Zero" or "Free"
    if (brokerBrokerage.includes('Zero') || brokerBrokerage.includes('Free')) return broker;
    if (bestBrokerage.includes('Zero') || bestBrokerage.includes('Free')) return best;
    
    return broker; // Default to current if no clear winner
  });

  // Calculate rating metrics
  const ratings = brokers.map(broker => broker.rating);
  const bestRating = Math.max(...ratings);
  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;

  return {
    bestAccountOpening: bestAccountOpening.name,
    bestAccountMaintenance: bestAccountMaintenance.name,
    bestEquityDelivery: bestEquityDelivery.name,
    bestEquityIntraday: bestEquityIntraday.name,
    bestRating,
    averageRating: Math.round(averageRating * 10) / 10,
  };
};

/**
 * Get comparison highlights for a broker against others
 */
export const getBrokerHighlights = (broker: Broker, comparedBrokers: Broker[]): string[] => {
  const highlights: string[] = [];
  
  if (comparedBrokers.length < 2) return highlights;

  // Check if this broker has the best account opening
  const hasFreAccountOpening = broker.accountOpening === 'Free';
  const othersHaveFree = comparedBrokers.some(b => 
    b.id !== broker.id && b.accountOpening === 'Free'
  );
  
  if (hasFreAccountOpening && !othersHaveFree) {
    highlights.push('Free Account Opening');
  }

  // Check if this broker has the best rating
  const isHighestRated = comparedBrokers.every(b => 
    b.id === broker.id || b.rating <= broker.rating
  );
  
  if (isHighestRated && broker.rating >= 4.0) {
    highlights.push('Highest Rated');
  }

  // Check for zero brokerage
  if (broker.brokerage?.equityDelivery === 'Zero') {
    highlights.push('Zero Delivery Brokerage');
  }

  // Check for 3-in-1 account
  if (broker.additionalFeatures?.['3in1Account']) {
    highlights.push('3-in-1 Account');
  }

  return highlights;
};

/**
 * Format comparison data for export
 */
export const formatComparisonForExport = (brokers: Broker[]): Record<string, any>[] => {
  return brokers.map(broker => ({
    'Broker Name': broker.name,
    'Type': broker.type,
    'Rating': broker.rating,
    'Active Clients': broker.activeClients,
    'Account Opening': broker.accountOpening,
    'Account Maintenance': broker.accountMaintenance,
    'Call & Trade': broker.callTrade,
    'Equity Delivery': broker.brokerage?.equityDelivery || 'N/A',
    'Equity Intraday': broker.brokerage?.equityIntraday || 'N/A',
    'Equity Futures': broker.brokerage?.equityFutures || 'N/A',
    'Equity Options': broker.brokerage?.equityOptions || 'N/A',
    'Platforms': broker.platforms?.join(', ') || 'N/A',
    'Services': broker.services?.join(', ') || 'N/A',
  }));
};

/**
 * Generate comparison summary text
 */
export const generateComparisonSummary = (brokers: Broker[]): string => {
  if (brokers.length === 0) return 'No brokers selected for comparison.';
  if (brokers.length === 1) return `Viewing details for ${brokers[0].name}.`;

  const metrics = calculateComparisonMetrics(brokers);
  const brokerNames = brokers.map(b => b.name).join(', ');
  
  return `Comparing ${brokers.length} brokers: ${brokerNames}. ` +
    `Best rated: ${metrics.bestRating}/5. ` +
    `Best account opening: ${metrics.bestAccountOpening}. ` +
    `Best equity delivery: ${metrics.bestEquityDelivery}.`;
};

/**
 * Track comparison analytics events
 */
export const trackComparisonEvent = (
  action: 'add_broker' | 'remove_broker' | 'view_comparison' | 'clear_all',
  brokerName?: string,
  additionalData?: Record<string, any>
) => {
  const eventData = {
    action,
    broker_name: brokerName,
    timestamp: new Date().toISOString(),
    ...additionalData,
  };

  // Track using existing broker analytics
  if (brokerName) {
    trackBrokerEvent('compare', brokerName, eventData);
  }

  // Log for debugging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Comparison Event:', eventData);
  }
};

/**
 * Validate broker comparison data
 */
export const validateComparisonData = (brokers: Broker[]): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (brokers.length === 0) {
    errors.push('No brokers provided for comparison');
  }

  if (brokers.length > 3) {
    errors.push('Maximum 3 brokers allowed for comparison');
  }

  // Check for duplicate brokers
  const uniqueIds = new Set(brokers.map(b => b.id));
  if (uniqueIds.size !== brokers.length) {
    errors.push('Duplicate brokers found in comparison');
  }

  // Validate broker data completeness
  brokers.forEach((broker, index) => {
    if (!broker.id || !broker.name) {
      errors.push(`Broker at index ${index} is missing required data`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Get comparison score for a broker (0-100)
 */
export const getComparisonScore = (broker: Broker): number => {
  let score = 0;

  // Rating contributes 30 points
  score += (broker.rating / 5) * 30;

  // Free account opening contributes 20 points
  if (broker.accountOpening === 'Free') {
    score += 20;
  } else if (typeof broker.accountOpening === 'number' && broker.accountOpening <= 500) {
    score += 10;
  }

  // Zero delivery brokerage contributes 25 points
  if (broker.brokerage?.equityDelivery === 'Zero') {
    score += 25;
  }

  // Additional features contribute 15 points
  const features = broker.additionalFeatures;
  if (features?.['3in1Account']) score += 5;
  if (features?.freeTradingCalls) score += 3;
  if (features?.freeResearch) score += 3;
  if (features?.marginFunding) score += 2;
  if (features?.smsAlerts) score += 2;

  // Platform variety contributes 10 points
  const platformCount = broker.platforms?.length || 0;
  score += Math.min(platformCount * 2, 10);

  return Math.round(score);
};

export default {
  calculateComparisonMetrics,
  getBrokerHighlights,
  formatComparisonForExport,
  generateComparisonSummary,
  trackComparisonEvent,
  validateComparisonData,
  getComparisonScore,
};
