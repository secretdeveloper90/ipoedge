#!/usr/bin/env node

/**
 * Validate sitemap.xml for proper XML structure and Google compliance
 * Run with: node scripts/validate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

function validateSitemap() {
  console.log('🔍 Validating sitemap.xml...\n');

  // Check if sitemap exists
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ Sitemap not found at:', sitemapPath);
    process.exit(1);
  }

  // Read sitemap content
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

  // Basic XML validation checks
  const checks = [
    {
      name: 'XML Declaration',
      test: () => sitemapContent.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
      message: 'XML declaration should be present and properly formatted'
    },
    {
      name: 'Sitemap Namespace',
      test: () => sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
      message: 'Sitemap namespace should be present'
    },
    {
      name: 'Schema Location',
      test: () => sitemapContent.includes('xsi:schemaLocation'),
      message: 'Schema location should be specified for better validation'
    },
    {
      name: 'URL Structure',
      test: () => {
        const urlMatches = sitemapContent.match(/<url>/g);
        const locMatches = sitemapContent.match(/<loc>/g);
        return urlMatches && locMatches && urlMatches.length === locMatches.length;
      },
      message: 'Each <url> should contain a <loc> element'
    },
    {
      name: 'Valid URLs',
      test: () => {
        const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
        const matches = [...sitemapContent.matchAll(locRegex)];
        return matches.every(match => {
          try {
            new URL(match[1]);
            return true;
          } catch {
            return false;
          }
        });
      },
      message: 'All URLs should be valid and absolute'
    },
    {
      name: 'Proper Closing',
      test: () => sitemapContent.trim().endsWith('</urlset>'),
      message: 'Sitemap should end with </urlset>'
    },
    {
      name: 'File Size',
      test: () => {
        const stats = fs.statSync(sitemapPath);
        return stats.size < 50 * 1024 * 1024; // 50MB limit
      },
      message: 'Sitemap should be under 50MB'
    },
    {
      name: 'URL Count',
      test: () => {
        const urlCount = (sitemapContent.match(/<url>/g) || []).length;
        return urlCount <= 50000; // Google's limit
      },
      message: 'Sitemap should contain no more than 50,000 URLs'
    }
  ];

  let allPassed = true;
  
  checks.forEach(check => {
    try {
      const passed = check.test();
      if (passed) {
        console.log(`✅ ${check.name}: PASSED`);
      } else {
        console.log(`❌ ${check.name}: FAILED - ${check.message}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${check.name}: ERROR - ${error.message}`);
      allPassed = false;
    }
  });

  // Count URLs
  const urlCount = (sitemapContent.match(/<url>/g) || []).length;
  console.log(`\n📊 Total URLs: ${urlCount}`);

  // File size
  const stats = fs.statSync(sitemapPath);
  console.log(`📁 File size: ${(stats.size / 1024).toFixed(2)} KB`);

  if (allPassed) {
    console.log('\n🎉 Sitemap validation passed! Your sitemap should work with Google Search Console.');
  } else {
    console.log('\n⚠️  Sitemap validation failed. Please fix the issues above.');
    process.exit(1);
  }
}

// Run validation
validateSitemap();
