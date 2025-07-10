import React from 'react';

const ProductNewsletter = ({
  newsletterName,
  setNewsletterName,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSubmitting,
  newsletterSubmitted,
  handleNewsletterSubmit
}) => (
  <div className="mt-8 pt-6 border-t border-gray-200">
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-green-200 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
      <div className="relative">
        <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-green-800 font-bold mb-3">
          Dołącz do naszej społeczności!
        </h3>
        <p className="text-sm sm:text-base text-green-700 mb-4 leading-relaxed">
          Odkryj więcej przepisów dostosowanych do potrzeb dzieci z autyzmem. 
          Otrzymuj powiadomienia o nowych przepisach i ekskluzywne porady prosto na swoją skrzynkę.
        </p>
        {newsletterSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-4">
            <svg className="w-10 h-10 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div className="text-green-700 font-medium">Dziękujemy za zapis do newslettera!</div>
          </div>
        ) : (
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-3" onSubmit={handleNewsletterSubmit}>
            <input
              type="text"
              placeholder="Twoje imię"
              value={newsletterName}
              onChange={e => setNewsletterName(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-sm sm:text-base placeholder-green-400/70"
            />
            <input
              type="email"
              placeholder="Twój adres email"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2.5 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 text-sm sm:text-base placeholder-green-400/70"
            />
            <button
              type="submit"
              disabled={newsletterSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg 
                transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>{newsletterSubmitting ? "Zapisywanie..." : "Zapisz się"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-green-600/80 italic">
          Dołączając do newslettera, zgadzasz się na otrzymywanie od nas wiadomości email. 
          Możesz zrezygnować w każdej chwili.
        </p>
      </div>
    </div>
  </div>
);

export default ProductNewsletter; 