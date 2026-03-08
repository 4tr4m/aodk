import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from '../Category/CategoryHeader';
import Footer from '../../Footer/Footer';
import SEO from '../../SEO/SEO';

const services = [
  {
    id: 'audyt-kuchni',
    title: 'Przegląd lodówki',
    description: 'Wspólnie przejrzymy zawartość Twojej lodówki i szafek. Wskażę zdrowe zamienniki w duchu diety 3xBez, pomogę uporządkować zakupy i zaplanować posiłki tak, aby nic się nie marnowało, a cała rodzina jadła bezpiecznie i smacznie.',
  },
  {
    id: 'wspolne-gotowanie',
    title: 'Wspólne gotowanie na bazie moich przepisów',
    description: 'Gotujemy razem – u Ciebie lub online. Wybierzemy przepisy z bloga dopasowane do Twoich potrzeb, a ja krok po kroku pokażę, jak je zrobić. Idealne, gdy chcesz nauczyć się konkretnych dań 3xBez, które pokocha Twoje dziecko.',
  },
  {
    id: 'asysta-zakupowa',
    title: 'Asysta zakupowa',
    description: 'Wspólna wizyta w sklepie (stacjonarnie lub w formie listy/rozmowy). Nauczysz się, na co zwracać uwagę na etykietach, które produkty wybierać przy diecie eliminacyjnej i jak planować zakupy pod kątem gotowania 3xBez.',
  },
];

const packages = [
  {
    name: 'Szybki Start',
    price: 'do ustalenia',
    features: [
      'Jednorazowy przegląd lodówki i szafek',
      'Lista zamienników i rekomendacje produktów',
      'Krótki plan działania na pierwsze tygodnie',
    ],
  },
  {
    name: 'Kuchnia Pod Kontrolą',
    price: 'do ustalenia',
    features: [
      'Audyt kuchni + wspólne gotowanie (1–2 spotkania)',
      'Dopasowanie przepisów do Twojej sytuacji',
      'Wsparcie mailowe przez 2 tygodnie',
    ],
  },
  {
    name: 'Metamorfoza Premium',
    price: 'do ustalenia',
    features: [
      'Pełny pakiet: audyt, zakupy, gotowanie',
      'Kilka spotkań w zależności od potrzeb',
      'Dłuższe wsparcie i stały kontakt',
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const UslugiPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Usługi - Wsparcie w diecie 3xBez | Autyzm od Kuchni"
        description="Indywidualne wsparcie w diecie eliminacyjnej: przegląd lodówki, wspólne gotowanie, pakiety dopasowane do Twoich potrzeb. Zapisz się na bezpłatną 15-minutową konsultację."
        keywords="dieta 3xBez, usługi dietetyczne, przegląd lodówki, wspólne gotowanie, dieta eliminacyjna, autyzm"
        canonical="https://www.autyzmodkuchni.pl/uslugi"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://www.autyzmodkuchni.pl/' },
            { '@type': 'ListItem', position: 2, name: 'Usługi', item: 'https://www.autyzmodkuchni.pl/uslugi' },
          ],
        }}
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero */}
        <motion.section
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl text-[#1A202C] font-bold mb-6">
            Wsparcie w diecie 3xBez – krok po kroku
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato'] leading-relaxed">
            Jeśli wprowadzasz dietę eliminacyjną u siebie lub u dziecka, wiesz, że na początku może być trudno. 
            Oferuję indywidualne wsparcie: od przeglądu lodówki i zamienników, przez wspólne gotowanie po moich przepisach, 
            po kompleksowe pakiety. Wszystko w duchu 3xBez – bez glutenu, bez nabiału krowiego, bez zbędnego cukru.
          </p>
        </motion.section>

        {/* Opis usług */}
        <motion.section
          className="space-y-10 md:space-y-14 mb-16"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A202C] font-bold text-center mb-10">
            Co mogę dla Ciebie zrobić
          </h2>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              variants={fadeInUp}
              custom={index}
              className="scroll-mt-24 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100"
            >
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 font-['Lato'] leading-relaxed text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Pakiety i cennik */}
        <motion.section
          id="pakiety"
          className="scroll-mt-24 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1A202C] font-bold text-center mb-8 md:mb-10">
            Pakiety i cennik
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col"
              >
                <h3 className="font-['Playfair_Display'] text-2xl text-[#1A202C] font-bold mb-2">
                  {pkg.name}
                </h3>
                <p className="text-green-700 font-['Lato'] font-semibold text-xl mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 flex-grow font-['Lato'] text-gray-600">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1 shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 font-['Lato'] mt-6">
            Ceny ustalane indywidualnie w zależności od zakresu i formy współpracy.
          </p>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="bg-[#F6EFE9] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A202C] font-bold mb-4">
            Zapisz się na bezpłatną 15-minutową konsultację wstępną
          </h2>
          <p className="text-gray-600 font-['Lato'] max-w-xl mx-auto mb-8">
            Opowiedz mi o swojej sytuacji, a wspólnie ustalimy, jaki rodzaj wsparcia będzie dla Ciebie najlepszy.
          </p>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-['Patrick_Hand'] tracking-wider text-lg transition-all duration-300 hover:shadow-lg"
          >
            Umów konsultację
          </Link>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default UslugiPage;
