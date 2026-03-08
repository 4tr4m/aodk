import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaUtensils, FaBoxOpen } from 'react-icons/fa';

const cards = [
  {
    title: 'Porządek w kuchni',
    description: 'Audyt kuchni i szafek – sprawdzimy produkty w Twojej kuchni, wskażę bezpieczne zamienniki i plan pierwszych zmian. Detoks lodówki i szafek krok po kroku.',
    to: '/uslugi#metoda',
    icon: FaClipboardList,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    title: 'Wspólne gotowanie',
    description: '3 potrawy w Twojej kuchni – składniki przywożę. Wybierz wariant: Soczewicowa Moc, Jaglane Inspiracje lub Złota Spiżarnia. Proste, powtarzalne dania na co dzień.',
    to: '/uslugi#wspolne-gotowanie',
    icon: FaUtensils,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    title: 'Pakiety wsparcia',
    description: 'Szybki Start (600 zł), Kuchnia pod Kontrolą (1900 zł), Metamorfoza Premium (2300 zł). Wrocław i okolice – dojazd w cenie. Umów bezpłatną konsultację.',
    to: '/uslugi#pakiety',
    icon: FaBoxOpen,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' },
  }),
};

const ServicesSupportSection = () => {
  return (
    <section
      id="wsparcie"
      className="relative py-14 sm:py-16 md:py-24 overflow-hidden scroll-mt-20"
      aria-labelledby="wsparcie-tytul"
    >
      {/* Subtle highlight background so section stands out on homepage */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F6EFE9]/40 to-[#F6EFE9]/60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-200/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="wsparcie-tytul"
          className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1A202C] font-bold text-center mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Praktyczne wsparcie w diecie eliminacyjnej
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center text-lg max-w-2xl mx-auto font-['Lato'] mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Pomagam rodzicom dzieci z autyzmem uporządkować zakupy, produkty i gotowanie – spokojna kuchnia przy diecie bez glutenu, nabiału i cukru jest możliwa.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden"
              >
                {/* Soft corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${card.iconBg} opacity-30 rounded-bl-[2rem] transform translate-x-8 -translate-y-8`} />
                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${card.iconBg} ${card.iconColor} mb-5 transition-transform duration-300 group-hover:scale-110`}
                    aria-hidden
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#1A202C] font-bold mb-3 sm:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 font-['Lato'] leading-relaxed flex-grow mb-6">
                    {card.description}
                  </p>
                  <Link
                    to={card.to}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-['Patrick_Hand'] tracking-wider text-base transition-all duration-300 hover:shadow-lg w-fit"
                  >
                    Sprawdź
                    <span className="text-sm" aria-hidden>→</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSupportSection;
