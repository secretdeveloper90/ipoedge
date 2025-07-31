#!/usr/bin/env node

/**
 * Generate sitemap.xml for IPO Edge website
 * Run with: node scripts/generate-sitemap.js
 *
 * This script generates a sitemap.xml file with proper XML headers
 * and ensures it's served with the correct content-type.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import mock data (you'll need to adjust paths based on your build setup)
const BASE_URL = 'https://www.ipoedge.in';

// Static pages
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/ipo', priority: '0.9', changefreq: 'daily' },
  { url: '/ipo/current-ipo', priority: '0.9', changefreq: 'hourly' },
  { url: '/ipo/upcoming-ipo', priority: '0.9', changefreq: 'daily' },
  { url: '/ipo/listed-ipo', priority: '0.8', changefreq: 'daily' },
  { url: '/sme-ipo/current-ipo', priority: '0.8', changefreq: 'daily' },
  { url: '/sme-ipo/upcoming-ipo', priority: '0.8', changefreq: 'daily' },
  { url: '/sme-ipo/listed-ipo', priority: '0.7', changefreq: 'daily' },
  { url: '/buyback', priority: '0.7', changefreq: 'weekly' },
  { url: '/buyback/current-buyback', priority: '0.7', changefreq: 'daily' },
  { url: '/buyback/upcoming-buyback', priority: '0.7', changefreq: 'daily' },
  { url: '/buyback/closed-buyback', priority: '0.6', changefreq: 'weekly' },
  { url: '/broker', priority: '0.8', changefreq: 'weekly' },
  { url: '/bids', priority: '0.7', changefreq: 'daily' },
  { url: '/ipo-allotment-status', priority: '0.8', changefreq: 'daily' },
  { url: '/ipo-event-calendar', priority: '0.8', changefreq: 'daily' },
  { url: '/about', priority: '0.5', changefreq: 'monthly' },
  { url: '/faqs', priority: '0.6', changefreq: 'monthly' },
  { url: '/support', priority: '0.5', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { url: '/terms-conditions', priority: '0.3', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.3', changefreq: 'yearly' }
];

// IPO pages (you can expand this list)
const ipoPages = [
  { 
    name: 'GNG Electronics', 
    slug: 'gng-electronics', 
    status: 'current',
    lastmod: '2025-01-29'
  },
  { 
    name: 'Swastika Castal', 
    slug: 'swastika-castal', 
    status: 'listed',
    lastmod: '2025-01-25'
  },
  { 
    name: 'Savy Infra Logistics', 
    slug: 'savy-infra-logistics', 
    status: 'listed',
    lastmod: '2025-01-25'
  },
  { 
    name: 'Indiqube Spaces', 
    slug: 'indiqube-spaces', 
    status: 'current',
    lastmod: '2025-01-28'
  },
  { 
    name: 'JSW Cement', 
    slug: 'jsw-cement', 
    status: 'upcoming',
    lastmod: '2025-01-28'
  },
  { 
    name: 'Bajaj Housing Finance', 
    slug: 'bajaj-housing-finance', 
    status: 'upcoming',
    lastmod: '2025-01-28'
  }
];

// Broker pages
const brokerPages = [
  { name: 'Zerodha', slug: 'zerodha' },
  { name: 'Upstox', slug: 'upstox' },
  { name: 'Angel One', slug: 'angel-one' },
  { name: 'ICICI Direct', slug: 'icici-direct' },
  { name: 'HDFC Securities', slug: 'hdfc-securities' },
  { name: 'Kotak Securities', slug: 'kotak-securities' },
  { name: 'Axis Direct', slug: 'axis-direct' },
  { name: 'SBI Securities', slug: 'sbi-securities' }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  // Start with proper XML declaration and encoding
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add IPO pages
  ipoPages.forEach(ipo => {
    const priority = ipo.status === 'current' ? '0.9' : ipo.status === 'upcoming' ? '0.8' : '0.7';
    const changefreq = ipo.status === 'current' ? 'hourly' : ipo.status === 'upcoming' ? 'daily' : 'weekly';

    sitemap += `
  <url>
    <loc>${BASE_URL}/ipo/${ipo.slug}</loc>
    <lastmod>${ipo.lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // Add broker pages
  brokerPages.forEach(broker => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/broker/${broker.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Generate and save sitemap
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

// Ensure the public directory exists
const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write sitemap with UTF-8 encoding
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
console.log(`📊 Total URLs: ${staticPages.length + ipoPages.length + brokerPages.length}`);
console.log(`🌐 Base URL: ${BASE_URL}`);
console.log(`📅 Generated on: ${new Date().toISOString()}`);

// Verify the file was created correctly
if (fs.existsSync(outputPath)) {
  const fileStats = fs.statSync(outputPath);
  console.log(`📁 File size: ${fileStats.size} bytes`);

  // Check if file starts with XML declaration
  const firstLine = fs.readFileSync(outputPath, 'utf8').split('\n')[0];
  if (firstLine.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    console.log(`✅ XML declaration verified`);
  } else {
    console.log(`❌ Warning: XML declaration not found`);
  }
}

// Also generate a simple robots.txt if it doesn't exist
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

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

  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`✅ Robots.txt generated at: ${robotsPath}`);
}

console.log(`
🚀 Next Steps:
1. Upload your website to https://www.ipoedge.in
2. Submit sitemap to Google Search Console
3. Request indexing for key pages
4. Monitor crawl status and rankings
`);
