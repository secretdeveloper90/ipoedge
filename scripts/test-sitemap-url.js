#!/usr/bin/env node

/**
 * Test sitemap.xml URL accessibility and headers
 * Run with: node scripts/test-sitemap-url.js
 */

import https from 'https';
import http from 'http';

const SITEMAP_URL = 'https://www.ipoedge.in/sitemap.xml';

function testSitemapUrl() {
  console.log('🌐 Testing sitemap URL accessibility...\n');
  console.log(`URL: ${SITEMAP_URL}\n`);

  const url = new URL(SITEMAP_URL);
  const client = url.protocol === 'https:' ? https : http;

  const req = client.request(url, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Status Message: ${res.statusMessage}\n`);

    console.log('📄 Response Headers:');
    Object.entries(res.headers).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    // Check important headers
    console.log('\n🔍 Header Analysis:');
    
    const contentType = res.headers['content-type'];
    if (contentType && contentType.includes('application/xml')) {
      console.log('✅ Content-Type: Correct (application/xml)');
    } else {
      console.log(`❌ Content-Type: Incorrect (${contentType})`);
    }

    const cacheControl = res.headers['cache-control'];
    if (cacheControl) {
      console.log(`✅ Cache-Control: ${cacheControl}`);
    } else {
      console.log('⚠️  Cache-Control: Not set');
    }

    // Read response body
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      console.log(`\n📏 Response Size: ${body.length} bytes`);
      
      // Basic XML validation
      if (body.startsWith('<?xml')) {
        console.log('✅ Response: Valid XML format');
      } else {
        console.log('❌ Response: Invalid XML format');
        console.log('First 200 characters:');
        console.log(body.substring(0, 200));
      }

      // Check for sitemap structure
      if (body.includes('<urlset') && body.includes('</urlset>')) {
        console.log('✅ Structure: Valid sitemap structure');
      } else {
        console.log('❌ Structure: Invalid sitemap structure');
      }

      // Count URLs
      const urlCount = (body.match(/<url>/g) || []).length;
      console.log(`📊 URL Count: ${urlCount}`);

      if (res.statusCode === 200) {
        console.log('\n🎉 Sitemap URL is accessible and properly configured!');
      } else {
        console.log('\n❌ Sitemap URL has issues. Check the status code and headers above.');
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error testing sitemap URL:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('💡 This might be because:');
      console.log('   - The domain is not accessible');
      console.log('   - DNS resolution failed');
      console.log('   - The site is not deployed yet');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 This might be because:');
      console.log('   - The server is not running');
      console.log('   - The port is not accessible');
      console.log('   - Firewall is blocking the connection');
    }
  });

  req.setTimeout(10000, () => {
    console.error('❌ Request timeout after 10 seconds');
    req.destroy();
  });

  req.end();
}

// Run the test
testSitemapUrl();
