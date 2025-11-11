import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import { blogPosts } from '../../../Data/blog-data';
import { articleDetails } from '../../../Data/article-data';
import SEO from '../../SEO/SEO';
import FeedbackButton from '../../Feedback/FeedbackButton';

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const blogPost = blogPosts.find(post => post.slug === slug);
  const articleDetail = articleDetails[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!blogPost || !articleDetail) {
      navigate('/blog');
    }
  }, [blogPost, articleDetail, navigate]);

  if (!blogPost || !articleDetail) return null;

  const relatedArticles = blogPosts.filter(post => 
    articleDetail.relatedArticles.includes(post.slug)
  );

  // Extract first paragraph for meta description (strip HTML tags)
  const getMetaDescription = () => {
    const content = articleDetail.content;
    const firstParagraph = content.match(/<p>(.*?)<\/p>/);
    if (firstParagraph && firstParagraph[1]) {
      // Remove HTML tags
      return firstParagraph[1].replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160);
    }
    return blogPost.excerpt || "Artykuł na temat diety eliminacyjnej w autyzmie.";
  };

  return (
    <div>
      <SEO 
        title={`${blogPost.title} | Autyzm od Kuchni`}
        description={getMetaDescription()}
        keywords={`${blogPost.category}, autyzm, dieta eliminacyjna, ${blogPost.tags?.join(', ') || ''}`}
        ogType="article"
        ogImage={blogPost.image}
        canonical={`https://www.autyzmodkuchni.pl/blog/${slug}`}
      />
      {/* Mini hero section with TopNavBar */}
      <div className="relative">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-[#F6EFE9] py-12">
        <div className="max-w-4xl mx-auto px-5">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-lg transition-all duration-200 group"
            >
              <span className="text-lg group-hover:-translate-x-1 transition-transform duration-200">←</span>
              <span className="font-medium">Wróć do bloga</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <span>{blogPost.date}</span>
              <span>•</span>
              <span>{blogPost.category}</span>
              <span>•</span>
              <span>{blogPost.author}</span>
            </div>
            <h1 className="font-['Caveat'] text-5xl text-[#2D3748] mb-6">
              {blogPost.title}
            </h1>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-16">
            <div 
              dangerouslySetInnerHTML={{ __html: articleDetail.content }} 
              className="font-['Lato'] text-gray-700 leading-relaxed"
            />
          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-gray-200 pt-12">
              <h2 className="font-['Caveat'] text-3xl text-[#2D3748] mb-8">
                Powiązane artykuły
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map((related, index) => (
                  <Link 
                    key={index}
                    to={`/blog/${related.slug}`}
                    className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Patrick_Hand'] text-xl mb-2 text-gray-800">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <FeedbackButton />
    </div>
  );
};

export default ArticlePage;