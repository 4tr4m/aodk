import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLeaf,
  FaUtensils,
  FaShoppingCart,
  FaCheck,
  FaChevronDown,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaHeart,
  FaClock,
  FaHandHoldingHeart,
  FaSeedling,
  FaCookieBite,
  FaFlask,
} from 'react-icons/fa';
import TopNavBar from '../../Headers/TopNavBar';
import CategoryHeader from '../Category/CategoryHeader';
import Footer from '../../Footer/Footer';
import SEO from '../../SEO/SEO';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45 },
  }),
};

const CtaButton = () => (
  <Link
    to="/kontakt"
    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-['Patrick_Hand'] tracking-wider text-lg transition-all duration-300 hover:shadow-lg"
  >
    Umów bezpłatną konsultację
  </Link>
);

const FAQ_ITEMS = [
  {
    q: 'Czy muszę wcześniej przygotować składniki?',
    a: 'Nie. Na wspólne gotowanie przywożę wszystkie potrzebne produkty – od fasoli po mieszanki mąk bezglutenowych. Dzięki temu nie musisz martwić się zakupami ani szukaniem trudno dostępnych produktów.',
  },
  {
    q: 'Czy te potrawy są trudne?',
    a: 'Nie. Wszystkie dania, które przygotowujemy razem, są proste i powtarzalne. Moim celem jest, abyś po spotkaniu mogła je łatwo przygotowywać w domu, bez stresu i skomplikowanych przepisów.',
  },
  {
    q: 'Czy możemy przygotować inne potrawy?',
    a: 'Tak. Jeśli masz konkretny pomysł na danie, napisz do mnie. Jeśli logistycznie będzie to możliwe, możemy przygotować indywidualny wariant spotkania dostosowany do Twoich potrzeb.',
  },
  {
    q: 'Czy dieta eliminacyjna jest odpowiednia dla mojego dziecka?',
    a: 'Każde dziecko jest inne, ale moja metoda jest sprawdzona i bezpieczna. Na konsultacji indywidualnie omówimy potrzeby Twojej rodziny i dobierzemy produkty oraz przepisy dopasowane do dziecka.',
  },
  {
    q: 'Czy muszę mieć doświadczenie w gotowaniu?',
    a: 'Nie, wszystko pokazuję krok po kroku. Pokazuję proste techniki i metody, które pozwalają przygotowywać dania w sposób powtarzalny i przewidywalny, nawet jeśli nigdy wcześniej nie gotowałaś.',
  },
  {
    q: 'Czy spotkanie obejmuje przepisy i plan posiłków na kilka dni?',
    a: 'Spotkanie pozwala Ci poznać metodę planowania posiłków i nauczyć się powtarzalnego gotowania. Podczas wspólnego gotowania omawiamy, jak tworzyć menu w codziennym życiu, korzystając z dostępnych przepisów na mojej stronie autyzmodkuchni.pl.',
  },
  {
    q: 'Czy mogę zaprosić dziecko na wspólne gotowanie?',
    a: 'Oczywiście! Wspólne gotowanie z dzieckiem może być świetną okazją do nauki zdrowych nawyków, integracji i oswojenia się z nowymi produktami.',
  },
  {
    q: 'Czy mogę zamówić pakiet online lub w innym mieście?',
    a: 'Tak. Dojeżdżam do innych miejsc w Polsce, po ustaleniu kosztów transportu i czasu podróży.',
  },
  {
    q: 'Czy w cenę pakietu wliczone są produkty?',
    a: 'Tak. Przy wspólnym gotowaniu przywożę wszystkie potrzebne produkty – w tym trudno dostępne lub namoczone wcześniej składniki, np. fasolę do Złotej Spiżarni.',
  },
  {
    q: 'Co jeśli moje dziecko ma alergie lub nietolerancje?',
    a: 'Bardzo ważne jest, abyś poinformował(a) mnie o wszystkich alergiach i nietolerancjach przed spotkaniem. Dzięki temu mogę przygotować bezpieczne składniki i dopasować przepisy.',
  },
  {
    q: 'Czy mogę później powtórzyć przepisy samodzielnie?',
    a: 'Tak, podczas spotkania przygotowujemy kilka przykładowych dań. Wszystkie pozostałe przepisy i pełne menu znajdziesz na moim blogu autyzmodkuchni.pl.',
  },
  {
    q: 'Co jeśli nie uda mi się od razu wprowadzić wszystkich zmian w kuchni?',
    a: 'To zupełnie normalne! Pakiety przewidują wsparcie online (2 tygodnie lub miesiąc), dzięki czemu możesz wdrażać dietę krok po kroku, w swoim tempie.',
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-['Patrick_Hand'] text-lg text-[#1A202C] hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <span>{item.q}</span>
            <FaChevronDown
              className={`shrink-0 text-green-600 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-5 pb-4"
            >
              <p className="font-['Lato'] text-gray-600 leading-relaxed pl-0">
                {item.a}
              </p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

const UslugiPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const scroll = () => el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Oferta – Praktyczne wdrożenie diety eliminacyjnej | Autyzm od Kuchni"
        description="Pomagam rodzicom dzieci z autyzmem uporządkować zakupy, produkty i gotowanie. Dieta eliminacyjna bez glutenu, nabiału i cukru – spokojnie i krok po kroku we Wrocławiu i okolicach."
        keywords="dieta eliminacyjna autyzm, dieta bez glutenu dla dziecka, dieta GFCF autyzm, jak wprowadzić dietę eliminacyjną, wsparcie dieta autyzm Wrocław"
        canonical="https://www.autyzmodkuchni.pl/uslugi"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://www.autyzmodkuchni.pl/' },
            { '@type': 'ListItem', position: 2, name: 'Oferta', item: 'https://www.autyzmodkuchni.pl/uslugi' },
          ],
        }}
      />
      <div className="relative mb-8">
        <CategoryHeader showLogo={false} />
        <div className="absolute top-0 left-0 w-full">
          <TopNavBar />
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 1. HERO */}
        <motion.section
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl text-[#1A202C] font-bold mb-5 leading-tight">
            Spokojna kuchnia przy diecie eliminacyjnej jest możliwa.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-['Lato'] leading-relaxed mb-4">
            Pomagam rodzicom dzieci z autyzmem uporządkować zakupy, produkty i codzienne gotowanie, aby dieta bez glutenu, nabiału i cukru przestała być źródłem stresu.
          </p>
          <p className="font-['Patrick_Hand'] text-[#1A202C] text-lg sm:text-xl mb-8">
            Praktyczne wdrożenie diety w Twojej kuchni – krok po kroku.
          </p>
          <CtaButton />
          <p className="mt-6 text-gray-500 font-['Lato'] text-sm">
            10 lat doświadczenia w prowadzeniu kuchni eliminacyjnej • setki przetestowanych przepisów • praktyczne wsparcie w Twoim domu
          </p>
        </motion.section>

        {/* 2. Wprowadzenie */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-6">
            Wprowadzenie diety eliminacyjnej nie musi oznaczać chaosu w kuchni
          </h2>
          <div className="space-y-4 font-['Lato'] text-gray-600 leading-relaxed">
            <motion.p variants={fadeInUp}>
              Pomagam rodzicom dzieci z autyzmem uporządkować zakupy, produkty i gotowanie tak, aby dieta eliminacyjna stała się spokojną częścią codziennego życia rodziny.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Nie uczę skomplikowanych przepisów. Pokazuję, jak prowadzić kuchnię eliminacyjną w realnym życiu.
            </motion.p>
          </div>
          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </motion.section>

        {/* 2b. Historia – Dlaczego powstał Autyzm od Kuchni */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-6">
            Dlaczego powstał Autyzm od Kuchni
          </h2>
          <div className="space-y-4 font-['Lato'] text-gray-600 leading-relaxed">
            <motion.p variants={fadeInUp}>
              Kilka lat temu sama znalazłam się w miejscu, w którym dziś jest wielu rodziców. Diagnoza autyzmu u mojego syna sprawiła, że zaczęłam szukać sposobów, które mogą pomóc mu funkcjonować lepiej. Jednym z najważniejszych kroków okazała się dieta.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Z czasem w naszym domu powstała kuchnia bez glutenu, bez nabiału krowiego, bez cukru i bez smażenia. Na początku było to trudne – zakupy zajmowały dużo czasu, przepisy z internetu często nie wychodziły, a gotowanie bywało stresujące. Dlatego zaczęłam upraszczać wszystko krok po kroku.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Testowałam produkty, przepisy i rozwiązania, które można naprawdę zastosować w codziennym życiu. Dziś mój syn funkcjonuje bardzo dobrze, a dieta stała się naturalną częścią naszej codzienności. Właśnie z tego doświadczenia powstał blog Autyzm od Kuchni oraz moja metoda pracy z rodzinami.
            </motion.p>
          </div>
        </motion.section>

        {/* 3. Odzyskaj spokój + wyzwania */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-2">
            Odzyskaj spokój w kuchni
          </h2>
          <p className="font-['Lato'] text-gray-600 text-lg mb-8">
            Praktyczne wdrożenie diety eliminacyjnej – Autyzm od Kuchni
          </p>
          <p className="font-['Lato'] text-gray-600 mb-6">
            Wprowadzenie diety eliminacyjnej u dziecka to często nie tylko zmiana jadłospisu. To również:
          </p>
          <ul className="space-y-3 mb-8">
            {['chaos w kuchni', 'godziny czytania składów produktów', 'niepewność podczas zakupów', 'zmęczenie ciągłym planowaniem posiłków'].map((item, i) => (
              <motion.li
                key={item}
                variants={fadeInUp}
                custom={i}
                className="flex items-center gap-3 font-['Lato'] text-gray-700"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 shrink-0">
                  <FaLeaf className="w-4 h-4" />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
          <motion.div variants={fadeInUp} className="bg-[#F6EFE9] rounded-2xl p-6 sm:p-8 border border-gray-100">
            <p className="font-['Lato'] text-gray-700 leading-relaxed mb-4">
              Wiem, jak to wygląda, bo przeszłam przez to sama. Jestem mamą syna z diagnozą autyzmu. Od ponad 10 lat prowadzę kuchnię bez glutenu, bez nabiału krowiego, bez cukru i bez smażenia.
            </p>
            <p className="font-['Lato'] text-gray-700 leading-relaxed">
              Dzięki temu dieta stała się w naszym domu naturalną częścią życia, a mój syn funkcjonuje dziś bardzo dobrze. Na moim blogu znajdziesz wszystkie przepisy za darmo. Tutaj oferuję coś więcej – moje doświadczenie, obecność i praktyczne przeprowadzenie Cię przez ten proces w Twojej własnej kuchni.
            </p>
          </motion.div>
        </motion.section>

        {/* 4. Dlaczego rodzice rezygnują */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-6">
            Dlaczego rodzice często rezygnują z diety?
          </h2>
          <p className="font-['Lato'] text-gray-600 mb-6">
            Nie dlatego, że nie chcą pomóc swojemu dziecku. Najczęściej dlatego, że:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              'w sklepach trudno znaleźć produkty o dobrym składzie',
              'przepisy z internetu są skomplikowane i czasochłonne',
              'w domu brakuje pomysłów na codzienne posiłki',
              'ciągłe sprawdzanie składów jest wyczerpujące',
            ].map((item, i) => (
              <motion.li key={item} variants={fadeInUp} custom={i} className="flex items-start gap-3 font-['Lato'] text-gray-700">
                <FaShoppingCart className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                {item}
              </motion.li>
            ))}
          </ul>
          <motion.p variants={fadeInUp} className="font-['Lato'] text-gray-700">
            Po kilku tygodniach pojawia się zmęczenie. Dlatego stworzyłam sposób pracy, który pomaga uprościć kuchnię i odzyskać spokój.
          </motion.p>
        </motion.section>

        {/* 5. Metoda – 3 kroki */}
        <motion.section
          id="metoda"
          className="scroll-mt-24 mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-4">
            Moja metoda pracy z dietą
          </h2>
          <p className="font-['Patrick_Hand'] text-xl text-green-700 mb-2">
            Metoda „Autyzm od Kuchni”
          </p>
          <p className="font-['Lato'] text-gray-600 mb-8">
            Przez ponad 10 lat prowadzenia kuchni eliminacyjnej wypracowałam własny sposób pracy. Opiera się na trzech prostych krokach:
          </p>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Porządek w kuchni',
                desc: 'Najpierw upraszczamy przestrzeń i składniki. Sprawdzamy produkty w Twojej kuchni, usuwamy problematyczne składniki i wprowadzamy bezpieczne zamienniki.',
                icon: FaBoxOpen,
                bg: 'bg-green-100',
                color: 'text-green-700',
              },
              {
                step: 2,
                title: 'Sprawdzona baza potraw',
                desc: 'Zamiast dziesiątek przepisów skupiamy się na kilku daniach, które można łatwo powtarzać w codziennym życiu. Dzięki temu gotowanie przestaje być stresujące.',
                icon: FaUtensils,
                bg: 'bg-amber-100',
                color: 'text-amber-700',
              },
              {
                step: 3,
                title: 'Spokojne zakupy',
                desc: 'Uczysz się, jak robić szybkie i bezpieczne zakupy bez analizowania każdego produktu. Po kilku takich zakupach większość rodziców mówi: „W końcu wiem, co kupować.”',
                icon: FaShoppingCart,
                bg: 'bg-emerald-100',
                color: 'text-emerald-700',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeInUp}
                custom={i}
                className="flex gap-4 sm:gap-6 p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.bg} ${item.color} shrink-0`}>
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C] mb-1">
                    {item.step}. {item.title}
                  </h3>
                  <p className="font-['Lato'] text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 font-['Lato'] text-gray-600 italic">
            Wiele osób korzysta z usług stylistki modowej, aby nauczyć się kupować ubrania. Ja pomagam rodzinom nauczyć się czegoś jeszcze ważniejszego – jak spokojnie prowadzić codzienną kuchnię przy diecie eliminacyjnej.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
        </motion.section>

        {/* 6. Jak wygląda spotkanie – Detoks, Praktyczne wdrożenie, Shopping Safari */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-8">
            Jak wygląda nasze spotkanie?
          </h2>
          <p className="font-['Lato'] text-gray-600 mb-8">
            Podczas spotkania pracujemy w Twojej kuchni i w Twoim tempie. Pokazuję rozwiązania, które naprawdę działają w codziennym życiu – przetestowane przez ponad 10 lat.
          </p>
          <div className="space-y-8">
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                  <FaBoxOpen className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C]">Detoks szafek i lodówki</h3>
              </div>
              <p className="font-['Lato'] text-gray-600 mb-4">
                Wspólnie przeanalizujemy produkty, które masz w domu. Dowiesz się: które produkty warto zostawić, które lepiej wyeliminować, jakie zamienniki są bezpieczne. Twoja kuchnia stanie się prostsza i bardziej przewidywalna.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <FaUtensils className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C]">Praktyczne wdrożenie diety w Twojej kuchni</h3>
              </div>
              <p className="font-['Lato'] text-gray-600 mb-4">
                Podczas spotkania przygotujemy razem 3 proste potrawy, które możesz później łatwo powtarzać w domu. Na spotkanie przywożę wszystkie składniki – są to produkty o sprawdzonym składzie, których sama używam na co dzień. Dzięki temu nie musisz wcześniej robić zakupów, masz pewność co do składu produktów i uczysz się gotować w prosty i powtarzalny sposób.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FaShoppingCart className="w-6 h-6" />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C]">Shopping Safari – zakupy w sklepie</h3>
              </div>
              <p className="font-['Lato'] text-gray-600">
                Jeśli wybierzesz rozszerzony pakiet, pojedziemy razem do Twojego sklepu (np. Lidl lub Biedronka). Pokażę Ci: które półki najlepiej omijać, które produkty mają dobry skład, jak robić szybkie, „automatyczne” zakupy.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* 7. Wspólne gotowanie – 3 warianty */}
        <motion.section
          id="wspolne-gotowanie"
          className="scroll-mt-24 mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-4">
            Wspólne gotowanie – wybierz wariant
          </h2>
          <p className="font-['Lato'] text-gray-600 mb-8">
            Podczas spotkania przygotujemy 3 potrawy, które możesz później łatwo powtarzać w domu.
          </p>
          <div className="space-y-6">
            {[
              {
                title: 'Soczewicowa Moc',
                subtitle: 'Białko roślinne i sycące posiłki',
                items: ['regenerujący bulion (warzywny lub mięsny)', 'pasta z soczewicy do chleba', 'kakaowe babeczki z soczewicy z moją mieszanką mąk bezglutenowych'],
                icon: FaSeedling,
                bg: 'bg-green-100',
                color: 'text-green-700',
              },
              {
                title: 'Jaglane Inspiracje',
                subtitle: 'Lekkość i codzienna kuchnia',
                items: ['regenerujący bulion (warzywny lub mięsny)', 'kremowa jaglanka lub jaglane congee', 'biszkopt lub babeczki biszkoptowe'],
                icon: FaLeaf,
                bg: 'bg-amber-100',
                color: 'text-amber-700',
              },
              {
                title: 'Złota Spiżarnia',
                subtitle: 'Proste składniki, duża wartość odżywcza',
                items: ['regenerujący bulion (warzywny lub mięsny)', 'pasta z czerwonej fasoli', 'ciasto lub babeczki fasolowe bez dodatku mąki (przywożę wcześniej namoczoną fasolę)'],
                icon: FaCookieBite,
                bg: 'bg-emerald-100',
                color: 'text-emerald-700',
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeInUp}
                custom={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C]">{v.title}</h3>
                    <p className="font-['Lato'] text-gray-600 text-sm">{v.subtitle}</p>
                  </div>
                </div>
                <p className="font-['Lato'] text-gray-600 mb-2">Przygotujemy razem:</p>
                <ul className="list-disc list-inside font-['Lato'] text-gray-600 space-y-1">
                  {v.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 font-['Lato'] text-gray-600">
            💬 Masz własny pomysł na wspólne gotowanie? Napisz do mnie – chętnie rozważę indywidualną propozycję, jeśli będzie to możliwe logistycznie.
          </p>
        </motion.section>

        {/* 8. Co zmienia się po spotkaniu */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-8">
            Co zmienia się po takim spotkaniu?
          </h2>
          <p className="font-['Lato'] text-gray-600 mb-6">
            Rodzice często mówią, że po naszej wspólnej pracy:
          </p>
          <ul className="space-y-3">
            {[
              'zakupy stają się dużo prostsze',
              'gotowanie zajmuje mniej czasu',
              'w kuchni pojawia się więcej spokoju',
              'dieta przestaje być źródłem codziennego stresu',
            ].map((item, i) => (
              <motion.li
                key={item}
                variants={fadeInUp}
                custom={i}
                className="flex items-center gap-3 font-['Lato'] text-gray-700"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 shrink-0">
                  <FaCheck className="w-4 h-4" />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* 9. Pakiety i cennik */}
        <motion.section
          id="pakiety"
          className="scroll-mt-24 mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-8">
            Pakiety wsparcia
          </h2>
          <div className="space-y-8">
            {[
              {
                name: 'Szybki Start – pierwszy krok do spokojnej kuchni',
                price: '600 zł',
                time: 'ok. 2 godziny',
                forWho: 'Dla rodziców, którzy potrzebują szybkiego startu i jasnej instrukcji, jak zacząć wprowadzać zdrową dietę w domu bez chaosu i nadmiernego stresu.',
                points: [
                  'Audyt kuchni i szafek – razem sprawdzimy, co możesz zostawić, co warto wymienić, a które produkty są źródłem stresu.',
                  'Lista bezpiecznych zamienników – gotowa lista produktów, które możesz używać od zaraz.',
                  'Konsultacja i plan pierwszych zmian – krok po kroku ustalimy, od czego zacząć.',
                ],
                icon: FaLeaf,
              },
              {
                name: 'Kuchnia pod Kontrolą – gotowanie bez stresu',
                price: '1900 zł',
                time: 'ok. 4–5 godzin',
                forWho: 'Dla rodziców, którzy chcą praktycznie wdrożyć dietę eliminacyjną w swojej kuchni, jednocześnie ucząc się prostych, powtarzalnych metod gotowania.',
                points: [
                  'Audyt kuchni i szafek, lista zamienników, konsultacja i plan pierwszych zmian.',
                  'Wspólne gotowanie (3 potrawy do wyboru) – składniki przywożę ze sobą.',
                  '2 tygodnie wsparcia online – pozostaję w kontakcie po spotkaniu.',
                ],
                icon: FaUtensils,
              },
              {
                name: 'Metamorfoza Premium – pełne wdrożenie w jeden dzień',
                price: '2300 zł',
                time: 'ok. 7–8 godzin',
                forWho: 'Dla rodziców, którzy chcą pełnego, praktycznego wdrożenia diety eliminacyjnej w jednym dniu, zdobyć pewność w codziennym gotowaniu i zakupach.',
                points: [
                  'Audyt, lista zamienników, konsultacja i plan zmian.',
                  'Wspólne gotowanie (3 potrawy) – przywożę składniki, w tym namoczoną fasolę.',
                  'Shopping Safari – zakupy w Twoim lokalnym sklepie.',
                  'Miesiąc wsparcia online.',
                ],
                icon: FaHandHoldingHeart,
              },
            ].map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeInUp}
                custom={i}
                className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 shadow-md hover:border-green-200 transition-colors"
              >
                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <pkg.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C]">{pkg.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="font-['Patrick_Hand'] text-green-700 text-xl">{pkg.price}</span>
                      <span className="flex items-center gap-1 text-gray-500 font-['Lato'] text-sm">
                        <FaClock className="w-4 h-4" />
                        {pkg.time}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-['Lato'] text-gray-600 mb-4">Co zyskasz:</p>
                <ul className="space-y-2 mb-4">
                  {pkg.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 font-['Lato'] text-gray-700">
                      <FaCheck className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="font-['Lato'] text-gray-600 text-sm bg-gray-50 rounded-lg p-3">
                  💡 Dla kogo? {pkg.forWho}
                </p>
                <div className="mt-6">
                  <CtaButton />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 10. Bonus – Słoik Startowy */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div className="bg-[#F6EFE9] rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <FaFlask className="w-6 h-6" />
              </div>
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1A202C] font-bold">
                Bonus: Słoik Startowy
              </h2>
            </div>
            <p className="font-['Lato'] text-gray-700 leading-relaxed mb-4">
              Podczas wizyty otrzymasz ode mnie Słoik Startowy z moją autorską Uniwersalną Mieszanką Mąk Bezglutenowych – tą samą, której używam w swojej kuchni od ponad 10 lat. Dzięki niej masz gwarancję udanych wypieków, nie musisz szukać różnych mąk w sklepach i możesz od razu zacząć gotować z moich przepisów.
            </p>
          </div>
        </motion.section>

        {/* 11. Lokalizacja */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="w-6 h-6 text-green-600 shrink-0 mt-1" />
            <div>
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C] mb-2">Lokalizacja</h2>
              <p className="font-['Lato'] text-gray-600">
                Wrocław i okolice (do 20 km) – dojazd w cenie. Możliwy jest również dojazd w inne miejsca w Polsce po wcześniejszym ustaleniu.
              </p>
            </div>
          </div>
        </motion.section>

        {/* 12. Sekcja SEO – dieta eliminacyjna przy autyzmie */}
        <motion.section
          className="mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
            <h2 className="font-['Playfair_Display'] text-xl font-bold text-[#1A202C] mb-4">
              Dieta eliminacyjna przy autyzmie – wsparcie praktyczne
            </h2>
            <p className="font-['Lato'] text-gray-600 leading-relaxed">
              Coraz więcej rodziców decyduje się na dietę eliminacyjną przy autyzmie, najczęściej w formie diety bez glutenu i bez nabiału (GFCF). Najtrudniejszym momentem jest zwykle początek: zmiana produktów w kuchni, znalezienie prostych przepisów, nauka bezpiecznych zakupów. Moje spotkania pomagają przejść przez ten etap spokojnie i praktycznie – w Twojej własnej kuchni.
            </p>
          </div>
        </motion.section>

        {/* 13. FAQ */}
        <motion.section
          id="faq"
          className="scroll-mt-24 mb-14 md:mb-18"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1A202C] font-bold mb-6 flex items-center gap-3">
            <FaHeart className="w-8 h-8 text-green-600" />
            Najczęstsze pytania
          </h2>
          <FaqAccordion />
        </motion.section>

        {/* 14. Final CTA */}
        <motion.section
          className="bg-[#F6EFE9] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl md:text-4xl text-[#1A202C] font-bold mb-4">
            Zróbmy pierwszy krok
          </h2>
          <p className="text-gray-600 font-['Lato'] max-w-xl mx-auto mb-8">
            Jeśli czujesz, że w Twojej kuchni jest za dużo chaosu i za mało wsparcia — porozmawiajmy. Zapraszam Cię na bezpłatną 15-minutową konsultację online, podczas której opowiesz mi o swojej sytuacji, a ja pokażę Ci, jak mogę Ci pomóc.
          </p>
          <CtaButton />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default UslugiPage;
