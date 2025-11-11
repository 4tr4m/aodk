const fs = require('fs');
const path = require('path');

// Import data
require('dotenv').config();
const { kuchniaCategories } = require('../Data/category-data');
const { blogPosts } = require('../Data/blog-data');

// Base URL
const BASE_URL = 'https://www.autyzmodkuchni.pl';

// Current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Create sitemap
const generateSitemap = () => {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Static pages
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/kuchnia', priority: 0.9, changefreq: 'weekly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/kontakt', priority: 0.7, changefreq: 'monthly' },
  ];
  
  // Add static pages
  staticPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  // Add category pages
  if (kuchniaCategories && kuchniaCategories.mainCategories) {
    kuchniaCategories.mainCategories.forEach(category => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${BASE_URL}/kuchnia/${category.slug}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    });
  }
  
  // Add blog posts
  if (blogPosts) {
    blogPosts.forEach(post => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${BASE_URL}/blog/${post.slug}</loc>\n`;
      
      // Use post date if available, otherwise use current date
      const postDate = post.date ? new Date(post.date).toISOString().split('T')[0] : currentDate;
      sitemap += `    <lastmod>${postDate}</lastmod>\n`;
      
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.7</priority>\n';
      sitemap += '  </url>\n';
    });
  }
  
  sitemap += '</urlset>';
  
  return sitemap;
};

// Write sitemap to public directory
try {
  const sitemap = generateSitemap();
  const outputPath = path.resolve(__dirname, '../../public/sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
} catch (error) {
  console.error('Error generating sitemap:', error);
} 