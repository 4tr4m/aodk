import React from 'react';
import { motion } from 'framer-motion';
import CategoryHeader from './CategoryHeader';
import TopNavBar from '../Headers/TopNavBar';
import Footer from '../Footer/Footer';

const HistoriaOMnie = () => {
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
              O Mnie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato']">
              Poznaj moją historię i pasję do gotowania, która doprowadziła mnie do stworzenia tego miejsca.
            </p>
          </div>

          {/* Image and Text Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/img/history.jpg"
                alt="Historia o mnie"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-['Playfair_Display'] text-gray-900">
                Moja Droga do Zdrowego Gotowania
              </h2>
              <div className="prose prose-lg text-gray-600 font-['Lato']">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-['Playfair_Display'] text-gray-900 mb-4">
                Moja Filozofia Kulinarna
              </h3>
              <p className="text-gray-600 font-['Lato']">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-['Playfair_Display'] text-gray-900 mb-4">
                Dlaczego Zdrowe Gotowanie?
              </h3>
              <p className="text-gray-600 font-['Lato']">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 text-center mb-12">
              Moja Historia
            </h2>
            <div className="space-y-8">
              {/* Timeline items */}
              {[2020, 2021, 2022, 2023].map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                  className="flex items-center gap-8"
                >
                  <div className="w-24 text-xl font-bold text-green-600">{year}</div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoriaOMnie; 