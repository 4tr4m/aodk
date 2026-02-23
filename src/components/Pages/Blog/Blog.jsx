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

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTag(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-['Lato']">Ładowanie artykułów...</p>
        </div>
      </div>
    );
  }

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);
  const hasResults = filteredPosts.length > 0;
  const hasActiveFilters = searchQuery.trim() !== '' || selectedTag !== null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10 text-center"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content - first on mobile (order-1), left on desktop */}
          <main className="flex-1 min-w-0 order-1">
            {/* Filter summary when filters active */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-wrap items-center gap-3"
              >
                <span className="font-['Lato'] text-sm text-gray-600">
                  {hasResults ? (
                    <>{filteredPosts.length} {filteredPosts.length === 1 ? 'wynik' : filteredPosts.length < 5 ? 'wyniki' : 'wyników'}</>
                  ) : (
                    'Brak wyników'
                  )}
                  {selectedTag && (
                    <span className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium">
                      {selectedTag}
                    </span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-['Lato'] text-green-600 hover:text-green-700 underline focus:outline-none focus:ring-2 focus:ring-green-300 rounded"
                >
                  Wyczyść filtry
                </button>
              </motion.div>
            )}

            {!hasResults ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100"
              >
                <p className="text-gray-500 font-['Lato'] mb-4">Brak artykułów pasujących do wyszukiwania. Zmień filtr lub wyszukiwanie.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-['Patrick_Hand'] text-green-600 hover:text-green-700 font-medium"
                >
                  Wyczyść filtry
                </button>
              </motion.div>
            ) : (
              <>
                {/* Featured post (first result) - hero-style card */}
                {featuredPost && (
                  <motion.article
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                      <div className="relative aspect-[16/9] sm:aspect-[2/1] max-h-[380px] overflow-hidden">
                        {featuredPost.image && (
                          <img
                            src={featuredPost.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                            Wyróżniony
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-white/95 text-sm font-medium drop-shadow-sm">
                          <span>{featuredPost.date}</span>
                          <span className="opacity-80">·</span>
                          <span>{featuredPost.category}</span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 className="font-['Patrick_Hand'] text-2xl md:text-3xl text-[#2D3748] mb-3 leading-tight group-hover:text-green-700 transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="font-['Lato'] text-gray-600 mb-5 line-clamp-2 text-base leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="text-sm text-gray-500 font-['Lato']">{featuredPost.author}</span>
                          <span className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-green-700 font-['Patrick_Hand'] font-medium text-sm hover:bg-green-100 transition-colors">
                            Czytaj więcej
                            <span className="text-green-600" aria-hidden>→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                )}

                {/* Rest of posts - responsive grid */}
                {restPosts.length > 0 && (
                  <section aria-label="Pozostałe artykuły">
                    <h2 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#2D3748] font-semibold mb-6">
                      Pozostałe artykuły
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                      {restPosts.map((post, index) => (
                        <motion.article
                          key={post.slug || index}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.35) }}
                          className="flex flex-col"
                        >
                          <Link
                            to={`/blog/${post.slug}`}
                            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                          >
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                              {post.image && (
                                <img
                                  src={post.image}
                                  alt=""
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              )}
                              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                              <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2 text-white/95 text-xs font-medium">
                                <span>{post.date}</span>
                                <span className="opacity-80">·</span>
                                <span>{post.category}</span>
                              </div>
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                              <h3 className="font-['Patrick_Hand'] text-lg text-[#2D3748] mb-2 line-clamp-2 leading-tight group-hover:text-green-700 transition-colors">
                                {post.title}
                              </h3>
                              <p className="font-['Lato'] text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                                {post.excerpt}
                              </p>
                              <div className="flex items-center justify-between gap-2 mt-auto">
                                <span className="text-xs text-gray-500 font-['Lato'] truncate">{post.author}</span>
                                <span className="inline-flex items-center gap-1 text-green-600 text-sm font-['Patrick_Hand'] font-medium shrink-0">
                                  Czytaj
                                  <span aria-hidden>→</span>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </main>

          {/* Sidebar - below main on mobile, right on desktop */}
          <aside className="lg:w-80 flex-shrink-0 order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Search */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-['Patrick_Hand'] text-lg text-gray-800 mb-3">Wyszukaj</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Szukaj artykułów..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition-all duration-200 text-gray-800 placeholder-gray-400 outline-none"
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
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs" aria-hidden>?</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-['Patrick_Hand'] text-gray-800 group-hover:text-green-600 transition-colors line-clamp-2 text-sm leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-xs text-gray-500 font-['Lato']">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-['Patrick_Hand'] text-lg text-gray-800 mb-3">Tagi</h3>
                {allTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag, index) => (
                      <button
                        key={tag || index}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedTag === tag
                            ? 'bg-green-600 text-white shadow-sm ring-2 ring-green-400 ring-offset-2'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-['Lato']">Brak tagów.</p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <FeedbackButton />
      <Footer />
    </div>
  );
};

export default BlogPage;