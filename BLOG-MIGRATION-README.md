# 📚 Blog Migration to Supabase - Instructions

## 🎯 Files Created

1. **`migration-blog-to-supabase.sql`** - SQL script to create table and RLS policies
2. **`blog-articles-import.json`** - JSON data ready for import (6 articles)
3. **`generate-blog-json.js`** - Optional: Script to regenerate JSON if data changes

---

## 🚀 Step-by-Step Migration Guide

### **Step 1: Create Table in Supabase**

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy entire contents of `migration-blog-to-supabase.sql`
5. Paste and click **Run** ▶️

✅ This creates:
- `blog_articles` table with all columns
- Indexes for fast queries
- RLS policies (read = public, write = authenticated)
- Auto-update trigger for `updated_at`

---

### **Step 2: Import Data**

#### **Option A: Via Supabase Dashboard (Recommended)**

1. Go to **Table Editor** → Select `blog_articles` table
2. Click **Insert** → **Import data from spreadsheet**
3. Upload `blog-articles-import.json`
4. Map columns (should auto-detect)
5. Click **Import**

#### **Option B: Via SQL (Alternative)**

1. Go to **SQL Editor**
2. Copy-paste this for each article:

```sql
INSERT INTO blog_articles (slug, title, date, category, image, excerpt, author, content, related_articles)
VALUES (
  'jak-rozpoczac-diete-eliminacyjna',
  'Jak rozpocząć dietę eliminacyjną?',
  '2024-03-15',
  'Dieta',
  '/img/Blog/1.jpg',
  'Praktyczny przewodnik dla początkujących...',
  'Anna Kowalska',
  '<h2>Od czego zacząć...</h2>...',
  ARRAY['bezglutenowe-sniadania', 'planowanie-posilkow']
);
```

---

### **Step 3: Verify Import**

Run this query in SQL Editor:

```sql
SELECT slug, title, author, date 
FROM blog_articles 
ORDER BY date DESC;
```

Expected result: **6 articles**

---

## 🔒 RLS Policies Explanation

| Policy | Who | Action | Description |
|--------|-----|--------|-------------|
| Public Read | `anon` (unauthenticated) | SELECT | Anyone can read blog articles |
| Authenticated Read | `authenticated` | SELECT | Logged-in users can read |
| Authenticated Insert | `authenticated` | INSERT | Only logged-in users can add articles |
| Authenticated Update | `authenticated` | UPDATE | Only logged-in users can edit |
| Authenticated Delete | `authenticated` | DELETE | Only logged-in users can delete |

⚠️ **Security Note:** Currently ALL authenticated users can edit/delete. If you want admin-only access, modify policies to check `auth.uid()` against an admin table.

---

## 📊 Table Schema

```sql
blog_articles
├─ id (BIGSERIAL, PRIMARY KEY)
├─ slug (TEXT, UNIQUE) -- URL-friendly identifier
├─ title (TEXT) -- Article title
├─ date (DATE) -- Publication date
├─ category (TEXT) -- Category name
├─ image (TEXT) -- Image path
├─ excerpt (TEXT) -- Short description
├─ author (TEXT) -- Author name
├─ content (TEXT) -- Full HTML content
├─ related_articles (TEXT[]) -- Array of related slugs
├─ created_at (TIMESTAMPTZ) -- Auto-set
└─ updated_at (TIMESTAMPTZ) -- Auto-updated on changes
```

---

## 🔧 Next Steps After Import

1. **Update Frontend Code:**
   - Replace `import { blogPosts }` with Supabase fetch
   - Replace `import { articleDetails }` with Supabase fetch by slug

2. **Example Supabase Query:**

```javascript
// Fetch all articles
const { data: articles } = await supabase
  .from('blog_articles')
  .select('*')
  .order('date', { ascending: false });

// Fetch single article by slug
const { data: article } = await supabase
  .from('blog_articles')
  .select('*')
  .eq('slug', 'jak-rozpoczac-diete-eliminacyjna')
  .single();
```

3. **Test thoroughly** before removing old data files

---

## ✅ Checklist

- [ ] Run `migration-blog-to-supabase.sql` in Supabase SQL Editor
- [ ] Import `blog-articles-import.csv` into `blog_articles` table
  - **Note:** If CSV import fails for `related_articles` column, import without it and add manually via SQL (see instructions above)
- [ ] Verify 6 articles imported successfully
- [ ] Test RLS policies (try reading without auth)
- [x] ✅ Frontend updated to fetch from Supabase
- [x] ✅ Old data files removed (`blog-data.js`, `article-data.js`)
- [ ] Test all blog pages work correctly
  - `/blog` - list page
  - `/blog/{slug}` - article pages
  - Related articles links

---

## 🎉 Migration Complete!

Your blog now uses Supabase database instead of static JS files. The following changes were made:

### **Files Created:**
- ✅ `src/services/blogService.js` - Service for fetching blog data from Supabase
- ✅ `migration-blog-to-supabase.sql` - Database schema
- ✅ `blog-articles-import.csv` - Data for import

### **Files Updated:**
- ✅ `src/components/Pages/Blog/Blog.jsx` - Now fetches from Supabase
- ✅ `src/components/Pages/Blog/ArticlePage.jsx` - Now fetches from Supabase

### **Files Deleted:**
- ✅ `src/Data/blog-data.js` - Migrated to database
- ✅ `src/Data/article-data.js` - Migrated to database

---

## 📞 Need Help?

If you encounter errors:
1. Check Supabase logs (Settings → Logs)
2. Verify table exists: `\dt` in SQL Editor
3. Check RLS is enabled: `SELECT * FROM pg_policies WHERE tablename = 'blog_articles';`
