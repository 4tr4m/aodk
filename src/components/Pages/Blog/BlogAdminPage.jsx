import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../../services/blogService';

const blockId = () => `b-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const escapeHtml = (s) => {
  if (s == null) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
};

/** Build HTML from blocks for Supabase content column */
const blocksToHtml = (blocks) => {
  return blocks
    .map((block) => {
      if (block.type === 'header') {
        const level = Math.min(6, Math.max(1, Number(block.level) || 2));
        return `<h${level}>${escapeHtml(block.text || '')}</h${level}>`;
      }
      if (block.type === 'image') {
        const raw = (block.path || '').trim();
        const src = raw.startsWith('/') ? raw : raw ? `/img/${raw.replace(/^\/?/, '')}` : '';
        if (!src) return '';
        return `<img src="${escapeHtml(src)}" alt="" />`;
      }
      if (block.type === 'text') {
        return `<p>${escapeHtml(block.text || '').replace(/\n/g, '<br />')}</p>`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n') || '';
};

const defaultBlock = (type) => {
  const id = blockId();
  if (type === 'header') return { id, type: 'header', level: 2, text: '' };
  if (type === 'image') return { id, type: 'image', path: 'Blog/' };
  if (type === 'text') return { id, type: 'text', text: '' };
  return { id, type: 'text', text: '' };
};

/**
 * Admin page to create blog articles with interactive block editor.
 * Route: /admin/blog. Content built as header/image/text blocks, converted to HTML on save.
 */
const BlogAdminPage = () => {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isAuthed, setIsAuthed] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [blocks, setBlocks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Dieta',
    excerpt: '',
    author: 'Marta Chmielnicka',
    image: '/img/Blog/',
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

  const addBlock = (type) => setBlocks((prev) => [...prev, defaultBlock(type)]);
  const removeBlock = (id) => setBlocks((prev) => prev.filter((b) => b.id !== id));
  const updateBlock = (id, patch) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const moveBlock = (index, dir) => {
    const next = index + dir;
    if (next < 0 || next >= blocks.length) return;
    setBlocks((prev) => {
      const arr = [...prev];
      [arr[index], arr[next]] = [arr[next], arr[index]];
      return arr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    const content = blocksToHtml(blocks);
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
      content,
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
      relatedSlugs: '',
    }));
    setBlocks([]);
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Obraz na górze (ścieżka)</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="/img/Blog/nazwa.jpg lub Blog/nazwa.jpg"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
            />
          </div>

          {/* Block-based content editor */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <label className="block text-sm font-medium text-gray-700">Treść artykułu (bloki)</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addBlock('header')}
                  className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  + Nagłówek
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('image')}
                  className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  + Obraz
                </button>
                <button
                  type="button"
                  onClick={() => addBlock('text')}
                  className="px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  + Tekst
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Dodaj bloki w dowolnej kolejności. Na zapis zostaną zamienione na HTML i zapisane w Supabase.
            </p>
            <div className="space-y-3">
              {blocks.length === 0 && (
                <div className="text-sm text-gray-400 py-4 border border-dashed border-gray-200 rounded-xl text-center">
                  Brak bloków. Kliknij „+ Nagłówek”, „+ Obraz” lub „+ Tekst”.
                </div>
              )}
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="flex gap-2 items-start p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Przesuń w górę"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 1)}
                      disabled={index === blocks.length - 1}
                      className="p-1.5 rounded bg-white border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Przesuń w dół"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      className="p-1.5 rounded bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      title="Usuń blok"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    {block.type === 'header' && (
                      <>
                        <select
                          value={block.level ?? 2}
                          onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) })}
                          className="mb-2 block w-full max-w-[120px] px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>H{n}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={block.text ?? ''}
                          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          placeholder="Tekst nagłówka"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                      </>
                    )}
                    {block.type === 'image' && (
                      <input
                        type="text"
                        value={block.path ?? ''}
                        onChange={(e) => updateBlock(block.id, { path: e.target.value })}
                        placeholder="np. Blog/1.jpg (plik w public/img/...)"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-sm"
                      />
                    )}
                    {block.type === 'text' && (
                      <textarea
                        value={block.text ?? ''}
                        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                        placeholder="Akapit tekstu (zapisany jako &lt;p&gt;)"
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
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
