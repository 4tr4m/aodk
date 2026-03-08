import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Przegląd Lodówki',
    description: 'Zróbmy porządek w Twojej kuchni i znajdźmy zdrowe zamienniki.',
    to: '/uslugi#audyt-kuchni',
  },
  {
    title: 'Wspólne Gotowanie',
    description: 'Naucz się gotować posiłki 3xBez, które pokocha Twoje dziecko.',
    to: '/uslugi#wspolne-gotowanie',
  },
  {
    title: 'Kompleksowe Pakiety',
    description: 'Audyt, zakupy i gotowanie w jednym pakiecie dostosowanym do Twoich potrzeb.',
    to: '/uslugi#pakiety',
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
    <section className="relative bg-white py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1A202C] font-bold text-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Potrzebujesz indywidualnego wsparcia?
        </motion.h2>
        <motion.p
          className="text-gray-600 text-center text-lg max-w-2xl mx-auto font-['Lato'] mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Oferuję wsparcie dopasowane do Twojej sytuacji i diety 3xBez.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="bg-[#F6EFE9] rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100"
            >
              <h3 className="font-['Playfair_Display'] text-xl sm:text-2xl text-[#1A202C] font-bold mb-3 sm:mb-4">
                {card.title}
              </h3>
              <p className="text-gray-600 font-['Lato'] leading-relaxed flex-grow mb-6">
                {card.description}
              </p>
              <Link
                to={card.to}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-['Patrick_Hand'] tracking-wider text-base transition-all duration-300 hover:shadow-lg w-fit"
              >
                Sprawdź
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSupportSection;
