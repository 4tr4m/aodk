import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import blogService from '../../../services/blogService';
import SEO from '../../SEO/SEO';
import { motion } from 'framer-motion';
import FeedbackButton from '../../Feedback/FeedbackButton';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from Supabase on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const posts = await blogService.getAllArticles();
      setBlogPosts(posts);
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  // Get unique tags from all blog posts (categories in Supabase)
  const allTags = [...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on search and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.category === selectedTag;
    return matchesSearch && matchesTag;
  });

  // Get latest posts (most recent 3)
  const latestPosts = [...blogPosts].slice(0, 3);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleTagClick = useCallback((tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  }, [selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie artykułów...</p>
        </div>
      </div>
    );
  }

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);
  const hasResults = filteredPosts.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SEO 
        title="Blog - Autyzm od Kuchni | Wiedza o diecie eliminacyjnej w autyzmie"
        description="Artykuły, porady i przemyślenia dotyczące diety eliminacyjnej w autyzmie. Dowiedz się więcej o diecie bez glutenu, nabiału i cukru."
        keywords="blog o autyzmie, dieta w autyzmie, blog dieta eliminacyjna, porady, autyzm a dieta, dieta bezglutenowa, zaburzenia neurorozwojowe"
        canonical="https://www.autyzmodkuchni.pl/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.autyzmodkuchni.pl/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.autyzmodkuchni.pl/blog" }
          ]
        }}
      />
      
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] mb-3 font-bold tracking-wide">
          Blog
        </h1>
        <p className="font-['Lato'] text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Artykuły, porady i przemyślenia na temat diety eliminacyjnej
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Sidebar - sticky on desktop */}
          <aside className="lg:w-72 flex-shrink-0 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Search */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-['Patrick_Hand'] text-lg text-gray-800 mb-3">Wyszukaj</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Szukaj artykułów..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition-all duration-200 text-gray-800 placeholder-gray-400"
                  aria-label="Szukaj artykułów"
                />
              </div>

              {/* Latest Posts */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-['Patrick_Hand'] text-lg text-gray-800 mb-4">Najnowsze artykuły</h3>
                <div className="space-y-4">
                  {latestPosts.map((post, index) => (
                    <Link 
                      key={post.slug || index} 
                      to={`/blog/${post.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-['Patrick_Hand'] text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 text-sm leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-['Patrick_Hand'] text-lg text-gray-800 mb-3">Tagi</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag, index) => (
                    <button
                      key={tag || index}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedTag === tag 
                          ? 'bg-green-600 text-white shadow-sm' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {!hasResults ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
              >
                <p className="text-gray-500 font-['Lato']">Brak artykułów pasujących do wyszukiwania. Zmień filtr lub wyszukiwanie.</p>
              </motion.div>
            ) : (
              <>
                {/* Featured post (first result) - large card */}
                {featuredPost && (
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <Link to={`/blog/${featuredPost.slug}`} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                        {featuredPost.image && (
                          <img 
                            src={featuredPost.image} 
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                          <span className="text-white/95 text-sm font-medium">{featuredPost.date}</span>
                          <span className="text-white/80">·</span>
                          <span className="text-white/95 text-sm font-medium">{featuredPost.category}</span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="font-['Patrick_Hand'] text-2xl md:text-3xl text-[#2D3748] mb-3 leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="font-['Lato'] text-gray-600 mb-4 line-clamp-2">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-sm text-gray-500">{featuredPost.author}</span>
                          <span className="inline-flex items-center text-green-600 font-['Patrick_Hand'] font-medium hover:text-green-700">
                            Czytaj więcej →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )}

                {/* Rest of posts - grid */}
                {restPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {restPosts.map((post, index) => (
                      <motion.article 
                        key={post.slug || index}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3) }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                      >
                        <Link to={`/blog/${post.slug}`} className="block">
                          <div className="relative h-44 overflow-hidden">
                            {post.image && (
                              <img 
                                src={post.image} 
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <span>{post.date}</span>
                              <span>·</span>
                              <span>{post.category}</span>
                            </div>
                            <h3 className="font-['Patrick_Hand'] text-lg text-[#2D3748] mb-2 line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">{post.author}</span>
                              <span className="text-green-600 text-sm font-['Patrick_Hand']">Czytaj więcej →</span>
                            </div>
                          </div>
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
      <FeedbackButton />
      <Footer />
    </div>
  );
};

export default BlogPage;