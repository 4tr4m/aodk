import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from '../Category/CategoryHeader';
import Footer from '../../Footer/Footer';
import SEO from '../../SEO/SEO';
import HistoriaHero from '../../Sections/HistoriaHero';
import HistoriaStory from '../../Sections/HistoriaStory';
import HistoriaWhatIs from '../../Sections/HistoriaWhatIs';
import HistoriaNutrition from '../../Sections/HistoriaNutrition';
import HistoriaLiterature from '../../Sections/HistoriaLiterature';
import { FaPodcast, FaSpotify, FaHeadphones } from 'react-icons/fa';

const HistoriaOAutyzmie = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Slow down video by 50% (0.5x speed)
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="O Autyzmie - Autyzm od Kuchni | Historia i doświadczenia"
        description="Poznaj historię Huberta i jego drogi z autyzmem. Dowiedz się, jak dieta i determinacja mogą wspierać rozwój dziecka ze spektrum."
        keywords="autyzm, spektrum autyzmu, dieta przy autyzmie, rozwój dziecka z autyzmem"
        canonical="https://www.autyzmodkuchni.pl/o-autyzmie"
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
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
          <HistoriaHero />

          {/* History Section */}
          <HistoriaStory />

          {/* What is Autism Section */}
          <HistoriaWhatIs />

          {/* Nutrition and Autism Section */}
          <HistoriaNutrition />

          {/* Key Aspects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-green-50 rounded-2xl shadow-lg p-8 mt-12"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Kluczowe Aspekty Naszej Drogi
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Dieta",
                  description: "Wprowadzenie diety eliminacyjnej przyniosło widoczną poprawę w funkcjonowaniu i samopoczuciu."
                },
                {
                  title: "Cierpliwość",
                  description: "Konsekwencja i determinacja w codziennych działaniach stopniowo przynoszą efekty."
                },
                {
                  title: "Wsparcie",
                  description: "Współpraca ze specjalistami i odpowiednie wsparcie w szkole pozwalają na lepszy rozwój."
                }
              ].map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
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

          {/* Our Diagnosis Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Jak to było u nas na początku diagnozy?
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Initial Steps */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md lg:col-span-1"
              >
                <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-6 text-center">Pierwsze kroki</h3>
                <div className="space-y-4">
                  {[
                    "Zawieszenie szczepień.",
                    "Badanie poziomu witaminy D i na krew utajoną w kale.",
                    "Wprowadzenie diety bez nabiału krowiego, glutenu i cukru (oraz produktów przetworzonych i sztucznych dodatków).",
                    "Kompleksowe testy na alergie i nietolerancje pokarmowe, w tym płatkowe z trzecim odczytem.",
                    "Dieta rotacyjna.",
                    "Wprowadzenie owoców tylko po posiłku, ksylitolu zamiast cukru białego.",
                    "Suplementacja probiotyków i prebiotyków i leki antyalergiczne."
                  ].map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-green-600 text-sm font-medium">{index + 1}</span>
                      </div>
                      <p className="text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Our Experience with Diet */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md lg:col-span-2"
              >
                <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-6">Nasze doświadczenie z dietą</h3>
                <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
                  <p>
                    Autyzm to złożone zaburzenie, które wymaga holistycznego podejścia, uwzględniającego zarówno aspekty medyczne, jak i codzienną troskę o zdrowie dziecka. W naszym przypadku odpowiednia dieta okazała się kluczowym elementem w poprawie jakości życia.
                  </p>
                  <p className="font-medium text-green-800">
                    Dieta eliminacyjna, zalecona przez naszego lekarza rodzinnego, przyniosła spektakularne efekty – zmniejszenie niektórych objawów, poprawę koncentracji i samopoczucia, a także ogólny wzrost energii i zaangażowania dziecka w codzienne aktywności.
                  </p>
                  <p>
                    Wsparcie zdrowia jelit, będące fundamentem tej diety, odgrywa kluczową rolę w funkcjonowaniu układu nerwowego. Eliminacja pokarmów, które mogą wywoływać stany zapalne lub zaburzenia trawienne, wspiera odbudowę mikroflory jelitowej, co z kolei ma ogromny wpływ na samopoczucie i funkcje poznawcze dziecka.
                  </p>
                  <p>
                    Dieta eliminacyjna pozwala również na dostarczanie niezbędnych składników odżywczych, wspierających rozwój mózgu i układu nerwowego, co może znacząco złagodzić trudności związane z autyzmem.
                  </p>
                  <p>
                    Choć zmiana nawyków żywieniowych może początkowo wydawać się wyzwaniem, osiągnięte efekty są tego warte. Dzięki odpowiednio dobranej diecie możemy zapewnić naszemu dziecku nie tylko lepsze zdrowie fizyczne, ale także większy komfort psychiczny.
                  </p>
                  <blockquote className="italic border-l-4 border-green-500 pl-4 py-2 my-4">
                    Warto spróbować, ponieważ poprawa jakości życia dziecka jest najważniejszym celem, a dieta eliminacyjna może stać się skutecznym narzędziem na drodze do lepszego samopoczucia.
                  </blockquote>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Recommended Literature Section */}
          <HistoriaLiterature />

          {/* Recommended Podcasts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Polecam podcasty
            </h2>
            
            <div className="space-y-12">
              {/* Joe Rogan Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaPodcast className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Joe Rogan Experience</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#1999 - Robert Kennedy, Jr.</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Joe Rogan rozmawia z Robertem F. Kennedy Jr. o różnych tematach, w tym o historii rodziny Kennedy, środowisku, zdrowiu publicznym, a szczególnie o kontrowersjach związanych ze szczepieniami.
                      </p>
                      <a 
                        href="https://open.spotify.com/episode/3DQfcTY4viyXsIXQ89NXvg" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                      >
                        <FaSpotify className="mr-1" /> Słuchaj na Spotify
                      </a>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#904 - Gary Taubes</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Joe Rogan rozmawia z Garym Taubesem o wpływie cukru na zdrowie, szczególnie o jego roli w otyłości, cukrzycy i innych chorobach metabolicznych.
                      </p>
                      <a 
                        href="https://open.spotify.com/episode/53pKJqVdwqjyouPtoK2ozV" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
                      >
                        <FaSpotify className="mr-1" /> Słuchaj na Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Other podcasts */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* The Diary Of A CEO */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaHeadphones className="text-green-600 text-xl" />
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] text-gray-800">The Diary Of A CEO</h3>
                    </div>
                    
                    <div className="space-y-3 flex-grow">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#298: Dr Rangan Chatterjee</h4>
                        <p className="text-gray-600 text-sm">
                          Holistyczne podejście do zdrowia, w tym dietę i wpływ na zdrowie ogólne.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#223: Dr Tim Spector</h4>
                        <p className="text-gray-600 text-sm">
                          Badania nad mikrobiomem jelitowym, genetyką i zdrowym odżywianiem.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Lex Fridman Podcast */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaPodcast className="text-green-600 text-xl" />
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Lex Fridman Podcast</h3>
                    </div>
                    
                    <div className="space-y-3 flex-grow">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#152 - Dr. Andrew Huberman</h4>
                        <p className="text-gray-600 text-sm">
                          Neurobiologia, zdrowie i wpływ diety na mózg.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#67 - Dr. Rhonda Patrick</h4>
                        <p className="text-gray-600 text-sm">
                          Żywienie, suplementacja i zdrowie mózgu.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center mt-20 bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-6">
              Odkryj Nasze Przepisy
            </h2>
            <p className="text-gray-600 font-['Lato'] mb-8 max-w-2xl mx-auto">
              Jeśli jesteś zainteresowany/a wypróbowaniem naszej diety, zapraszam do zapoznania się z przepisami, które pomogły nam w drodze z autyzmem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/przepisy" 
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Zobacz przepisy
              </a>
              <a 
                href="/blog" 
                className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
              >
                Przeczytaj blog
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoriaOAutyzmie; 