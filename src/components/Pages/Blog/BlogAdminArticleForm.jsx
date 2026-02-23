import React from 'react';
import BlogContentBlockEditor from './BlogContentBlockEditor';

const BlogAdminArticleForm = ({
  form,
  onFormChange,
  blocks,
  onBlocksChange,
  onSubmit,
  isEditing,
  slugHint,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
    if (name === 'title' && slugHint) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9ąćęłńóśźż-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      onFormChange({ slug });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
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

      <BlogContentBlockEditor blocks={blocks} onChange={onBlocksChange} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Powiązane artykuły (slugi po przecinku)
        </label>
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
        {isEditing ? 'Zapisz zmiany' : 'Zapisz artykuł'}
      </button>
    </form>
  );
};

export default BlogAdminArticleForm;
