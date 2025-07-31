import { STORAGE_KEYS } from '../constants';
import type { IPOFilters } from '../types';

// Generic storage functions
export const storage = {
  // Get item from localStorage with type safety
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  // Set item to localStorage
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  },

  // Remove item from localStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  // Clear all localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// User preferences storage
export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  defaultFilters: IPOFilters;
  favoriteIPOs: string[];
  viewPreferences: {
    cardsPerPage: number;
    defaultView: 'grid' | 'list';
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
}

const defaultUserPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  defaultFilters: {},
  favoriteIPOs: [],
  viewPreferences: {
    cardsPerPage: 12,
    defaultView: 'grid',
    sortBy: 'date',
    sortOrder: 'desc'
  }
};

export const userPreferencesStorage = {
  get(): UserPreferences {
    return storage.get(STORAGE_KEYS.USER_PREFERENCES, defaultUserPreferences);
  },

  set(preferences: Partial<UserPreferences>): void {
    const current = this.get();
    const updated = { ...current, ...preferences };
    storage.set(STORAGE_KEYS.USER_PREFERENCES, updated);
  },

  update<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): void {
    const current = this.get();
    current[key] = value;
    storage.set(STORAGE_KEYS.USER_PREFERENCES, current);
  },

  reset(): void {
    storage.set(STORAGE_KEYS.USER_PREFERENCES, defaultUserPreferences);
  }
};

// Favorite IPOs storage
export const favoriteIPOsStorage = {
  get(): string[] {
    return storage.get(STORAGE_KEYS.FAVORITE_IPOS, []);
  },

  add(ipoId: string): void {
    const favorites = this.get();
    if (!favorites.includes(ipoId)) {
      favorites.push(ipoId);
      storage.set(STORAGE_KEYS.FAVORITE_IPOS, favorites);
    }
  },

  remove(ipoId: string): void {
    const favorites = this.get();
    const updated = favorites.filter(id => id !== ipoId);
    storage.set(STORAGE_KEYS.FAVORITE_IPOS, updated);
  },

  toggle(ipoId: string): boolean {
    const favorites = this.get();
    const isFavorite = favorites.includes(ipoId);
    
    if (isFavorite) {
      this.remove(ipoId);
      return false;
    } else {
      this.add(ipoId);
      return true;
    }
  },

  isFavorite(ipoId: string): boolean {
    return this.get().includes(ipoId);
  },

  clear(): void {
    storage.set(STORAGE_KEYS.FAVORITE_IPOS, []);
  }
};

// Theme storage
export const themeStorage = {
  get(): 'light' | 'dark' {
    return storage.get(STORAGE_KEYS.THEME, 'light');
  },

  set(theme: 'light' | 'dark'): void {
    storage.set(STORAGE_KEYS.THEME, theme);
    // Update user preferences as well
    userPreferencesStorage.update('theme', theme);
  },

  toggle(): 'light' | 'dark' {
    const current = this.get();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.set(newTheme);
    return newTheme;
  }
};

// Auth token storage
export const authStorage = {
  get(): string | null {
    return storage.get(STORAGE_KEYS.AUTH_TOKEN, null);
  },

  set(token: string): void {
    storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  remove(): void {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
  },

  isAuthenticated(): boolean {
    return !!this.get();
  }
};

// Search history storage
export const searchHistoryStorage = {
  get(): string[] {
    return storage.get('search_history', []);
  },

  add(query: string): void {
    if (!query.trim()) return;
    
    const history = this.get();
    const filtered = history.filter(item => item !== query);
    const updated = [query, ...filtered].slice(0, 10); // Keep only last 10 searches
    
    storage.set('search_history', updated);
  },

  remove(query: string): void {
    const history = this.get();
    const updated = history.filter(item => item !== query);
    storage.set('search_history', updated);
  },

  clear(): void {
    storage.set('search_history', []);
  }
};

// Recently viewed IPOs storage
export const recentlyViewedStorage = {
  get(): string[] {
    return storage.get('recently_viewed_ipos', []);
  },

  add(ipoId: string): void {
    const recent = this.get();
    const filtered = recent.filter(id => id !== ipoId);
    const updated = [ipoId, ...filtered].slice(0, 20); // Keep only last 20 viewed
    
    storage.set('recently_viewed_ipos', updated);
  },

  clear(): void {
    storage.set('recently_viewed_ipos', []);
  }
};

// Export all storage utilities
export default {
  storage,
  userPreferencesStorage,
  favoriteIPOsStorage,
  themeStorage,
  authStorage,
  searchHistoryStorage,
  recentlyViewedStorage
};
