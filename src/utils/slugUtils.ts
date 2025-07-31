import type { IPO, Broker } from '../types';

/**
 * Generate a URL-friendly slug from a name
 */
export const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};

/**
 * Generate a unique slug for an IPO based on its name
 * If there are duplicates, append a suffix
 */
export const generateIPOSlug = (ipo: IPO, allIPOs: IPO[]): string => {
  const baseSlug = createSlug(ipo.name);
  
  // Check if this slug already exists for other IPOs
  const existingSlugs = allIPOs
    .filter(existingIPO => existingIPO.id !== ipo.id)
    .map(existingIPO => createSlug(existingIPO.name));
  
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  
  // If slug exists, append a suffix based on exchange or category
  const suffix = ipo.exchange.toLowerCase().replace(/\s+/g, '-');
  const slugWithSuffix = `${baseSlug}-${suffix}`;
  
  if (!existingSlugs.includes(slugWithSuffix)) {
    return slugWithSuffix;
  }
  
  // If still conflicts, append the ID as last resort
  return `${baseSlug}-${ipo.id}`;
};

/**
 * Generate a unique slug for a broker based on its name
 */
export const generateBrokerSlug = (broker: Broker, allBrokers: Broker[]): string => {
  const baseSlug = createSlug(broker.name);
  
  // Check if this slug already exists for other brokers
  const existingSlugs = allBrokers
    .filter(existingBroker => existingBroker.id !== broker.id)
    .map(existingBroker => createSlug(existingBroker.name));
  
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  
  // If slug exists, append the ID as suffix
  return `${baseSlug}-${broker.id}`;
};

/**
 * Find an IPO by its slug
 */
export const findIPOBySlug = (slug: string, ipos: IPO[]): IPO | null => {
  // First try to find by exact slug match
  for (const ipo of ipos) {
    const ipoSlug = generateIPOSlug(ipo, ipos);
    if (ipoSlug === slug) {
      return ipo;
    }
  }
  
  // If no exact match, try to find by name similarity
  const normalizedSlug = slug.replace(/-/g, ' ').toLowerCase();
  for (const ipo of ipos) {
    const normalizedName = ipo.name.toLowerCase();
    if (normalizedName.includes(normalizedSlug) || normalizedSlug.includes(normalizedName)) {
      return ipo;
    }
  }
  
  return null;
};

/**
 * Find a broker by its slug
 */
export const findBrokerBySlug = (slug: string, brokers: Broker[]): Broker | null => {
  // First try to find by exact slug match
  for (const broker of brokers) {
    const brokerSlug = generateBrokerSlug(broker, brokers);
    if (brokerSlug === slug) {
      return broker;
    }
  }
  
  // If no exact match, try to find by name similarity
  const normalizedSlug = slug.replace(/-/g, ' ').toLowerCase();
  for (const broker of brokers) {
    const normalizedName = broker.name.toLowerCase();
    if (normalizedName.includes(normalizedSlug) || normalizedSlug.includes(normalizedName)) {
      return broker;
    }
  }
  
  return null;
};

/**
 * Convert an IPO name to a URL-safe slug for navigation
 */
export const ipoNameToSlug = (name: string): string => {
  return createSlug(name);
};

/**
 * Convert a broker name to a URL-safe slug for navigation
 */
export const brokerNameToSlug = (name: string): string => {
  return createSlug(name);
};

/**
 * Convert a slug back to a readable name (for display purposes)
 */
export const slugToDisplayName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
