import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import { blogPosts } from '../../../Data/blog-data';
import SEO from '../../SEO/SEO';
import { motion } from 'framer-motion';
import FeedbackButton from '../../Feedback/FeedbackButton';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Get unique tags from all blog posts
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags || []))];

  // Filter posts based on search and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Get latest posts (most recent 3)
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleTagClick = useCallback((tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-gray-100">
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
        className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#2D3748] mb-4 font-bold tracking-wide">
          Blog
        </h1>
        <p className="font-['Lato'] text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
          Artykuły, porady i przemyślenia na temat diety eliminacyjnej
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            {/* Search Bar */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-4">Wyszukaj</h3>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Szukaj artykułów..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
              />
            </div>

            {/* Latest Posts */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-4">Najnowsze artykuły</h3>
              <div className="space-y-4">
                {latestPosts.map((post, index) => (
                  <Link 
                    key={index} 
                    to={`/blog/${post.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-['Patrick_Hand'] text-gray-800 group-hover:text-green-600 transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-['Patrick_Hand'] text-xl text-gray-800 mb-4">Tagi</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTag === tag 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-500">{post.date}</span>
                        <span className="text-sm text-gray-500">{post.category}</span>
                      </div>
                      <h2 className="font-['Patrick_Hand'] text-xl mb-3 text-gray-800 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{post.author}</span>
                        <span className="inline-block text-green-600 font-['Patrick_Hand'] hover:text-green-700">
                          Czytaj więcej →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FeedbackButton />
      <Footer />
    </div>
  );
};

export default BlogPage;