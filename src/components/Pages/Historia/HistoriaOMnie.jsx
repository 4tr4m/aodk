import React from 'react';
import { motion } from 'framer-motion';
import CategoryHeader from '../Category/CategoryHeader';
import TopNavBar from '../../Headers/TopNavBar';
import Footer from '../../Footer/Footer';
import SEO from '../../SEO/SEO';
import { FaLeaf, FaHeart, FaAppleAlt } from 'react-icons/fa';

const HistoriaOMnie = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="O Mnie - Autyzm od Kuchni | Moja historia i pasja do zdrowego gotowania"
        description="Poznaj moją drogę do zdrowego żywienia i jak dieta eliminacyjna pomogła mojemu synowi z autyzmem. Odkryj zasady, które stosuję w mojej kuchni."
        keywords="autyzm, dieta eliminacyjna, zdrowe gotowanie, bezglutenowe, bez nabiału, bez cukru"
        canonical="https://www.autyzmodkuchni.pl/o-mnie"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://www.autyzmodkuchni.pl/" },
            { "@type": "ListItem", "position": 2, "name": "O Mnie", "item": "https://www.autyzmodkuchni.pl/o-mnie" }
          ]
        }}
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-10"
        >
          {/* Hero Section */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] text-gray-900 mb-6">
              O Mnie
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato']">
              Autyzm od Kuchni to kolekcja sprawdzonych przepisów, które od ponad 10 lat wspierają zdrowie i rozwój mojego syna z autyzmem.
            </p>
          </div>

          {/* Image and Text Section */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/img/history.jpeg"
                alt="Historia o mnie"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-['Playfair_Display'] mb-2">Pasjonatka zdrowego żywienia</h3>
                  <p className="font-['Lato'] text-white/90">Dzielę się wiedzą, która zmieniła życie mojej rodziny</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-['Playfair_Display'] text-gray-900">
                Kim jestem?
              </h2>
              <div className="prose prose-lg text-gray-600 font-['Lato'] leading-relaxed">
                <p>
                  Jestem pasjonatką zdrowego żywienia i samoukiem, która z pełnym zaangażowaniem zgłębia wpływ diety na zdrowie. Moja droga do tej fascynacji zaczęła się, gdy szukałam alternatywnych metod wsparcia dla mojego syna z autyzmem.
                </p>
                <p>
                  Dzięki odpowiedniej diecie zauważyliśmy ogromną poprawę, co stało się moją misją. Jako autodydaktyk w dietetyce, dziś z entuzjazmem dzielę się zdobytą wiedzą, wierząc, że świadome wybory żywieniowe mogą kluczowo wpłynąć na jakość życia i codzienne funkcjonowanie.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Jak to się zaczęło */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-6">
              Jak to się zaczęło?
            </h2>
            
            {/* First part: Text */}
            <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed mb-6">
              <p className="font-medium text-gray-800 italic mb-4">
                "Jestem pasjonatką zdrowego żywienia… ale nie zawsze tak było."
              </p>
              <p>
                Wraz z diagnozą naszego syna podjęliśmy alternatywną ścieżkę.
              </p>
              <p>
                Ścieżkę, która była alternatywą dla ekstensywnej suplementacji, przeszczepu komórek macierzystych, cerebrolizyny (wstrzykiwanie dziecku wyciągu z mózgu świń), tlenoterapii hiperbarycznej, stymulacji mózgu prądem stałym czy stymulacji mózgu polem magnetycznym, gdzie skuteczność tych metod nie została jeszcze jednoznacznie potwierdzona.
              </p>
            </div>

            {/* Image and text side by side */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="relative h-[350px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/img/history2.jpeg"
                  alt="Moja rodzina - wspólna droga do zdrowia"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="px-6 pb-[5px] text-white">
                    <p className="text-2xl font-['Playfair_Display']">Moja rodzina - wspólna droga do zdrowia</p>
                  </div>
                </div>
              </motion.div>

              <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
                <p className="font-medium text-green-700 mb-4">
                  Zdecydowaliśmy się walczyć o syna za pomocą diety.
                </p>
                <p>
                  Szczęście w nieszczęściu, nasza lekarka rodzinna dokładnie wiedziała, jakie kroki należy podjąć. Wstrzymała szczepienia, zleciła badanie poziomu witaminy D oraz test na krew utajoną w kale. Dodatkowo zaleciła dietę eliminacyjną.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Zasady w kuchni */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 text-center mb-4 md:mb-5">
              Zasady, które stosuję w mojej kuchni
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 md:mb-5">
              <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <FaLeaf className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-2">Bez glutenu</h3>
                <p className="text-gray-600 text-sm">W moich przepisach nie znajdziesz glutenu.</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <FaHeart className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-2">Bez nabiału krowiego</h3>
                <p className="text-gray-600 text-sm">Unikam nabiału krowiego, czasem sięgam po nabiał kozi, który może być lepiej tolerowany.</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <FaAppleAlt className="text-green-600 text-xl" />
                </div>
                <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-2">Bez cukru</h3>
                <p className="text-gray-600 text-sm">Stosuję naturalne słodzenie owocami, ksylitolem lub miodem zamiast cukru.</p>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md">
              {/* First part: Text and image side by side */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start mb-4 md:mb-5">
                {/* First three paragraphs - left */}
                <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
                  <p>
                    Zawsze stawiam na opcje najbardziej odżywcze. Uważam, że jeśli coś jest szkodliwe dla kobiet w ciąży i małych dzieci, to w jakimś stopniu może szkodzić wszystkim, dlatego staram się unikać takich produktów.
                  </p>
                  
                  <p>
                    Wyznaję zasadę, że wszystko jest dobre w umiarkowanych ilościach, a rzeczy, które szkodzą, staram się ograniczać. Zdaję sobie sprawę, że niektóre składniki mogą budzić kontrowersje (np. ksylitol, brązowy ryż, makaron kukurydziany), ale zawsze wybieram "mniejsze zło", kierując się troską o zdrowie.
                  </p>
                  
                  <p>
                    W mojej kuchni, w przepisach dla Huberta, nie znajdziesz glutenu (chociaż mogą występować śladowe ilości), nabiału krowiego (sporadycznie sięgam po nabiał kozi, który zawiera kazeinę, ale w mniejszych ilościach i o innej strukturze niż kazeina krowia, co może być lepiej tolerowane przez niektóre osoby), ani cukru (generalnie staram się słodzić owocami, a jeśli muszę, używam ksylitolu lub miodu; bardzo rzadko stosuję cukier brązowy i to w minimalnych ilościach).
                  </p>
                </div>

                {/* Image section - right - adjusted height to match text */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="relative h-[380px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="/img/2.jpeg"
                    alt="Zdrowa żywność - przepisy dla Huberta"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="px-6 pb-[5px] text-white">
                      <p className="text-2xl font-['Playfair_Display']">Zdrowa żywność przygotowana z miłością i troską</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Second part: Remaining text flows below, full width */}
              <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
                
                <p>
                  Nigdy nie smażę. Ograniczam mąkę kukurydzianą i ryżową, ponieważ kukurydza często pochodzi z modyfikowanej genetycznie kukurydzy, co budzi moje obawy dotyczące zdrowia (jednak odstępstwem jest makaron kukurydziany, który stosuję, jeśli nie jestem w stanie zakupić innego). Z kolei ryż może zawierać substancje toksyczne, takie jak arsen.
                </p>
                
                <p>
                  Na początku naszej drogi dieta była znacznie bardziej restrykcyjna, ze względu na alergie – Hubert, oprócz wyżej wymienionych produktów, nie spożywał ani ryżu, ani kukurydzy. Obecnie, ponieważ Hubert funkcjonuje rewelacyjnie, stosujemy pewne odstępstwa.
                </p>
                
                <p>
                  Opieram się na zasadach diety czystożerczej, chociaż w niektórych przypadkach pozwalam sobie na wyjątki. W moich przepisach znajdziesz jajka, które są cennym źródłem białka i witamin, i które dość ciężko zastąpić substytutem. Pozostali członkowie rodziny spożywają gluten, głównie w formie orkiszu albo pszenicy durum, a przepisy z glutenem można znaleźć na stronie "Zdrowe Jemy".
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="bg-green-50 p-6 md:p-8 rounded-xl text-center"
          >
            <h3 className="text-2xl font-['Playfair_Display'] text-gray-900 mb-4">
              Zapraszam do wspólnej drogi
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Jeśli szukasz przepisów, które mogą wspierać zdrowie i rozwój, zapraszam do wypróbowania moich sprawdzonych przepisów.
            </p>
            <a 
              href="/przepisy" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Zobacz przepisy
            </a>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoriaOMnie; 