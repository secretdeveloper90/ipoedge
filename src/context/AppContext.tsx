import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { IPO, Buyback, Broker, User, IPOFilters } from '../types';

// State interface
interface AppState {
  user: User | null;
  ipos: IPO[];
  buybacks: Buyback[];
  brokers: Broker[];
  loading: boolean;
  error: string | null;
  filters: IPOFilters;
  searchQuery: string;
}

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_IPOS'; payload: IPO[] }
  | { type: 'SET_BUYBACKS'; payload: Buyback[] }
  | { type: 'SET_BROKERS'; payload: Broker[] }
  | { type: 'SET_FILTERS'; payload: IPOFilters }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'ADD_IPO'; payload: IPO }
  | { type: 'UPDATE_IPO'; payload: { id: string; updates: Partial<IPO> } }
  | { type: 'REMOVE_IPO'; payload: string }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState = {
  user: null,
  ipos: [],
  buybacks: [],
  brokers: [],
  loading: false,
  error: null,
  filters: {},
  searchQuery: '',
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_IPOS':
      return { ...state, ipos: action.payload, loading: false };
    
    case 'SET_BUYBACKS':
      return { ...state, buybacks: action.payload, loading: false };
    
    case 'SET_BROKERS':
      return { ...state, brokers: action.payload, loading: false };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_IPO':
      return { ...state, ipos: [...state.ipos, action.payload] };
    
    case 'UPDATE_IPO':
      return {
        ...state,
        ipos: state.ipos.map(ipo =>
          ipo.id === action.payload.id
            ? { ...ipo, ...action.payload.updates }
            : ipo
        ),
      };
    
    case 'REMOVE_IPO':
      return {
        ...state,
        ipos: state.ipos.filter(ipo => ipo.id !== action.payload),
      };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
};

// Context interface
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  setIPOs: (ipos: IPO[]) => void;
  setBuybacks: (buybacks: Buyback[]) => void;
  setBrokers: (brokers: Broker[]) => void;
  setFilters: (filters: IPOFilters) => void;
  setSearchQuery: (query: string) => void;
  addIPO: (ipo: IPO) => void;
  updateIPO: (id: string, updates: Partial<IPO>) => void;
  removeIPO: (id: string) => void;
  resetState: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUser = (user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setIPOs = (ipos: IPO[]) => {
    dispatch({ type: 'SET_IPOS', payload: ipos });
  };

  const setBuybacks = (buybacks: Buyback[]) => {
    dispatch({ type: 'SET_BUYBACKS', payload: buybacks });
  };

  const setBrokers = (brokers: Broker[]) => {
    dispatch({ type: 'SET_BROKERS', payload: brokers });
  };

  const setFilters = (filters: IPOFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const addIPO = (ipo: IPO) => {
    dispatch({ type: 'ADD_IPO', payload: ipo });
  };

  const updateIPO = (id: string, updates: Partial<IPO>) => {
    dispatch({ type: 'UPDATE_IPO', payload: { id, updates } });
  };

  const removeIPO = (id: string) => {
    dispatch({ type: 'REMOVE_IPO', payload: id });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value: AppContextType = {
    state,
    dispatch,
    setLoading,
    setError,
    setUser,
    setIPOs,
    setBuybacks,
    setBrokers,
    setFilters,
    setSearchQuery,
    addIPO,
    updateIPO,
    removeIPO,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Export only the hook for external use
export { useAppContext };
