import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/kuchnia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#F6EFE9] py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-24 h-24 md:w-32 md:h-32 bg-green-50/40 rounded-full 
        blur-3xl -translate-x-1/2" />
      <div className="absolute right-0 bottom-1/4 w-32 h-32 md:w-40 md:h-40 bg-green-50/40 rounded-full 
        blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/img/logo.jpg" 
              alt="Logo Autyzm od Kuchni" 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md"
            />
            <h2 className="font-['Caveat'] text-3xl md:text-4xl lg:text-5xl text-[#2D3748] font-bold">
              Autyzm od Kuchni
            </h2>
          </div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-['Lato']">
            Zdrowe gotowanie wspierające rozwój
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12 max-w-3xl mx-auto">
          <div className="prose prose-lg text-gray-600 font-['Lato']">
            <p className="mb-6">
              Dieta w autyzmie odgrywa kluczową rolę w codziennym funkcjonowaniu. 
              <span className="text-green-700 font-semibold"> Odpowiednio dobrane posiłki mogą znacząco 
              wpłynąć na samopoczucie i rozwój</span>. Nasze przepisy zostały stworzone z myślą o 
              specjalnych potrzebach żywieniowych, eliminując składniki, które często powodują problemy.
            </p>

            <p className="mb-6">
              Wszystkie nasze przepisy są <span className="text-green-700 font-semibold">bezglutenowe, 
              bez nabiału krowiego i bez zbędnego cukru</span>. Stawiamy na naturalne składniki i proste 
              metody przygotowania, które nie wymagają smażenia.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 py-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-3">Bez Glutenu</h3>
              <p className="text-gray-600">Wszystkie przepisy są bezpieczne dla osób z celiakią</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-3">Bez Nabiału</h3>
              <p className="text-gray-600">Wykluczamy nabiał krowi ze wszystkich przepisów</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-['Caveat'] text-2xl text-[#2D3748] mb-3">Bez Smażenia</h3>
              <p className="text-gray-600">Zdrowe metody przygotowania potraw</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-green-50 via-green-100/50 to-green-50 
            rounded-3xl p-8 md:p-12">
            <h3 className="font-['Caveat'] text-3xl text-[#2D3748] mb-6">
              Odkryj Nasze Przepisy
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Znajdź inspirację wśród naszych sprawdzonych przepisów, które łączą w sobie smak i wartości 
              odżywcze, wspierając prawidłowy rozwój i dobre samopoczucie.
            </p>
            <button 
              onClick={handleClick}
              className="bg-green-600 text-white px-8 py-3 rounded-full font-['Lato'] text-lg
                hover:bg-green-700 transform hover:scale-105 transition-all duration-300
                shadow-md hover:shadow-lg"
            >
              Zobacz Przepisy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;