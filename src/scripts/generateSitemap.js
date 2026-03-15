const fs = require('fs');
const path = require('path');

require('dotenv').config();
const { kuchniaCategories } = require('../Data/category-data');
const supabase = require('../lib/supabase');

const BASE_URL = 'https://www.autyzmodkuchni.pl';
const currentDate = new Date().toISOString().split('T')[0];

// Category name -> URL slug (must match recipeUtils.getCategorySlug)
const categoryToSlug = {
  'OBIADY': 'obiady',
  'ZUPY': 'zupy',
  'CHLEBY': 'chleby',
  'SMAROWIDŁA': 'smarowidla',
  'DESERY': 'desery',
  'BABECZKI i MUFFINY': 'babeczki-muffiny',
  'CIASTA': 'ciasta',
  'CIASTKA': 'ciastka',
  'SMOOTHIE': 'smoothie',
  'INNE': 'inne',
  'ŚWIĘTA': 'swieta',
  'SNAKI': 'snaki',
  'SAŁATKI/SUROWKI': 'salatki-surowki',
  'LUNCH': 'lunch',
};

function addUrl(sitemap, path, lastmod = currentDate, changefreq = 'weekly', priority = '0.7') {
  sitemap += '  <url>\n';
  sitemap += `    <loc>${BASE_URL}${path}</loc>\n`;
  sitemap += `    <lastmod>${lastmod}</lastmod>\n`;
  sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
  sitemap += `    <priority>${priority}</priority>\n`;
  sitemap += '  </url>\n';
  return sitemap;
}

async function generateSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  const staticPages = [
    { url: '/', priority: '1', changefreq: 'weekly' },
    { url: '/kuchnia', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/kontakt', priority: '0.7', changefreq: 'monthly' },
    { url: '/uslugi', priority: '0.85', changefreq: 'monthly' },
    { url: '/historia/o-mnie', priority: '0.7', changefreq: 'monthly' },
    { url: '/historia/o-autyzmie', priority: '0.7', changefreq: 'monthly' },
    { url: '/znajdki', priority: '0.8', changefreq: 'weekly' },
  ];
  staticPages.forEach((p) => {
    sitemap = addUrl(sitemap, p.url, currentDate, p.changefreq, p.priority);
  });

  // Category pages (from category-data)
  if (kuchniaCategories?.mainCategories) {
    kuchniaCategories.mainCategories.forEach((cat) => {
      const slug = cat.link ? cat.link.replace('/kuchnia/', '') : cat.slug;
      if (slug && slug !== 'undefined') {
        sitemap = addUrl(sitemap, `/kuchnia/${slug}`, currentDate, 'weekly', '0.8');
      }
    });
  }

  // Recipes from Supabase
  try {
    const { data: recipes, error: recipesError } = await supabase
      .from('recipes')
      .select('id, name, category, updated_at')
      .eq('is_published', true);
    if (!recipesError && recipes?.length) {
      // Helper: build SEO-friendly slug from recipe name + stable ID suffix
      const slugifyText = (text) => {
        if (!text || typeof text !== 'string') return '';
        const polishMap = {
          ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ż: 'z', ź: 'z',
          Ą: 'a', Ć: 'c', Ę: 'e', Ł: 'l', Ń: 'n', Ó: 'o', Ś: 's', Ż: 'z', Ź: 'z',
        };
        const normalized = text
          .split('')
          .map((ch) => polishMap[ch] || ch)
          .join('')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        return normalized;
      };

      recipes.forEach((r) => {
        const base = slugifyText(r.name || r.id || '');
        const slugPart = r.id ? `${base}--${r.id}` : base;
        const path = `/przepis/${slugPart}`;
        const lastmod = r.updated_at ? r.updated_at.split('T')[0] : currentDate;
        sitemap = addUrl(sitemap, path, lastmod, 'monthly', '0.6');
      });
    }
  } catch (e) {
    console.warn('Could not fetch recipes for sitemap:', e.message);
  }

  // Blog articles from Supabase
  try {
    const { data: articles, error: blogError } = await supabase
      .from('blog_articles')
      .select('slug, date, updated_at')
      .order('date', { ascending: false });
    if (!blogError && articles?.length) {
      articles.forEach((a) => {
        if (!a.slug) return;
        const lastmod = (a.updated_at || a.date || '').toString().split('T')[0] || currentDate;
        sitemap = addUrl(sitemap, `/blog/${a.slug}`, lastmod, 'monthly', '0.7');
      });
    }
  } catch (e) {
    console.warn('Could not fetch blog articles for sitemap:', e.message);
  }

  sitemap += '</urlset>';
  return sitemap;
}

(async () => {
  try {
    const sitemap = await generateSitemap();
    const outputPath = path.resolve(__dirname, '../../public/sitemap.xml');
    fs.writeFileSync(outputPath, sitemap);
    const count = (sitemap.match(/<url>/g) || []).length;
    console.log(`Sitemap generated: ${count} URLs at ${outputPath}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
})(); 