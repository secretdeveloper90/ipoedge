import { mockBrokers } from '../data/mockBrokers';
import type { Broker } from '../types';

// Helper function to create URL-friendly slug from broker name
export const createBrokerSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Helper function to get broker name from slug
export const getBrokerNameFromSlug = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getBrokerById = (id: string): Broker | undefined => {
  return mockBrokers.find((broker: Broker) => broker.id === id);
};

export const getBrokerByName = (name: string): Broker | undefined => {
  return mockBrokers.find((broker: Broker) =>
    broker.name.toLowerCase() === name.toLowerCase()
  );
};

export const getBrokerBySlug = (slug: string): Broker | undefined => {
  // Try to find broker by converting slug back to name
  const brokerName = getBrokerNameFromSlug(slug);
  return getBrokerByName(brokerName);
};

export const getBrokersByType = (type: string): Broker[] => {
  return mockBrokers.filter((broker: Broker) => broker.type === type);
};

export const getBrokersByRating = (minRating: number): Broker[] => {
  return mockBrokers.filter((broker: Broker) => broker.rating >= minRating);
};

export const getTopRatedBrokers = (limit: number = 5): Broker[] => {
  return mockBrokers
    .sort((a: Broker, b: Broker) => b.rating - a.rating)
    .slice(0, limit);
};

export const formatBrokerageValue = (value: string | number): string => {
  if (value === 'Zero' || value === 'Free' || value === 0) {
    return 'Free';
  }
  if (typeof value === 'number') {
    return `₹${value}`;
  }
  return value.toString();
};

export const getBrokerageColor = (value: string | number): string => {
  if (value === 'Zero' || value === 'Free' || value === 0) {
    return '#52c41a'; // Green
  }
  return '#1890ff'; // Blue
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4.5) return '#52c41a'; // Green
  if (rating >= 4.0) return '#1890ff'; // Blue
  if (rating >= 3.5) return '#faad14'; // Orange
  return '#f5222d'; // Red
};

export const searchBrokers = (brokers: Broker[], query: string): Broker[] => {
  if (!query.trim()) return brokers;
  
  const lowercaseQuery = query.toLowerCase();
  return brokers.filter(broker =>
    broker.name.toLowerCase().includes(lowercaseQuery) ||
    broker.type?.toLowerCase().includes(lowercaseQuery) ||
    broker.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

export const sortBrokers = (brokers: Broker[], sortBy: string): Broker[] => {
  const sortedBrokers = [...brokers];
  
  switch (sortBy) {
    case 'rating':
      return sortedBrokers.sort((a, b) => b.rating - a.rating);
    case 'name':
      return sortedBrokers.sort((a, b) => a.name.localeCompare(b.name));
    case 'accountOpening':
      return sortedBrokers.sort((a, b) => {
        const aValue = a.accountOpening === 'Free' ? 0 : Number(a.accountOpening);
        const bValue = b.accountOpening === 'Free' ? 0 : Number(b.accountOpening);
        return aValue - bValue;
      });
    case 'accountMaintenance':
      return sortedBrokers.sort((a, b) => {
        const aValue = a.accountMaintenance === 'Free' ? 0 : Number(a.accountMaintenance);
        const bValue = b.accountMaintenance === 'Free' ? 0 : Number(b.accountMaintenance);
        return aValue - bValue;
      });
    default:
      return sortedBrokers;
  }
};
