import type { IPO, Broker } from '../types';

// Base URL for the website - update this with your actual domain
export const BASE_URL = 'https://www.ipoedge.in';

// Default SEO configuration
export const DEFAULT_SEO = {
  title: 'IPO Edge - India\'s Premier IPO Platform',
  description: 'IPO Edge is India\'s premier platform for tracking upcoming IPOs, reviewing performance, and making informed investment decisions. Get latest IPO news, analysis, and insights.',
  keywords: 'IPO, IPO India, Upcoming IPOs, Stock Market, Investment, NSE, BSE, IPO Tracker, IPO Review, IPO Analysis, IPO News',
  ogImage: `${BASE_URL}/og-image.jpg`,
  twitterCard: 'summary_large_image',
};

// Generate page title with site name
export const generatePageTitle = (pageTitle?: string): string => {
  if (!pageTitle) return DEFAULT_SEO.title;
  return `${pageTitle} | IPO Edge`;
};

// Generate canonical URL
export const generateCanonicalUrl = (path: string): string => {
  return `${BASE_URL}${path}`;
};

// Generate structured data for the website
export const generateWebsiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IPO Edge',
    description: DEFAULT_SEO.description,
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'IPO Edge',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`
      }
    }
  };
};

// Generate structured data for IPO
export const generateIPOStructuredData = (ipo: IPO) => {
  const getOfferPriceText = () => {
    if (typeof ipo.offerPrice === 'number') {
      return `₹${ipo.offerPrice}`;
    }
    return `₹${ipo.offerPrice.min}-₹${ipo.offerPrice.max}`;
  };

  const getPriceRange = () => {
    if (typeof ipo.offerPrice === 'number') {
      return ipo.offerPrice.toString();
    }
    return `${ipo.offerPrice.min}-${ipo.offerPrice.max}`;
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: ipo.name,
    description: `${ipo.name} IPO - Price band: ${getOfferPriceText()}`,
    category: 'Initial Public Offering',
    provider: {
      '@type': 'Organization',
      name: ipo.name
    },
    offers: {
      '@type': 'Offer',
      price: getPriceRange(),
      priceCurrency: 'INR',
      availability: ipo.status === 'current' ? 'InStock' : 'PreOrder',
      validFrom: ipo.offerDate.start,
      validThrough: ipo.offerDate.end
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Exchange',
        value: ipo.exchange
      },
      {
        '@type': 'PropertyValue',
        name: 'Issue Size',
        value: `₹${ipo.issueSize} Cr`
      },
      {
        '@type': 'PropertyValue',
        name: 'Lot Size',
        value: ipo.lotSize.toString()
      }
    ]
  };
};

// Generate structured data for broker
export const generateBrokerStructuredData = (broker: Broker) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: broker.name,
    description: `${broker.name} - Stock broker offering IPO services`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: broker.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: 100 // You might want to track actual review counts
    },
    offers: {
      '@type': 'Offer',
      description: 'IPO Investment Services'
    }
  };
};

// Generate SEO data for home page
export const getHomePageSEO = () => {
  return {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    keywords: DEFAULT_SEO.keywords,
    canonical: generateCanonicalUrl('/'),
    ogTitle: DEFAULT_SEO.title,
    ogDescription: DEFAULT_SEO.description,
    ogImage: DEFAULT_SEO.ogImage,
    ogUrl: generateCanonicalUrl('/'),
    ogType: 'website',
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: DEFAULT_SEO.title,
    twitterDescription: DEFAULT_SEO.description,
    twitterImage: DEFAULT_SEO.ogImage,
    structuredData: generateWebsiteStructuredData()
  };
};

// Generate SEO data for IPO listing pages
export const getIPOListPageSEO = (pageType: string) => {
  const titles = {
    current: 'Current IPOs',
    upcoming: 'Upcoming IPOs',
    listed: 'Listed IPOs',
    sme: 'SME IPOs'
  };

  const descriptions = {
    current: 'Explore current IPOs open for subscription in India. Get detailed analysis, price bands, and subscription status.',
    upcoming: 'Discover upcoming IPOs in India. Stay ahead with launch dates, price ranges, and company details.',
    listed: 'Track recently listed IPOs performance. View listing gains, current prices, and market performance.',
    sme: 'SME IPO listings on NSE and BSE. Small and Medium Enterprise IPO opportunities and analysis.'
  };

  const title = generatePageTitle(titles[pageType as keyof typeof titles] || 'IPO Listings');
  const description = descriptions[pageType as keyof typeof descriptions] || DEFAULT_SEO.description;
  const path = pageType === 'current' ? '/ipo/current-ipo' : 
               pageType === 'upcoming' ? '/ipo/upcoming-ipo' :
               pageType === 'listed' ? '/ipo/listed-ipo' : '/ipo';

  return {
    title,
    description,
    keywords: `${pageType} IPO, IPO India, ${DEFAULT_SEO.keywords}`,
    canonical: generateCanonicalUrl(path),
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_SEO.ogImage,
    ogUrl: generateCanonicalUrl(path),
    ogType: 'website',
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_SEO.ogImage
  };
};

// Generate SEO data for IPO detail page
export const getIPODetailPageSEO = (ipo: IPO) => {
  const title = generatePageTitle(`${ipo.name} IPO`);

  const getOfferPriceText = () => {
    if (typeof ipo.offerPrice === 'number') {
      return `₹${ipo.offerPrice}`;
    }
    return `₹${ipo.offerPrice.min}-₹${ipo.offerPrice.max}`;
  };

  const description = `${ipo.name} IPO details - Price band ${getOfferPriceText()}, Issue size ₹${ipo.issueSize} Cr. Get complete analysis, dates, and subscription status.`;
  const path = `/ipo/${ipo.name.toLowerCase().replace(/\s+/g, '-')}`;

  return {
    title,
    description,
    keywords: `${ipo.name} IPO, ${ipo.name} share price, IPO analysis, ${DEFAULT_SEO.keywords}`,
    canonical: generateCanonicalUrl(path),
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_SEO.ogImage,
    ogUrl: generateCanonicalUrl(path),
    ogType: 'article',
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_SEO.ogImage,
    structuredData: generateIPOStructuredData(ipo)
  };
};

// Generate SEO data for broker pages
export const getBrokerPageSEO = (broker?: Broker) => {
  if (broker) {
    const title = generatePageTitle(`${broker.name} - IPO Broker Review`);
    const description = `${broker.name} broker review for IPO investments. Rating: ${broker.rating}/5. Compare brokerage charges, features, and IPO services.`;
    const path = `/broker/${broker.name.toLowerCase().replace(/\s+/g, '-')}`;

    return {
      title,
      description,
      keywords: `${broker.name} broker, IPO broker, stock broker review, ${DEFAULT_SEO.keywords}`,
      canonical: generateCanonicalUrl(path),
      ogTitle: title,
      ogDescription: description,
      ogImage: DEFAULT_SEO.ogImage,
      ogUrl: generateCanonicalUrl(path),
      ogType: 'article',
      twitterCard: DEFAULT_SEO.twitterCard,
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: DEFAULT_SEO.ogImage,
      structuredData: generateBrokerStructuredData(broker)
    };
  }

  // Broker listing page
  const title = generatePageTitle('Best IPO Brokers in India');
  const description = 'Compare top IPO brokers in India. Find the best brokerage charges, features, and services for IPO investments.';

  return {
    title,
    description,
    keywords: `IPO brokers India, best IPO broker, stock broker comparison, ${DEFAULT_SEO.keywords}`,
    canonical: generateCanonicalUrl('/broker'),
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_SEO.ogImage,
    ogUrl: generateCanonicalUrl('/broker'),
    ogType: 'website',
    twitterCard: DEFAULT_SEO.twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_SEO.ogImage
  };
};
