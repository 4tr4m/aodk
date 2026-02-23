import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../../services/blogService';

/**
 * Simple admin page to create blog articles.
 * Route: /admin/blog (not linked from public site).
 * Secure via RLS or add auth before production.
 */
const BlogAdminPage = () => {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isAuthed, setIsAuthed] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Dieta',
    excerpt: '',
    author: 'Marta Chmielnicka',
    image: '/img/Blog/',
    content: '<p>Treść artykułu w HTML. Użyj &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a&gt; itd.</p>',
    relatedSlugs: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage?.getItem('blogAdminAuthed') === 'true') {
      setIsAuthed(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && !form.slug) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9ąćęłńóśźż-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setForm((prev) => ({ ...prev, slug }));
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (login.username === 'admin' && login.password === 'Martusia84!') {
      setIsAuthed(true);
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem('blogAdminAuthed', 'true');
      }
      setStatus({ type: null, message: '' });
    } else {
      setStatus({ type: 'error', message: 'Nieprawidłowy login lub hasło.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    const related_articles = form.relatedSlugs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const { data, error } = await blogService.createArticle({
      title: form.title,
      slug: form.slug,
      date: form.date,
      category: form.category,
      excerpt: form.excerpt,
      author: form.author,
      content: form.content,
      image: form.image || undefined,
      related_articles: related_articles.length ? related_articles : undefined,
    });
    if (error) {
      setStatus({ type: 'error', message: error.message || 'Błąd zapisu' });
      return;
    }
    setStatus({ type: 'success', message: 'Artykuł dodany. Slug: ' + data?.slug });
    setForm((prev) => ({
      ...prev,
      title: '',
      slug: '',
      excerpt: '',
      content: '<p>Nowy artykuł...</p>',
      relatedSlugs: '',
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-green-600 hover:text-green-700 font-medium mb-6 inline-block">
          ← Wróć do bloga
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Panel bloga (admin)</h1>

        {status.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
            }`}
          >
            {status.message}
          </div>
        )}

        {!isAuthed ? (
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-600">
              Zaloguj się, aby dodać lub edytować artykuły na blogu.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Użytkownik</label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hasło</label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
            >
              Zaloguj
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              placeholder="np. jak-zaczac-diete-eliminacyjna"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria *</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="np. Dieta"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lead / excerpt *</label>
            <input
              type="text"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              required
              placeholder="Krótki opis (np. Praktyczny przewodnik)"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autor *</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Obraz (ścieżka)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/img/Blog/nazwa.jpg"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treść (HTML) *</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={14}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Użyj: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;a href="..."&gt;. Bez &lt;html&gt;/&lt;body&gt;.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Powiązane artykuły (slugi po przecinku)</label>
            <input
              type="text"
              name="relatedSlugs"
              value={form.relatedSlugs}
              onChange={handleChange}
              placeholder="slug-artykulu-1, slug-artykulu-2"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            Zapisz artykuł
          </button>
        </form>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPage;
