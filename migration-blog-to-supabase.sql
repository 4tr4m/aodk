-- ============================================
-- Blog Articles Table Migration Script
-- ============================================

-- 1. Create blog_articles table
CREATE TABLE IF NOT EXISTS blog_articles (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  excerpt TEXT,
  author TEXT,
  content TEXT NOT NULL,
  related_articles TEXT[], -- Array of related article slugs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_date ON blog_articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Policy: Allow anonymous users to READ all articles (public blog)
CREATE POLICY "Allow public read access to blog articles"
  ON blog_articles
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow authenticated users to READ all articles
CREATE POLICY "Allow authenticated read access to blog articles"
  ON blog_articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to INSERT new articles (admin only - can be restricted further)
CREATE POLICY "Allow authenticated insert access to blog articles"
  ON blog_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to UPDATE articles (admin only - can be restricted further)
CREATE POLICY "Allow authenticated update access to blog articles"
  ON blog_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to DELETE articles (admin only - can be restricted further)
CREATE POLICY "Allow authenticated delete access to blog articles"
  ON blog_articles
  FOR DELETE
  TO authenticated
  USING (true);

-- 5. Add trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_blog_articles_updated_at
  BEFORE UPDATE ON blog_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_articles_updated_at();

-- ============================================
-- DONE! Now you can import your JSON data.
-- ============================================
