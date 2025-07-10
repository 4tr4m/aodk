import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const HistoriaHero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] text-gray-900 mb-6">
          Historia naszego autyzmu
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato']">
          „Autyzm od Kuchni" to zbiór przepisów kulinarnych, które przez ponad 10 lat zbierałam, adaptowałam i które wykorzystuję do dziś, przygotowując posiłki dla mojego autystycznego syna.
        </p>
      </div>

      {/* Main Video Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl mx-auto max-w-4xl mb-12"
      >
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7) contrast(1.1)' }}
        >
          <source src="/img/video/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"></div>
        {/* Quote overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 text-white w-full">
            <div className="inline-flex items-center text-green-100 mb-3 bg-black/40 rounded-xl px-4 py-2 shadow-lg backdrop-blur-sm">
              <FaQuoteLeft className="mr-2" />
              <span className="text-lg">Nasza historia to dowód na to, że małe, ale świadome kroki mogą prowadzić do wielkich zmian.</span>
              <FaQuoteRight className="ml-2" />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HistoriaHero; 