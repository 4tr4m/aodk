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
    <div>
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
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
            <h1 className="font-['Caveat'] text-5xl text-[#2D3748] mb-6">
              {article.title}
            </h1>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <img 
                src={article.image || getImageUrl('inne.jpg')} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none mb-16">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }} 
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
                        src={related.image || getImageUrl('inne.jpg')}
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
      <Footer />
    </div>
  );
};

export default ArticlePage;