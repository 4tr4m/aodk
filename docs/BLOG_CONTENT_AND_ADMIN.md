# Blog: Content format & admin

## Content format in Supabase (`content` column)

Store article body as **HTML** in the `content` column. The frontend renders it with `dangerouslySetInnerHTML`, so you can use normal HTML tags.

### Recommended HTML structure

Use semantic tags so the article page styling (prose, headings, links) looks good:

```html
<p>Pierwszy akapit wprowadzający temat artykułu.</p>

<h2>Nagłówek sekcji</h2>
<p>Treść sekcji. Możesz używać <strong>pogrubienia</strong> i <em>kursywy</em>.</p>

<h3>Podsekcja</h3>
<p>Więcej treści. Linki: <a href="/blog/inny-artykul">powiązany artykuł</a>.</p>

<ul>
  <li>Punkt listy 1</li>
  <li>Punkt listy 2</li>
</ul>

<p>Ostatni akapit z podsumowaniem.</p>
```

### Rules

- **Allowed:** `<p>`, `<h2>`, `<h3>`, `<h4>`, `<ul>`, `<ol>`, `<li>`, `<strong>`, `<em>`, `<a>`, `<br>`.
- **Avoid:** Full-page HTML (`<html>`, `<body>`, `<head>`). Store only the fragment that goes inside the article body.
- **Images inside content:** Use paths like `/img/Blog/nazwa.jpg` or full URLs. The site will display them in the article.

You can paste HTML from Word/Google Docs (after “Paste as plain text” or cleaning tags) or write it by hand. For a visual editor later, you could use a rich-text editor that outputs HTML (e.g. TipTap, Lexical) in an admin UI.

---

## How to create/edit articles

### Option A: Supabase Dashboard (Table Editor)

1. Open your project in [Supabase](https://supabase.com) → **Table Editor** → `blog_articles`.
2. Click **Insert** and fill columns: `title`, `slug`, `date`, `category`, `image`, `excerpt`, `author`, `content`, optionally `related_articles` (array of slugs).
3. `slug` must be unique and URL-friendly (e.g. `jak-zaczac-diete-eliminacyjna`). This becomes `/blog/<slug>`.

Good for one-off edits; no code changes.

### Option B: Admin page in the app

Use the **Blog Admin** page at `/admin/blog` to add new articles from the browser:

- Form fields: title, slug, excerpt, author, date, category, image path, content (HTML in a textarea), optional related slugs.
- Submit inserts a row into `blog_articles` via the same Supabase client as the rest of the site.

**Security:** The route `/admin/blog` is not linked from the public site. For production you should either:

- Restrict Supabase **Row Level Security (RLS)** so only authenticated users (or a dedicated “admin” role) can INSERT/UPDATE `blog_articles`, and add a simple login to the admin page, or  
- Keep using the Supabase Dashboard for edits and treat the in-app admin as a convenience for trusted environments only.

---

## Database columns reference

| Column             | Type     | Required | Example |
|--------------------|----------|----------|---------|
| `title`            | text     | ✓        | "Jak zacząć dietę eliminacyjną w autyzmie" |
| `slug`             | text     | ✓        | "jak-zaczac-diete-eliminacyjna" (unique) |
| `date`             | date     | ✓        | 2026-02-22 |
| `category`         | text     | ✓        | "Dieta" |
| `excerpt`          | text     | ✓        | "Praktyczny przewodnik" |
| `author`           | text     | ✓        | "Marta Chmielnicka" |
| `content`          | text     | ✓        | HTML fragment (see above) |
| `image`            | text     |          | "/img/Blog/obraz.jpg" |
| `related_articles` | text[]   |          | ["slug-innego-artykulu"] |
| `created_at`       | timestamptz |       | auto |
| `updated_at`      | timestamptz |       | set on update (if column exists) |
