import React from 'react';

const SupportTeaserBar = () => {
  const scrollToWsparcie = () => {
    document.getElementById('wsparcie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="relative z-10 bg-[#F6EFE9] border-b border-gray-100"
      aria-label="Zachęta do oferty wsparcia"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <button
          type="button"
          onClick={scrollToWsparcie}
          className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[#1A202C] hover:text-green-700 font-['Patrick_Hand'] text-base sm:text-lg tracking-wide transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 focus:ring-offset-2 focus:ring-offset-[#F6EFE9] rounded-lg py-1"
          aria-label="Przejdź do sekcji Wsparcie indywidualne"
        >
          <span>Potrzebujesz indywidualnego wsparcia?</span>
          <span className="text-green-600 font-semibold flex items-center gap-1">
            Zobacz ofertę
            <span aria-hidden>→</span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default SupportTeaserBar;
