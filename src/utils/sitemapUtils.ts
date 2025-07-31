import type { IPO, Broker } from '../types';
import { BASE_URL } from './seoUtils';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Generate sitemap XML content
export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlEntries = urls.map(url => {
    return `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
};

// Generate static page URLs
export const getStaticPageUrls = (): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      loc: BASE_URL,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${BASE_URL}/ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/ipo/current-ipo`,
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/ipo/upcoming-ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/ipo/listed-ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/sme-ipo/current-ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/sme-ipo/upcoming-ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/sme-ipo/listed-ipo`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/buyback`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/buyback/current-buyback`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/buyback/upcoming-buyback`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/buyback/closed-buyback`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6
    },
    {
      loc: `${BASE_URL}/broker`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/bids`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/ipo-allotment-status`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/ipo-event-calendar`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      loc: `${BASE_URL}/faqs`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      loc: `${BASE_URL}/support`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      loc: `${BASE_URL}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      loc: `${BASE_URL}/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${BASE_URL}/terms-conditions`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${BASE_URL}/disclaimer`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];
};

// Generate IPO detail page URLs
export const getIPOPageUrls = (ipos: IPO[]): SitemapUrl[] => {
  return ipos.map(ipo => {
    const slug = ipo.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const lastmod = ipo.offerDate?.end ? new Date(ipo.offerDate.end).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

    return {
      loc: `${BASE_URL}/ipo/${slug}`,
      lastmod,
      changefreq: ipo.status === 'current' ? 'hourly' : ipo.status === 'upcoming' ? 'daily' : 'weekly',
      priority: ipo.status === 'current' ? 0.9 : ipo.status === 'upcoming' ? 0.8 : 0.7
    };
  });
};

// Generate broker page URLs
export const getBrokerPageUrls = (brokers: Broker[]): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return brokers.map(broker => {
    const slug = broker.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    return {
      loc: `${BASE_URL}/broker/${slug}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    };
  });
};

// Generate complete sitemap
export const generateCompleteSitemap = (ipos: IPO[], brokers: Broker[]): string => {
  const staticUrls = getStaticPageUrls();
  const ipoUrls = getIPOPageUrls(ipos);
  const brokerUrls = getBrokerPageUrls(brokers);
  
  const allUrls = [...staticUrls, ...ipoUrls, ...brokerUrls];
  
  return generateSitemapXML(allUrls);
};

// Generate robots.txt content
export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow important directories
Allow: /ipo/
Allow: /broker/
Allow: /buyback/
Allow: /sme-ipo/

# Block common bot traps
Disallow: /*?*
Disallow: /*#*
Disallow: /search?*
Disallow: /*utm_*
Disallow: /*ref=*
Disallow: /*source=*

# Allow CSS and JS files for better rendering
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.webp`;
};

// Function to download sitemap (for development/testing)
export const downloadSitemap = (content: string, filename: string = 'sitemap.xml') => {
  const blob = new Blob([content], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to download robots.txt (for development/testing)
export const downloadRobotsTxt = () => {
  const content = generateRobotsTxt();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'robots.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
