import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config';
import type { IPO, IPOFilters } from '../types';

const IPOS_COLLECTION = 'ipos';

/**
 * Firebase IPO Service
 * Handles all Firestore operations for IPO data
 */
export const firebaseIPOService = {
  /**
   * Get all IPOs with optional filtering and pagination
   */
  async getIPOs(params?: {
    filters?: IPOFilters;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<{ ipos: IPO[]; total: number }> {
    try {
      const constraints: QueryConstraint[] = [];

      // Apply status filter
      if (params?.filters?.status && params.filters.status.length > 0) {
        constraints.push(where('status', 'in', params.filters.status));
      }

      // Apply category filter
      if (params?.filters?.category && params.filters.category.length > 0) {
        constraints.push(where('category', 'in', params.filters.category));
      }

      // Apply exchange filter
      if (params?.filters?.exchange && params.filters.exchange.length > 0) {
        constraints.push(where('exchange', 'in', params.filters.exchange));
      }

      // Apply sorting
      if (params?.sortBy) {
        const sortOrder = params.sortOrder === 'desc' ? 'desc' : 'asc';
        constraints.push(orderBy(params.sortBy, sortOrder));
      }

      // Apply pagination
      const pageLimit = params?.limit || 12;
      constraints.push(limit(pageLimit + 1)); // +1 to check if there are more results

      const q = query(collection(db, IPOS_COLLECTION), ...constraints);
      const snapshot = await getDocs(q);

      let ipos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as IPO));

      // Apply search filter (client-side)
      if (params?.search) {
        const searchTerm = params.search.toLowerCase();
        ipos = ipos.filter(
          (ipo) =>
            ipo.name.toLowerCase().includes(searchTerm) ||
            ipo.sector?.toLowerCase().includes(searchTerm) ||
            ipo.exchange.toLowerCase().includes(searchTerm)
        );
      }

      // Apply price range filter (client-side)
      if (params?.filters?.priceRange) {
        ipos = ipos.filter((ipo) => {
          const price =
            typeof ipo.offerPrice === 'number'
              ? ipo.offerPrice
              : ipo.offerPrice.max;
          return (
            price >= params.filters!.priceRange!.min &&
            price <= params.filters!.priceRange!.max
          );
        });
      }

      // Apply date range filter (client-side)
      if (params?.filters?.dateRange) {
        ipos = ipos.filter((ipo) => {
          const startDate = new Date(ipo.offerDate.start);
          const filterStart = new Date(params.filters!.dateRange!.start);
          const filterEnd = new Date(params.filters!.dateRange!.end);
          return startDate >= filterStart && startDate <= filterEnd;
        });
      }

      return {
        ipos: ipos.slice(0, pageLimit),
        total: ipos.length,
      };
    } catch (error) {
      console.error('Error fetching IPOs from Firebase:', error);
      throw error;
    }
  },

  /**
   * Get IPO by ID
   */
  async getIPOById(id: string): Promise<IPO | null> {
    try {
      const docRef = doc(db, IPOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as IPO;
    } catch (error) {
      console.error('Error fetching IPO by ID from Firebase:', error);
      throw error;
    }
  },

  /**
   * Get IPOs by status
   */
  async getIPOsByStatus(status: string): Promise<IPO[]> {
    try {
      const q = query(
        collection(db, IPOS_COLLECTION),
        where('status', '==', status)
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as IPO));
    } catch (error) {
      console.error('Error fetching IPOs by status from Firebase:', error);
      throw error;
    }
  },

  /**
   * Add a new IPO
   */
  async addIPO(ipoData: Omit<IPO, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, IPOS_COLLECTION), ipoData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding IPO to Firebase:', error);
      throw error;
    }
  },

  /**
   * Update an IPO
   */
  async updateIPO(id: string, ipoData: Partial<IPO>): Promise<void> {
    try {
      const docRef = doc(db, IPOS_COLLECTION, id);
      await updateDoc(docRef, ipoData);
    } catch (error) {
      console.error('Error updating IPO in Firebase:', error);
      throw error;
    }
  },

  /**
   * Delete an IPO
   */
  async deleteIPO(id: string): Promise<void> {
    try {
      const docRef = doc(db, IPOS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting IPO from Firebase:', error);
      throw error;
    }
  },
};

