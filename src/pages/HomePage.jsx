import React from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import HealthyLifestyleBanner from '../components/Section/HealthyLifestyleBanner';
import Benefits from '../components/Section/Benefits';
import InfoSection from '../components/Section/InfoSection';
import PreFooter from '../components/Footer/PreFooter';
import Footer from '../components/Footer/Footer';
import HeroHeader from '../components/Hero/HeroHeader';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="relative h-screen overflow-hidden">
        <TopNavBar />
        <HeroHeader />
      </div>
      <div className="relative z-10 bg-white">
        <HealthyLifestyleBanner />
        <Benefits />
        <InfoSection />
        <PreFooter />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;