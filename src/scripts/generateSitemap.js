const fs = require('fs');
const path = require('path');

// Import data
require('dotenv').config();
const { kuchniaCategories } = require('../Data/category-data');

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
      // Extract slug from link (e.g., '/kuchnia/obiady' -> 'obiady')
      const slug = category.link ? category.link.replace('/kuchnia/', '') : category.slug;
      if (slug && slug !== 'undefined') {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${BASE_URL}/kuchnia/${slug}</loc>\n`;
        sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.8</priority>\n';
        sitemap += '  </url>\n';
      }
    });
  }
  
  // Add additional static pages (Oferta, Historia, Znajdki)
  const additionalPages = [
    { url: '/uslugi', priority: 0.85, changefreq: 'monthly' },
    { url: '/historia/o-mnie', priority: 0.7, changefreq: 'monthly' },
    { url: '/historia/o-autyzmie', priority: 0.7, changefreq: 'monthly' },
    { url: '/znajdki', priority: 0.8, changefreq: 'weekly' },
  ];
  
  additionalPages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  // Note: Recipes and blog posts from database should be added dynamically
  // For now, recipes and blog posts are indexed via their category/blog pages
  // If you need individual URLs in sitemap, you'll need to:
  // 1. Connect to Supabase in this script
  // 2. Fetch all recipes/blog posts
  // 3. Add them with format: /przepis/{recipe.id} or /blog/{post.slug}
  
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