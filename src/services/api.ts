import type { IPO, Buyback, Broker, APIResponse, IPOFilters } from '../types';
import { mockIPOs } from '../data/mockIPOs';
import { mockBuybacks } from '../data/mockBuybacks';
import { mockBrokers } from '../data/mockBrokers';
import { firebaseIPOService } from './firebaseIPOService';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter IPOs
const filterIPOs = (ipos: IPO[], filters: IPOFilters): IPO[] => {
  return ipos.filter(ipo => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(ipo.status)) return false;
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(ipo.category)) return false;
    }

    // Exchange filter
    if (filters.exchange && filters.exchange.length > 0) {
      if (!filters.exchange.includes(ipo.exchange)) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const price = typeof ipo.offerPrice === 'number' ? ipo.offerPrice : ipo.offerPrice.max;
      if (price < filters.priceRange.min || price > filters.priceRange.max) return false;
    }

    // Date range filter
    if (filters.dateRange) {
      const startDate = new Date(ipo.offerDate.start);
      const filterStart = new Date(filters.dateRange.start);
      const filterEnd = new Date(filters.dateRange.end);
      if (startDate < filterStart || startDate > filterEnd) return false;
    }

    return true;
  });
};

// Helper function to search IPOs
const searchIPOs = (ipos: IPO[], query: string): IPO[] => {
  if (!query.trim()) return ipos;
  
  const searchTerm = query.toLowerCase();
  return ipos.filter(ipo => 
    ipo.name.toLowerCase().includes(searchTerm) ||
    ipo.sector?.toLowerCase().includes(searchTerm) ||
    ipo.exchange.toLowerCase().includes(searchTerm)
  );
};

// Helper function to sort IPOs
const sortIPOs = (ipos: IPO[], sortBy: string, sortOrder: 'asc' | 'desc'): IPO[] => {
  return [...ipos].sort((a, b) => {
    let aValue: string | number | Date, bValue: string | number | Date;

    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'date':
        aValue = new Date(a.offerDate.start);
        bValue = new Date(b.offerDate.start);
        break;
      case 'subscription':
        aValue = a.subscription?.times || 0;
        bValue = b.subscription?.times || 0;
        break;
      case 'gmp':
        aValue = a.gmp?.percentage || 0;
        bValue = b.gmp?.percentage || 0;
        break;
      case 'price':
        aValue = typeof a.offerPrice === 'number' ? a.offerPrice : a.offerPrice.max;
        bValue = typeof b.offerPrice === 'number' ? b.offerPrice : b.offerPrice.max;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

// IPO API functions
export const ipoAPI = {
  // Get all IPOs with optional filtering and pagination
  async getIPOs(params?: {
    page?: number;
    limit?: number;
    filters?: IPOFilters;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<APIResponse<IPO[]>> {
    try {
      // Try to fetch from Firebase first
      try {
        const { ipos, total } = await firebaseIPOService.getIPOs({
          filters: params?.filters,
          search: params?.search,
          sortBy: params?.sortBy,
          sortOrder: params?.sortOrder,
          page: params?.page,
          limit: params?.limit,
        });

        const page = params?.page || 1;
        const limit = params?.limit || 12;

        return {
          data: ipos,
          success: true,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        };
      } catch (firebaseError) {
        console.warn('Firebase fetch failed, falling back to mock data:', firebaseError);

        // Fallback to mock data
        let filteredIPOs = [...mockIPOs];

        // Apply search
        if (params?.search) {
          filteredIPOs = searchIPOs(filteredIPOs, params.search);
        }

        // Apply filters
        if (params?.filters) {
          filteredIPOs = filterIPOs(filteredIPOs, params.filters);
        }

        // Apply sorting
        if (params?.sortBy) {
          filteredIPOs = sortIPOs(filteredIPOs, params.sortBy, params?.sortOrder || 'asc');
        }

        // Apply pagination
        const page = params?.page || 1;
        const limit = params?.limit || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedIPOs = filteredIPOs.slice(startIndex, endIndex);

        return {
          data: paginatedIPOs,
          success: true,
          pagination: {
            page,
            limit,
            total: filteredIPOs.length,
            totalPages: Math.ceil(filteredIPOs.length / limit)
          }
        };
      }
    } catch {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch IPOs'
      };
    }
  },

  // Get IPO by ID
  async getIPOById(id: string): Promise<APIResponse<IPO | null>> {
    try {
      // Try to fetch from Firebase first
      try {
        const ipo = await firebaseIPOService.getIPOById(id);
        return {
          data: ipo,
          success: true,
          message: ipo ? undefined : 'IPO not found'
        };
      } catch (firebaseError) {
        console.warn('Firebase fetch failed, falling back to mock data:', firebaseError);

        // Fallback to mock data
        const ipo = mockIPOs.find(ipo => ipo.id === id);
        return {
          data: ipo || null,
          success: true,
          message: ipo ? undefined : 'IPO not found'
        };
      }
    } catch {
      return {
        data: null,
        success: false,
        message: 'Failed to fetch IPO details'
      };
    }
  },

  // Get IPO by name/slug
  async getIPOByName(name: string): Promise<APIResponse<IPO | null>> {
    await delay(300);

    try {
      const { findIPOBySlug } = await import('../utils/slugUtils');

      // First try to find by slug
      let ipo = findIPOBySlug(name, mockIPOs);

      // If not found by slug, try to find by exact name match
      if (!ipo) {
        ipo = mockIPOs.find(ipoItem =>
          ipoItem.name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') === name.toLowerCase()
        ) || null;
      }

      // If still not found, try partial name match
      if (!ipo) {
        const searchTerm = name.toLowerCase().replace(/-/g, ' ');
        ipo = mockIPOs.find(ipoItem =>
          ipoItem.name.toLowerCase().includes(searchTerm) ||
          searchTerm.includes(ipoItem.name.toLowerCase())
        ) || null;
      }

      return {
        data: ipo || null,
        success: true,
        message: ipo ? undefined : 'IPO not found'
      };
    } catch {
      return {
        data: null,
        success: false,
        message: 'Failed to fetch IPO details'
      };
    }
  },

  // Get IPOs by status
  async getIPOsByStatus(status: string): Promise<APIResponse<IPO[]>> {
    try {
      // Try to fetch from Firebase first
      try {
        const ipos = await firebaseIPOService.getIPOsByStatus(status);
        return {
          data: ipos,
          success: true
        };
      } catch (firebaseError) {
        console.warn('Firebase fetch failed, falling back to mock data:', firebaseError);

        // Fallback to mock data
        const filteredIPOs = mockIPOs.filter(ipo => ipo.status === status);
        return {
          data: filteredIPOs,
          success: true
        };
      }
    } catch {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch IPOs by status'
      };
    }
  },

  // Get IPOs by category
  async getIPOsByCategory(category: string): Promise<APIResponse<IPO[]>> {
    await delay(400);

    try {
      const filteredIPOs = mockIPOs.filter(ipo => ipo.category === category);
      return {
        data: filteredIPOs,
        success: true
      };
    } catch {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch IPOs by category'
      };
    }
  }
};

// Buyback API functions
export const buybackAPI = {
  async getBuybacks(status?: string): Promise<APIResponse<Buyback[]>> {
    await delay(400);

    try {
      let filteredBuybacks = [...mockBuybacks];

      if (status) {
        filteredBuybacks = filteredBuybacks.filter(buyback => buyback.status === status);
      }

      return {
        data: filteredBuybacks,
        success: true
      };
    } catch {
      return {
        data: [],
        success: false,
        message: 'Failed to fetch buybacks'
      };
    }
  },

  async getBuybackById(id: string): Promise<APIResponse<Buyback | null>> {
    await delay(300);

    try {
      const buyback = mockBuybacks.find(buyback => buyback.id === id);
      return {
        data: buyback || null,
        success: true,
        message: buyback ? undefined : 'Buyback not found'
      };
    } catch {
      return {
        data: null,
        success: false,
        message: 'Failed to fetch buyback details'
      };
    }
  }
};

// Broker API functions
export const brokerAPI = {
  async getBrokers(): Promise<APIResponse<Broker[]>> {
    await delay(400);

    try {
      // Import validation utilities
      const { validateBrokers, sanitizeBroker } = await import('../utils/brokerValidation');

      // Validate and sanitize broker data
      const { invalidBrokers } = validateBrokers(mockBrokers);

      // Log validation issues in development
      if (typeof window !== 'undefined' && invalidBrokers.length > 0) {
        console.warn('Invalid brokers found:', invalidBrokers);
      }

      // Sanitize all brokers to ensure consistency
      const sanitizedBrokers = mockBrokers.map(sanitizeBroker);

      return {
        data: sanitizedBrokers,
        success: true
      };
    } catch (error) {
      console.error('Error fetching brokers:', error);
      return {
        data: [],
        success: false,
        message: 'Failed to fetch brokers'
      };
    }
  },

  async getBrokerById(id: string): Promise<APIResponse<Broker | null>> {
    await delay(300);

    try {
      const { sanitizeBroker } = await import('../utils/brokerValidation');

      const broker = mockBrokers.find(broker => broker.id === id);

      if (!broker) {
        return {
          data: null,
          success: true,
          message: 'Broker not found'
        };
      }

      // Sanitize broker data before returning
      const sanitizedBroker = sanitizeBroker(broker);

      return {
        data: sanitizedBroker,
        success: true
      };
    } catch (error) {
      console.error('Error fetching broker details:', error);
      return {
        data: null,
        success: false,
        message: 'Failed to fetch broker details'
      };
    }
  },

  async getBrokerByName(name: string): Promise<APIResponse<Broker | null>> {
    await delay(300);

    try {
      const { sanitizeBroker } = await import('../utils/brokerValidation');
      const { findBrokerBySlug } = await import('../utils/slugUtils');

      // First try to find by slug
      let broker = findBrokerBySlug(name, mockBrokers);

      // If not found by slug, try to find by exact name match
      if (!broker) {
        broker = mockBrokers.find(brokerItem =>
          brokerItem.name.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') === name.toLowerCase()
        ) || null;
      }

      // If still not found, try partial name match
      if (!broker) {
        const searchTerm = name.toLowerCase().replace(/-/g, ' ');
        broker = mockBrokers.find(brokerItem =>
          brokerItem.name.toLowerCase().includes(searchTerm) ||
          searchTerm.includes(brokerItem.name.toLowerCase())
        ) || null;
      }

      if (!broker) {
        return {
          data: null,
          success: true,
          message: 'Broker not found'
        };
      }

      // Sanitize broker data before returning
      const sanitizedBroker = sanitizeBroker(broker);

      return {
        data: sanitizedBroker,
        success: true
      };
    } catch (error) {
      console.error('Error fetching broker details:', error);
      return {
        data: null,
        success: false,
        message: 'Failed to fetch broker details'
      };
    }
  }
};
