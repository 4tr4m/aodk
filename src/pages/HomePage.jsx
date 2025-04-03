import React from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import CategoryBanner from '../components/Section/CategoryBanner';
import InfoSection from '../components/Section/InfoSection';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/Hero/HeroSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="relative h-screen overflow-hidden">
          <TopNavBar />
          <HeroSection />
        </div>
        <div className="relative z-10 bg-white">
          <CategoryBanner />
          <InfoSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;