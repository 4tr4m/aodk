import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../../services/blogService';
import { blocksToHtml, htmlToBlocks } from '../../../utils/blogContentUtils';
import BlogAdminLogin from './BlogAdminLogin';
import BlogAdminArticleList from './BlogAdminArticleList';
import BlogAdminArticleForm from './BlogAdminArticleForm';

const emptyForm = () => ({
  title: '',
  slug: '',
  date: new Date().toISOString().slice(0, 10),
  category: 'Dieta',
  excerpt: '',
  author: 'Marta Chmielnicka',
  image: '/img/Blog/',
  relatedSlugs: '',
});

/**
 * Admin page: list articles, create/edit with block editor.
 * Route: /admin/blog. Editing loads article content as blocks (same UI as create).
 */
const BlogAdminPage = () => {
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isAuthed, setIsAuthed] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [articles, setArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState(emptyForm());
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage?.getItem('blogAdminAuthed') === 'true') {
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoadingArticles(true);
      const list = await blogService.getAllArticles();
      setArticles(list || []);
      setLoadingArticles(false);
    };
    if (isAuthed) load();
  }, [isAuthed]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (login.username === 'admin' && login.password === 'Martusia84!') {
      setIsAuthed(true);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('blogAdminAuthed', 'true');
      }
      setStatus({ type: null, message: '' });
    } else {
      setStatus({ type: 'error', message: 'Nieprawidłowy login lub hasło.' });
    }
  };

  const setFormField = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const startNewArticle = () => {
    setEditingSlug(null);
    setForm(emptyForm());
    setBlocks([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEditArticle = (article) => {
    setEditingSlug(article.slug);
    setForm({
      title: article.title || '',
      slug: article.slug || '',
      date: article.date || new Date().toISOString().slice(0, 10),
      category: article.category || '',
      excerpt: article.excerpt || '',
      author: article.author || '',
      image: article.image || '',
      relatedSlugs: Array.isArray(article.related_articles)
        ? article.related_articles.join(', ')
        : '',
    });
    setBlocks(htmlToBlocks(article.content || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    const isEditing = Boolean(editingSlug);

    const confirmed = window.confirm(
      isEditing
        ? 'Czy na pewno chcesz zapisać zmiany w artykule?'
        : 'Czy na pewno chcesz opublikować nowy artykuł?'
    );
    if (!confirmed) return;

    const content = blocksToHtml(blocks);
    const related_articles = form.relatedSlugs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      title: form.title,
      slug: form.slug,
      date: form.date,
      category: form.category,
      excerpt: form.excerpt,
      author: form.author,
      content,
      image: form.image || undefined,
      related_articles: related_articles.length ? related_articles : undefined,
    };

    const { data, error } = isEditing
      ? await blogService.updateArticle(editingSlug, payload)
      : await blogService.createArticle(payload);

    if (error) {
      setStatus({ type: 'error', message: error.message || 'Błąd zapisu' });
      return;
    }
    setStatus({
      type: 'success',
      message: isEditing
        ? 'Artykuł zaktualizowany. Slug: ' + data?.slug
        : 'Artykuł dodany. Slug: ' + data?.slug,
    });

    const list = await blogService.getAllArticles();
    setArticles(list || []);

    if (isEditing) {
      setEditingSlug(null);
    }
    setBlocks([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-green-600 hover:text-green-700 font-medium mb-6 inline-block">
          ← Wróć do bloga
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Panel bloga (admin)</h1>

        {isAuthed && (
          <p className="mb-6 text-sm text-gray-600">
            {editingSlug
              ? `Tryb edycji artykułu: ${editingSlug}`
              : 'Tryb dodawania nowego artykułu.'}{' '}
            {editingSlug && (
              <button
                type="button"
                onClick={startNewArticle}
                className="ml-2 text-green-700 hover:underline"
              >
                + Nowy artykuł
              </button>
            )}
          </p>
        )}

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
          <BlogAdminLogin
            login={login}
            onLoginChange={handleLoginChange}
            onSubmit={handleLoginSubmit}
            status={status}
          />
        ) : (
          <>
            <BlogAdminArticleList
              articles={articles}
              loading={loadingArticles}
              onEdit={startEditArticle}
              onNew={startNewArticle}
            />
            <BlogAdminArticleForm
              form={form}
              onFormChange={setFormField}
              blocks={blocks}
              onBlocksChange={setBlocks}
              onSubmit={handleSubmit}
              isEditing={Boolean(editingSlug)}
              slugHint={!editingSlug}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogAdminPage;
