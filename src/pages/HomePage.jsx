import React from 'react';
import TopNavBar from '../components/Headers/TopNavBar';
import CategoryBanner from '../components/Section/CategoryBanner';
import InfoSection from '../components/Section/InfoSection';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/Hero/HeroSection';
import SEO from '../components/SEO/SEO';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Autyzm od Kuchni - Dieta eliminacyjna bez glutenu, nabiału i cukru"
        description="Odkryj jak dieta eliminacyjna bez glutenu, nabiału i cukru może wspierać funkcjonowanie osób z autyzmem i zaburzeniami neurorozwojowymi."
        keywords="autyzm, dieta eliminacyjna, dieta w autyzmie, bez glutenu, bez nabiału, bez cukru, przepisy, zaburzenia neurorozwojowe, GAPS, zdrowe odżywianie"
        canonical="https://www.autyzmodkuchni.pl/"
      />
      <div className="flex-grow">
        <div className="relative h-screen overflow-hidden">
          <TopNavBar />
          <div className="h-full flex flex-col">
            <div className="flex-grow flex items-center justify-center pb-16 sm:pb-0">
              <HeroSection />
            </div>
          </div>
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