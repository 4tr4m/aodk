import React from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';

const HistoriaOAutyzmie = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative mb-8">
        <CategoryHeader />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] text-gray-900 mb-6">
              O Autyźmie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato']">
              Zrozumienie autyzmu i jego wpływu na codzienne życie.
            </p>
          </div>

          {/* Main Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl mx-auto max-w-4xl"
          >
            {/* Placeholder for main image */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Główna Ilustracja
              </div>
            </div>
          </motion.div>

          {/* Information Grid */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-['Playfair_Display'] text-gray-900 mb-4">
                Czym Jest Autyzm?
              </h2>
              <div className="prose prose-lg text-gray-600 font-['Lato']">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-['Playfair_Display'] text-gray-900 mb-4">
                Jak Się Objawia?
              </h2>
              <div className="prose prose-lg text-gray-600 font-['Lato']">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key Points Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 mt-12"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Kluczowe Aspekty
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Komunikacja",
                  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                },
                {
                  title: "Interakcje Społeczne",
                  description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                },
                {
                  title: "Zachowania",
                  description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco."
                }
              ].map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 font-['Lato']">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8">
              Przydatne Materiały
            </h2>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
              <p className="text-gray-600 font-['Lato'] mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Dowiedz się więcej
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoriaOAutyzmie; 