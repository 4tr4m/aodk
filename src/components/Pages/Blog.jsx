import React from 'react';
import { Link } from 'react-router-dom';
import CategoryHeader from './CategoryHeader';
import TopNavBar from '../Headers/TopNavBar';
import Footer from '../Footer/Footer';
import { blogPosts } from '../../Data/blog-data';
import SEO from '../SEO/SEO';

const BlogPage = () => {
  return (
    <div>
      <SEO 
        title="Blog - Autyzm od Kuchni | Wiedza o diecie eliminacyjnej w autyzmie"
        description="Artykuły, porady i przemyślenia dotyczące diety eliminacyjnej w autyzmie. Dowiedz się więcej o diecie bez glutenu, nabiału i cukru."
        keywords="blog o autyzmie, dieta w autyzmie, blog dieta eliminacyjna, porady, autyzm a dieta, dieta bezglutenowa, zaburzenia neurorozwojowe"
        canonical="https://autyzmkuchni.pl/blog"
      />
      {/* Mini hero section with TopNavBar */}
      <div className="relative">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      {/* Blog Title Section */}
      <div className="bg-[#F6EFE9] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-['Caveat'] text-5xl text-[#2D3748] mb-4 text-center">
            BLOG
          </h1>
          <p className="text-gray-600 font-['Lato'] text-lg leading-relaxed text-center">
            Artykuły, porady i przemyślenia na temat diety eliminacyjnej
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <main className="min-h-screen bg-[#F6EFE9] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={index} 
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
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
                      <span className="inline-block text-yellow-600 font-['Patrick_Hand'] hover:text-yellow-700">
                        Czytaj więcej →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BlogPage;