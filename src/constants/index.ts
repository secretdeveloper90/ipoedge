// API endpoints
export const API_ENDPOINTS = {
  IPOS: '/api/ipos',
  BUYBACKS: '/api/buybacks',
  BROKERS: '/api/brokers',
  USER: '/api/user',
  APPLICATIONS: '/api/applications',
  ALLOTMENT: '/api/allotment',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  IPO: '/ipo',
  CURRENT_IPO: '/ipo/current-ipo',
  UPCOMING_IPO: '/ipo/upcoming-ipo',
  LISTED_IPO: '/ipo/listed-ipo',
  CURRENT_SME_IPO: '/sme-ipo/current-ipo',
  UPCOMING_SME_IPO: '/sme-ipo/upcoming-ipo',
  LISTED_SME_IPO: '/sme-ipo/listed-ipo',
  IPO_DETAIL: '/ipo/:name',
  BUYBACK: '/buyback',
  CURRENT_BUYBACK: '/buyback/current-buyback',
  UPCOMING_BUYBACK: '/buyback/upcoming-buyback',
  CLOSED_BUYBACK: '/buyback/closed-buyback',
  BROKERS: '/broker',
  BROKER_DETAIL: '/broker/:name',
  BROKER_COMPARE: '/broker/compare',
  BIDS: '/bids',
  ALLOTMENT: '/ipo-allotment-status',
  ALLOTMENT_CHECK: '/ipo-allotment-status/:name',
  CALENDAR: '/ipo-event-calendar',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  FAQS: '/faqs',
  HELP_CENTER: '/support',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  DISCLAIMER: '/disclaimer',
} as const;

// IPO status options
export const IPO_STATUS = {
  UPCOMING: 'upcoming',
  CURRENT: 'current',
  LISTED: 'listed',
  CLOSED: 'closed',
} as const;

// IPO categories
export const IPO_CATEGORIES = {
  MAINBOARD: 'mainboard',
  SME: 'sme',
} as const;

// Exchange options
export const EXCHANGES = {
  NSE: 'NSE',
  BSE: 'BSE',
  NSE_SME: 'NSE SME',
  BSE_SME: 'BSE SME',
  MAINBOARD: 'Mainboard',
} as const;

// Application categories
export const APPLICATION_CATEGORIES = {
  RETAIL: 'retail',
  HNI: 'hni',
  QIB: 'qib',
} as const;

// Buyback status
export const BUYBACK_STATUS = {
  UPCOMING: 'upcoming',
  CURRENT: 'current',
  CLOSED: 'closed',
} as const;

// Sort options
export const SORT_OPTIONS = {
  NAME: 'name',
  DATE: 'date',
  SUBSCRIPTION: 'subscription',
  GMP: 'gmp',
  PRICE: 'price',
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  FULL: 'MMMM DD, YYYY',
  SHORT: 'DD/MM/YYYY',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'ipo_edge_user_preferences',
  FAVORITE_IPOS: 'ipo_edge_favorite_ipos',
  THEME: 'ipo_edge_theme',
  AUTH_TOKEN: 'ipo_edge_auth_token',
  BROKER_COMPARISON: 'ipo_edge_broker_comparison',
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const;

// Colors for status indicators
export const STATUS_COLORS = {
  UPCOMING: '#1890ff',
  CURRENT: '#52c41a',
  LISTED: '#722ed1',
  CLOSED: '#8c8c8c',
  SUCCESS: '#52c41a',
  WARNING: '#faad14',
  ERROR: '#ff4d4f',
} as const;

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Animation durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;
