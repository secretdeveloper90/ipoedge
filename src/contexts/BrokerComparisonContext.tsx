import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { message } from 'antd';
import type { Broker } from '../types';
import { STORAGE_KEYS } from '../constants';

interface BrokerComparisonState {
  comparedBrokers: Broker[];
  maxBrokers: number;
}

type BrokerComparisonAction =
  | { type: 'ADD_BROKER'; payload: Broker }
  | { type: 'REMOVE_BROKER'; payload: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'LOAD_FROM_STORAGE'; payload: Broker[] };

interface BrokerComparisonContextType {
  state: BrokerComparisonState;
  addBroker: (broker: Broker) => boolean;
  removeBroker: (brokerId: string) => void;
  clearAll: () => void;
  isBrokerInComparison: (brokerId: string) => boolean;
  canAddMoreBrokers: boolean;
  comparisonCount: number;
}

const BrokerComparisonContext = createContext<BrokerComparisonContextType | undefined>(undefined);

const STORAGE_KEY = STORAGE_KEYS.BROKER_COMPARISON || 'ipo_edge_broker_comparison';

const initialState: BrokerComparisonState = {
  comparedBrokers: [],
  maxBrokers: 3,
};

function brokerComparisonReducer(
  state: BrokerComparisonState,
  action: BrokerComparisonAction
): BrokerComparisonState {
  switch (action.type) {
    case 'ADD_BROKER':
      if (state.comparedBrokers.length >= state.maxBrokers) {
        return state;
      }
      if (state.comparedBrokers.some(broker => broker.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        comparedBrokers: [...state.comparedBrokers, action.payload],
      };

    case 'REMOVE_BROKER':
      return {
        ...state,
        comparedBrokers: state.comparedBrokers.filter(broker => broker.id !== action.payload),
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        comparedBrokers: [],
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        comparedBrokers: action.payload.slice(0, state.maxBrokers),
      };

    default:
      return state;
  }
}

interface BrokerComparisonProviderProps {
  children: ReactNode;
}

export const BrokerComparisonProvider: React.FC<BrokerComparisonProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(brokerComparisonReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedBrokers = JSON.parse(stored);
        if (Array.isArray(parsedBrokers)) {
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedBrokers });
        }
      }
    } catch (error) {
      console.error('Error loading broker comparison from storage:', error);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.comparedBrokers));
    } catch (error) {
      console.error('Error saving broker comparison to storage:', error);
    }
  }, [state.comparedBrokers]);

  const addBroker = (broker: Broker): boolean => {
    if (state.comparedBrokers.length >= state.maxBrokers) {
      message.warning(`You can compare maximum ${state.maxBrokers} brokers at a time`);
      return false;
    }

    if (state.comparedBrokers.some(b => b.id === broker.id)) {
      message.info(`${broker.name} is already in comparison`);
      return false;
    }

    dispatch({ type: 'ADD_BROKER', payload: broker });
    message.success(`${broker.name} added to comparison`);
    return true;
  };

  const removeBroker = (brokerId: string) => {
    const broker = state.comparedBrokers.find(b => b.id === brokerId);
    dispatch({ type: 'REMOVE_BROKER', payload: brokerId });
    if (broker) {
      message.success(`${broker.name} removed from comparison`);
    }
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    message.success('All brokers removed from comparison');
  };

  const isBrokerInComparison = (brokerId: string): boolean => {
    return state.comparedBrokers.some(broker => broker.id === brokerId);
  };

  const canAddMoreBrokers = state.comparedBrokers.length < state.maxBrokers;
  const comparisonCount = state.comparedBrokers.length;

  const contextValue: BrokerComparisonContextType = {
    state,
    addBroker,
    removeBroker,
    clearAll,
    isBrokerInComparison,
    canAddMoreBrokers,
    comparisonCount,
  };

  return (
    <BrokerComparisonContext.Provider value={contextValue}>
      {children}
    </BrokerComparisonContext.Provider>
  );
};

export const useBrokerComparison = (): BrokerComparisonContextType => {
  const context = useContext(BrokerComparisonContext);
  if (context === undefined) {
    throw new Error('useBrokerComparison must be used within a BrokerComparisonProvider');
  }
  return context;
};

export default BrokerComparisonContext;
