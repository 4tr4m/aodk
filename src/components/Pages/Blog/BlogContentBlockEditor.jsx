import React from 'react';
import { defaultBlock } from '../../../utils/blogContentUtils';

/**
 * Block-based content editor: header (h1–h6), image, text, raw HTML.
 * Used for both creating and editing articles.
 */
const BlogContentBlockEditor = ({ blocks, onChange }) => {
  const addBlock = (type) => onChange([...blocks, defaultBlock(type)]);
  const removeBlock = (id) => onChange(blocks.filter((b) => b.id !== id));
  const updateBlock = (id, patch) =>
    onChange(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const moveBlock = (index, dir) => {
    const next = index + dir;
    if (next < 0 || next >= blocks.length) return;
    const arr = [...blocks];
    [arr[index], arr[next]] = [arr[next], arr[index]];
    onChange(arr);
  };

  return (
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
          <button
            type="button"
            onClick={() => addBlock('raw')}
            className="px-3 py-1.5 text-sm bg-amber-100 hover:bg-amber-200 rounded-lg"
          >
            + Raw HTML
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-3">
        Dodaj bloki w dowolnej kolejności. Na zapis zostaną zamienione na HTML i zapisane w Supabase.
      </p>
      <div className="space-y-3">
        {blocks.length === 0 && (
          <div className="text-sm text-gray-400 py-4 border border-dashed border-gray-200 rounded-xl text-center">
            Brak bloków. Kliknij „+ Nagłówek”, „+ Obraz”, „+ Tekst” lub „+ Raw HTML”.
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
              {block.type === 'raw' && (
                <textarea
                  value={block.rawContent ?? ''}
                  onChange={(e) => updateBlock(block.id, { rawContent: e.target.value })}
                  placeholder="Dowolny HTML (np. &lt;div&gt;, &lt;ul&gt;)"
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 font-mono text-xs"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogContentBlockEditor;
