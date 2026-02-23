import React from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import { blocksToHtml } from '../../../utils/blogContentUtils';
import { getImageUrl } from '../../../utils/imageUtils';

/**
 * Renders the full article page layout (header, main, footer) using current form + blocks.
 * Used in admin as a live preview of how the article will look on the site.
 */
const BlogArticlePreview = ({ form, blocks }) => {
  const content = blocksToHtml(blocks || []);
  const imageSrc = form?.image?.trim()
    ? form.image.startsWith('http') || form.image.startsWith('/')
      ? form.image
      : getImageUrl(form.image.replace(/^\/?img\/?/, ''))
    : getImageUrl('inne.jpg');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-clip-padding">
      <div className="relative mb-2 md:mb-4">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      <main className="flex-1 bg-[#F6EFE9] pt-0 pb-10 md:pt-0 md:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 hover:bg-white text-gray-800 hover:text-gray-900 rounded-full border border-gray-200 shadow-sm transition-all duration-200 group"
            >
              <span className="text-lg group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
              <span className="font-semibold font-['Lato'] tracking-wide text-sm md:text-base">
                Wróć do bloga
              </span>
            </Link>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-['Lato'] rounded-full border border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 bg-transparent transition-all duration-200"
            >
              <span className="text-base">🏠</span>
              <span>Strona główna</span>
            </Link>
          </div>

          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{form?.date || '—'}</span>
              <span>·</span>
              <span>{form?.category || '—'}</span>
              <span>·</span>
              <span>{form?.author || '—'}</span>
            </div>
            <h1 className="font-['Caveat'] text-4xl sm:text-5xl text-[#2D3748] mb-6 leading-tight">
              {form?.title || '(Brak tytułu)'}
            </h1>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img
                src={imageSrc}
                alt={form?.title || ''}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getImageUrl('inne.jpg');
                }}
              />
            </div>
          </header>

          <article className="mb-16">
            <div
              dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Brak treści. Dodaj bloki w edytorze.</p>' }}
              className="font-['Lato'] text-gray-700 leading-relaxed prose prose-lg max-w-none prose-headings:font-['Patrick_Hand'] prose-headings:text-[#2D3748] prose-p:mb-4 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticlePreview;
