import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import blogService from '../../../services/blogService';
import SEO from '../../SEO/SEO';
import FeedbackButton from '../../Feedback/FeedbackButton';
import { getImageUrl } from '../../../utils/imageUtils';

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const fetchedArticle = await blogService.getArticleBySlug(slug);
      
      if (!fetchedArticle) {
        navigate('/blog');
        return;
      }
      
      setArticle(fetchedArticle);
      
      // Fetch related articles if they exist
      if (fetchedArticle.related_articles && fetchedArticle.related_articles.length > 0) {
        const related = await blogService.getRelatedArticles(fetchedArticle.related_articles);
        setRelatedArticles(related);
      }
      
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie artykułu...</p>
        </div>
      </div>
    );
  }

  if (!article) return null;

  // Extract first paragraph for meta description (strip HTML tags)
  const getMetaDescription = () => {
    const content = article.content;
    const firstParagraph = content.match(/<p>(.*?)<\/p>/);
    if (firstParagraph && firstParagraph[1]) {
      // Remove HTML tags
      return firstParagraph[1].replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160);
    }
    return article.excerpt || "Artykuł na temat diety eliminacyjnej w autyzmie.";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SEO 
        title={`${article.title} | Autyzm od Kuchni`}
        description={getMetaDescription()}
        keywords={`${article.category}, autyzm, dieta eliminacyjna`}
        ogType="article"
        ogImage={article.image}
        canonical={`https://www.autyzmodkuchni.pl/blog/${slug}`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.autyzmodkuchni.pl/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.autyzmodkuchni.pl/blog" },
              { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://www.autyzmodkuchni.pl/blog/${slug}` }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "image": article.image?.startsWith('http') ? article.image : `https://www.autyzmodkuchni.pl${article.image?.startsWith('/') ? article.image : '/' + article.image}`,
            "datePublished": article.date || undefined,
            "dateModified": article.updated_at || article.date || undefined,
            "author": { 
              "@type": "Person", 
              "name": article.author || "Autyzm od Kuchni" 
            },
            "publisher": {
              "@type": "Organization",
              "name": "Autyzm od Kuchni",
              "logo": { 
                "@type": "ImageObject", 
                "url": "https://www.autyzmodkuchni.pl/img/logo.png",
                "width": 200,
                "height": 200
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.autyzmodkuchni.pl/blog/${slug}`
            },
            "url": `https://www.autyzmodkuchni.pl/blog/${slug}`,
            "articleSection": article.category || undefined,
            "description": getMetaDescription()
          }
        ]}
      />
      {/* Header - same pattern as Contact and Blog, but tighter spacing on article page */}
      <div className="relative mb-2 md:mb-4">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      {/* Article content area - warm background like Wiedza, pulled closer to navbar */}
      <main className="flex-1 bg-[#F6EFE9] pt-0 pb-10 md:pt-0 md:pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / navigation */}
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

          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.author}</span>
            </div>
            <h1 className="font-['Caveat'] text-4xl sm:text-5xl text-[#2D3748] mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img 
                src={article.image || getImageUrl('inne.jpg')} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article body */}
          <article className="mb-16">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }} 
              className="font-['Lato'] text-gray-700 leading-relaxed prose prose-lg max-w-none prose-headings:font-['Patrick_Hand'] prose-headings:text-[#2D3748] prose-p:mb-4 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
            />
          </article>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <section className="border-t border-gray-200/80 pt-10">
              <h2 className="font-['Caveat'] text-3xl text-[#2D3748] mb-6">
                Powiązane artykuły
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((related, index) => (
                  <Link 
                    key={related.slug || index}
                    to={`/blog/${related.slug}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={related.image || getImageUrl('inne.jpg')}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-['Patrick_Hand'] text-lg text-[#2D3748] mb-2 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <FeedbackButton />
      <Footer />
    </div>
  );
};

export default ArticlePage;