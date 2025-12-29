import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InfoActionButton } from '../UI/Button';
import InfoModal from '../Modal/InfoModal';

const InfoSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const toggleInfoModal = () => {
    setShowInfoModal(!showInfoModal);
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <section className="relative bg-[#F6EFE9] py-10 sm:py-14 md:py-20 overflow-hidden will-change-transform">
        {/* Decorative elements */}
        {!prefersReducedMotion && (
          <>
            <motion.div 
              className="absolute left-0 top-1/4 w-20 h-20 md:w-32 md:h-32 bg-green-50/40 rounded-full blur-3xl -translate-x-1/2"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3] 
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute right-0 bottom-1/4 w-24 h-24 md:w-40 md:h-40 bg-green-50/40 rounded-full blur-3xl translate-x-1/2"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </>
        )}

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Header Section - Enhanced UX/UI */}
          <motion.div className="text-center mb-6 sm:mb-8 relative" variants={fadeInUp}>
            <div className="inline-flex flex-col items-center relative mb-2">
              <motion.div 
                className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-lg overflow-hidden cursor-pointer border-4 border-white/50 mb-4"
                whileHover={{ scale: 1.08, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={toggleInfoModal}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400/30 to-gray-600/40 backdrop-blur-[1px]"></div>
                <img 
                  src="/img/logo.png" 
                  alt="Logo Autyzm od Kuchni" 
                  className="w-full h-full object-contain p-1 sm:p-2 relative z-10 filter drop-shadow(0 2px 2px rgba(0,0,0,0.5)) contrast-[1.25] brightness-[1.15]"
                />
              </motion.div>
              <motion.h2 
                className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A202C] font-extrabold tracking-tight mt-2 sm:mt-0 drop-shadow-sm"
                whileHover={{ scale: 1.02, color: '#2C5282' }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Autyzm od Kuchni
              </motion.h2>
              <motion.p 
                className="text-gray-500 text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto font-['Lato'] leading-relaxed tracking-wide mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Zdrowe gotowanie wspierające rozwój
              </motion.p>
            </div>
          </motion.div>

          {/* Main Content - Text with Wrapped Images */}
          <motion.div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto" variants={fadeInUp}>
            {/* Introduction Text */}
            <motion.div className="prose prose-lg text-gray-600 font-['Lato'] space-y-6 text-center max-w-4xl mx-auto" variants={fadeInUp}>
              <motion.p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-0">
                Dieta w autyzmie odgrywa kluczową rolę w codziennym funkcjonowaniu. 
                <span className="text-green-700 font-bold text-xl sm:text-2xl"> Odpowiednio dobrane posiłki mogą znacząco 
                wpłynąć na samopoczucie i rozwój</span>. Nasze przepisy zostały stworzone z myślą o 
                specjalnych potrzebach żywieniowych, eliminując składniki, które często powodują problemy.
              </motion.p>

              <motion.p className="text-lg sm:text-xl leading-relaxed px-4 sm:px-0">
                Wszystkie nasze przepisy są <span className="text-green-700 font-bold text-xl sm:text-2xl">bezglutenowe, 
                bez nabiału krowiego i bez zbędnego cukru</span>. Stawiamy na naturalne składniki i proste 
                metody przygotowania, które nie wymagają smażenia.
              </motion.p>
            </motion.div>

            {/* Features Section - Images Wrapped Around Text */}
            <motion.div 
              className="space-y-12 sm:space-y-16 py-8 sm:py-12"
              variants={staggerContainer}
            >
              {/* Feature 1: Bez Glutenu - Image Left, Text Right */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ borderRadius: '20px' }}
                >
                  <div className="relative h-full w-full">
                    <motion.div 
                      className="bg-gradient-to-t from-black/90 via-black/70 to-black/50 absolute inset-0 z-10"
                      whileHover={{ opacity: 0.8 }}
                    />
                    <motion.img 
                      src="/img/noGluten.jpg" 
                      alt="Bez glutenu" 
                      className="w-full h-full object-cover" 
                      style={{ borderRadius: '20px' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-8">
                      <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Bez Glutenu</h3>
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Wszystkie nasze przepisy są <span className="text-green-700 font-bold">w pełni bezglutenowe</span>, co oznacza, że są bezpieczne dla osób z celiakią oraz nietolerancją glutenu. Wykluczamy wszystkie zboża zawierające gluten, takie jak pszenica, żyto, jęczmień i owies.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Zamiast tego wykorzystujemy naturalne, bezglutenowe alternatywy, które są równie smaczne i odżywcze. Nasze przepisy opierają się na mąkach z migdałów, kokosa, gryki czy prosa, które dostarczają wartościowych składników odżywczych.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2: Bez Nabiału - Text Left, Image Right */}
              <motion.div 
                className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8 md:gap-10"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ borderRadius: '20px' }}
                >
                  <div className="relative h-full w-full">
                    <motion.div 
                      className="bg-gradient-to-t from-black/90 via-black/70 to-black/50 absolute inset-0 z-10"
                      whileHover={{ opacity: 0.8 }}
                    />
                    <motion.img 
                      src="/img/noDairy.jpg" 
                      alt="Bez nabiału" 
                      className="w-full h-full object-cover" 
                      style={{ borderRadius: '20px' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-8">
                      <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Bez Nabiału</h3>
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Wykluczamy <span className="text-green-700 font-bold">nabiał krowi ze wszystkich przepisów</span>, ponieważ często powoduje problemy trawienne i może wpływać na funkcjonowanie osób z autyzmem. Kazeina zawarta w mleku krowim może być trudna do strawienia i powodować stany zapalne.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    W naszych przepisach znajdziesz alternatywy roślinne, takie jak mleko migdałowe, kokosowe czy owsiane. Czasami sięgamy po nabiał kozi, który zawiera kazeinę o innej strukturze i może być lepiej tolerowany przez niektóre osoby.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3: Bez Smażenia - Image Left, Text Right */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ borderRadius: '20px' }}
                >
                  <div className="relative h-full w-full">
                    <motion.div 
                      className="bg-gradient-to-t from-black/90 via-black/70 to-black/50 absolute inset-0 z-10"
                      whileHover={{ opacity: 0.8 }}
                    />
                    <motion.img 
                      src="/img/noFry.jpg" 
                      alt="Bez smażenia" 
                      className="w-full h-full object-cover" 
                      style={{ borderRadius: '20px' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-8">
                      <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Bez Smażenia</h3>
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    <span className="text-green-700 font-bold">Nigdy nie smażymy</span> naszych potraw. Smażenie w wysokich temperaturach może prowadzić do powstawania szkodliwych związków i utraty wartości odżywczych. Zamiast tego stosujemy zdrowe metody przygotowania.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Nasze przepisy opierają się na gotowaniu, pieczeniu, duszeniu i przygotowywaniu na parze. Te metody zachowują naturalne smaki i wartości odżywcze składników, jednocześnie zapewniając pyszne i zdrowe posiłki.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4: Bez Cukru - Text Left, Image Right */}
              <motion.div 
                className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8 md:gap-10"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] flex-shrink-0"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{ borderRadius: '20px' }}
                >
                  <div className="relative h-full w-full">
                    <motion.div 
                      className="bg-gradient-to-t from-black/90 via-black/70 to-black/50 absolute inset-0 z-10"
                      whileHover={{ opacity: 0.8 }}
                    />
                    <motion.img 
                      src="/img/noSugar.jpg" 
                      alt="Bez cukru" 
                      className="w-full h-full object-cover" 
                      style={{ borderRadius: '20px' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 z-20 flex items-end justify-center pb-6 sm:pb-8">
                      <h3 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}>Bez Cukru</h3>
                    </div>
                  </div>
                </motion.div>
                
                <div className="w-full md:w-1/2 space-y-4">
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Wszystkie nasze przepisy są <span className="text-green-700 font-bold">bez białego cukru</span>. Zamiast tego słodzimy naturalnie owocami, które dostarczają błonnika i wartościowych składników odżywczych.
                  </p>
                  <p className="text-lg sm:text-xl text-gray-700 font-['Lato'] leading-relaxed">
                    Gdy potrzebujemy dodatkowego słodzidła, sięgamy po ksylitol, który nie tylko słodzi, ale także <span className="text-green-700 font-bold">działa przeciwgrzybicznie w jelitach</span>, wspierając zdrowie układu pokarmowego. Czasami używamy również miodu, który jest naturalnym źródłem energii.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section - Enhanced UX/UI */}
            <motion.div 
              className="text-center bg-gradient-to-br from-green-100 via-green-50 to-yellow-50/80 rounded-2xl sm:rounded-3xl md:rounded-[30px] p-6 sm:p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              {/* Subtle background elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-200/50 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-yellow-100/50 rounded-full blur-3xl"></div>
              </div>
              
              <motion.h3 
                className="relative font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-green-800 mb-4 sm:mb-6 font-bold tracking-tight drop-shadow-sm"
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400 } }}
              >
                Odkryj Nasze Przepisy
              </motion.h3>
              <motion.p className="relative text-gray-700 mb-8 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                Znajdź inspirację wśród naszych sprawdzonych przepisów, które łączą w sobie smak i wartości 
                odżywcze, wspierając prawidłowy rozwój i dobre samopoczucie.
              </motion.p>
              <motion.div 
                className="relative flex justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <InfoActionButton 
                  text="ODKRYJ PRZEPISY" 
                  to="/kuchnia"
                  size="lg" 
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modal positioned outside the section to appear in the center of the page */}
      <InfoModal isOpen={showInfoModal} togglePopup={toggleInfoModal} />
    </>
  );
};

export default InfoSection;