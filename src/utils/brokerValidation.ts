import type { Broker, BrokerageCharges, MarginInfo, AdditionalFeatures, DetailedCharges } from '../types';

// Validation result interface
export interface BrokerValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Validate brokerage charges
export const validateBrokerageCharges = (brokerage: BrokerageCharges | undefined): string[] => {
  const errors: string[] = [];
  
  if (!brokerage) {
    errors.push('Brokerage charges are missing');
    return errors;
  }

  const requiredFields = [
    'equityDelivery',
    'equityIntraday',
    'equityFutures',
    'equityOptions',
    'currencyFutures',
    'currencyOptions',
    'commodityFutures',
    'commodityOptions'
  ];

  requiredFields.forEach(field => {
    if (!brokerage[field as keyof BrokerageCharges]) {
      errors.push(`Missing brokerage charge for ${field}`);
    }
  });

  return errors;
};

// Validate margin info
export const validateMarginInfo = (margins: MarginInfo | undefined): string[] => {
  const errors: string[] = [];
  
  if (!margins) {
    errors.push('Margin information is missing');
    return errors;
  }

  const requiredFields = [
    'equityDelivery',
    'equityIntraday',
    'equityFutures',
    'equityOptions',
    'currencyFutures',
    'currencyOptions',
    'commodityFutures',
    'commodityOptions'
  ];

  requiredFields.forEach(field => {
    if (!margins[field as keyof MarginInfo]) {
      errors.push(`Missing margin info for ${field}`);
    }
  });

  return errors;
};

// Validate additional features
export const validateAdditionalFeatures = (features: AdditionalFeatures | undefined): string[] => {
  const warnings: string[] = [];
  
  if (!features) {
    warnings.push('Additional features information is missing');
    return warnings;
  }

  // Check if all boolean fields are properly defined
  const booleanFields = [
    '3in1Account',
    'freeTradingCalls',
    'freeResearch',
    'smsAlerts',
    'marginFunding',
    'marginAgainstShare'
  ];

  booleanFields.forEach(field => {
    if (typeof features[field as keyof AdditionalFeatures] !== 'boolean') {
      warnings.push(`Additional feature ${field} should be a boolean value`);
    }
  });

  return warnings;
};

// Validate detailed charges
export const validateDetailedCharges = (charges: DetailedCharges | undefined): string[] => {
  const warnings: string[] = [];
  
  if (!charges) {
    warnings.push('Detailed charges information is missing');
    return warnings;
  }

  // Add specific validation for detailed charges if needed
  return warnings;
};

// Main broker validation function
export const validateBroker = (broker: Broker): BrokerValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required fields
  if (!broker.id) errors.push('Broker ID is required');
  if (!broker.name) errors.push('Broker name is required');
  if (!broker.logo) warnings.push('Broker logo is missing');
  if (!broker.type) errors.push('Broker type is required');
  if (!broker.activeClients) warnings.push('Active clients count is missing');
  if (!broker.about) warnings.push('Broker description is missing');

  // Validate numeric fields
  if (typeof broker.rating !== 'number' || broker.rating < 0 || broker.rating > 5) {
    errors.push('Broker rating must be a number between 0 and 5');
  }

  // Validate account charges
  if (broker.accountOpening !== 'Free' && typeof broker.accountOpening !== 'number') {
    errors.push('Account opening charge must be "Free" or a number');
  }

  if (broker.accountMaintenance !== 'Free' && typeof broker.accountMaintenance !== 'number') {
    errors.push('Account maintenance charge must be "Free" or a number');
  }

  if (broker.callTrade !== 'Free' && typeof broker.callTrade !== 'number') {
    errors.push('Call trade charge must be "Free" or a number');
  }

  // Validate arrays
  if (!Array.isArray(broker.services) || broker.services.length === 0) {
    errors.push('Broker must have at least one service');
  }

  if (!Array.isArray(broker.platforms) || broker.platforms.length === 0) {
    warnings.push('Broker should have at least one platform');
  }

  if (!Array.isArray(broker.features)) {
    warnings.push('Broker features should be an array');
  }

  if (!Array.isArray(broker.pros)) {
    warnings.push('Broker pros should be an array');
  }

  if (!Array.isArray(broker.cons)) {
    warnings.push('Broker cons should be an array');
  }

  if (!Array.isArray(broker.otherInvestments)) {
    warnings.push('Other investments should be an array');
  }

  // Validate nested objects
  errors.push(...validateBrokerageCharges(broker.brokerage));
  errors.push(...validateMarginInfo(broker.margins));
  warnings.push(...validateAdditionalFeatures(broker.additionalFeatures));
  warnings.push(...validateDetailedCharges(broker.charges));

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Validate array of brokers
export const validateBrokers = (brokers: Broker[]): { validBrokers: Broker[]; invalidBrokers: { broker: Broker; validation: BrokerValidationResult }[] } => {
  const validBrokers: Broker[] = [];
  const invalidBrokers: { broker: Broker; validation: BrokerValidationResult }[] = [];

  brokers.forEach(broker => {
    const validation = validateBroker(broker);
    if (validation.isValid) {
      validBrokers.push(broker);
    } else {
      invalidBrokers.push({ broker, validation });
    }
  });

  return { validBrokers, invalidBrokers };
};

// Sanitize broker data
export const sanitizeBroker = (broker: Broker): Broker => {
  return {
    ...broker,
    // Ensure required fields have default values
    id: broker.id || '',
    name: broker.name || 'Unknown Broker',
    logo: broker.logo || '',
    type: broker.type || 'Unknown',
    activeClients: broker.activeClients || '0',
    about: broker.about || '',
    rating: typeof broker.rating === 'number' ? Math.max(0, Math.min(5, broker.rating)) : 0,
    
    // Ensure arrays are properly initialized
    services: Array.isArray(broker.services) ? broker.services : [],
    platforms: Array.isArray(broker.platforms) ? broker.platforms : [],
    features: Array.isArray(broker.features) ? broker.features : [],
    pros: Array.isArray(broker.pros) ? broker.pros : [],
    cons: Array.isArray(broker.cons) ? broker.cons : [],
    otherInvestments: Array.isArray(broker.otherInvestments) ? broker.otherInvestments : [],
    
    // Ensure brokerage charges exist
    brokerage: broker.brokerage || {
      equityDelivery: '-',
      equityIntraday: '-',
      equityFutures: '-',
      equityOptions: '-',
      currencyFutures: '-',
      currencyOptions: '-',
      commodityFutures: '-',
      commodityOptions: '-'
    },

    // Ensure margins exist
    margins: broker.margins || {
      equityDelivery: '-',
      equityIntraday: '-',
      equityFutures: '-',
      equityOptions: '-',
      currencyFutures: '-',
      currencyOptions: '-',
      commodityFutures: '-',
      commodityOptions: '-'
    }
  };
};

// Format broker value for display
export const formatBrokerValue = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return '-';
  if (value === 'Free' || value === 'Zero' || value === 0) return 'Free';
  if (typeof value === 'number') return `₹${value}`;
  return value.toString();
};

// Get broker status color
export const getBrokerStatusColor = (value: string | number | undefined): string => {
  if (value === 'Free' || value === 'Zero' || value === 0) return '#52c41a'; // Green
  if (typeof value === 'number' && value > 0) return '#1890ff'; // Blue
  return '#8c8c8c'; // Gray for N/A
};
