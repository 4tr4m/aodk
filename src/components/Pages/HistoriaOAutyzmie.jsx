import React from 'react';
import { motion } from 'framer-motion';
import TopNavBar from '../Headers/TopNavBar';
import CategoryHeader from './CategoryHeader';
import Footer from '../Footer/Footer';
import SEO from '../SEO/SEO';
import { FaQuoteLeft, FaQuoteRight, FaBreadSlice, FaVial, FaAllergies, FaBook, FaPodcast, FaSpotify, FaHeadphones, FaTablets } from 'react-icons/fa';
import { GiMushrooms, GiFoodChain, GiStomach } from 'react-icons/gi';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { TbOmega } from 'react-icons/tb';

const HistoriaOAutyzmie = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="O Autyzmie - Autyzm od Kuchni | Historia i doświadczenia"
        description="Poznaj historię Huberta i jego drogi z autyzmem. Dowiedz się, jak dieta i determinacja mogą wspierać rozwój dziecka ze spektrum."
        keywords="autyzm, spektrum autyzmu, dieta przy autyzmie, rozwój dziecka z autyzmem"
        canonical="https://autyzmkuchni.pl/o-autyzmie"
      />
      <div className="relative mb-8">
        <CategoryHeader />
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
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Playfair_Display'] text-gray-900 mb-6">
              Historia naszego autyzmu
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Lato']">
              „Autyzm od Kuchni" to zbiór przepisów kulinarnych, które przez ponad 10 lat zbierałam, adaptowałam i które wykorzystuję do dziś, przygotowując posiłki dla mojego autystycznego syna.
            </p>
          </div>

          {/* Main Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl mx-auto max-w-4xl mb-12"
          >
            <img 
              src="/img/autism-journey.jpg" 
              alt="Droga z autyzmem"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <div className="inline-flex items-center text-green-100 mb-3">
                  <FaQuoteLeft className="mr-2" />
                  <span className="text-lg">Nasza historia to dowód na to, że małe, ale świadome kroki mogą prowadzić do wielkich zmian.</span>
                  <FaQuoteRight className="ml-2" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg prose prose-lg max-w-none"
          >
            <div className="text-gray-600 font-['Lato'] leading-relaxed">
              <p>
                Hubert, bohater tej historii, początkowo przejawiał wszystkie charakterystyczne objawy ze spektrum autyzmu: nie nawiązywał kontaktu wzrokowego, wertował książki, układał zabawki w równych rzędach, nie potrafił naśladować innych, chodził na palcach, kręcił się w kółko, nie rozpoznawał rodziców, a jego ucieczki – bieganie na oślep przed siebie – były codziennością.
              </p>
              <p>
                Nie reagował na swoje imię, nie wskazywał palcem, machał charakterystycznie rączkami i płakał na widok babci oraz prezentów. Mowa była bardzo opóźniona i niewyraźna, a trening czystości sprawiał trudności. Do tego dochodziły ciągłe biegunki, AZS i wrzask, którym wybuchał, gdy coś nie szło po jego myśli. W tamtym czasie nie było żadnej możliwości, by dotrzeć do niego, wytłumaczyć coś, a tym bardziej przekonać go do czegokolwiek.
              </p>
              <p className="font-medium text-green-800">
                Efekty diety zauważyliśmy bardzo szybko, a były one szczególnie widoczne w ustąpieniu biegunek i zmniejszeniu krzyków.
              </p>
              <p>
                Obecnie Hubert jest uczniem szkoły ogólnodostępnej, gdzie korzysta z terapii oraz wsparcia nauczyciela wspomagającego. Na pierwszy rzut oka (i na drugi też) nie widać, że zmaga się ze spektrum. Jest chłopcem wysoko funkcjonującym, który z powodzeniem radzi sobie z codziennymi wyzwaniami. W szczególności wyróżnia się w przedmiotach ścisłych, gdzie osiąga świetne wyniki.
              </p>
              <p>
                Hubert ma pasje, które nadają jego życiu głębszą wartość. Czyta książki (w tempie ekspresowym) takie jak biografie Steva Jobs'a czy Elona Musk'a. Posiada poczucie humoru i doskonale rozumie żarty. Wykazuje empatię i potrafi naśladować innych. Z łatwością można mu wytłumaczyć konwenanse społeczne oraz oczekiwane zachowania, co pozwala mu coraz lepiej odnajdywać się w różnych sytuacjach.
              </p>
              <p>
                W naszym odczuciu autyzm stał się częścią charakteru Huberta, a wszystko, co robimy, ma na celu pomóc mu w lepszym funkcjonowaniu w społeczeństwie i dostosowaniu do społecznych norm.
              </p>
              <p>
                Kiedy otrzymaliśmy diagnozę, kompletnie nie wiedzieliśmy, czego się spodziewać i jak będzie wyglądać nasze życie w przyszłości. Dziś zamiast autyzmu mamy oficjalną diagnozę (jedynie) zaburzeń rozwojowych z kręgu autyzmu. Teraz będąc w tym cudownym miejscu, chcę podzielić się naszą historią, żeby dać nadzieję i pokazać, że takie, wydawałoby się, mało inwazyjne zmiany mogą zrobić olbrzymią różnicę.
              </p>
              <p>
                Dzięki determinacji, wsparciu i konsekwencji w podejmowanych decyzjach, udało nam się stworzyć dla Huberta warunki, które pozwoliły mu na rozwój i lepsze funkcjonowanie w społeczeństwie. Nasza historia to dowód na to, że małe, ale świadome kroki mogą prowadzić do wielkich zmian. Chciałabym, aby każdy, kto staje przed podobnymi wyzwaniami, poczuł, że nie jest sam, a zmiany, choć mogą wymagać czasu, są możliwe. Zamiast skupiać się na ograniczeniach, warto szukać dróg do rozwoju i sukcesu, bo każde dziecko ma potencjał, by osiągnąć więcej, niż nam się na początku wydaje.
              </p>
            </div>
          </motion.div>

          {/* What is Autism Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              O co chodzi z tym autyzmem?
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="prose prose-lg max-w-none text-gray-600 font-['Lato'] leading-relaxed">
                <p>
                  Autyzm to zaburzenie neurorozwojowe, które wpływa na sposób, w jaki dana osoba postrzega świat, komunikuje się i wchodzi w interakcje społeczne. Chociaż autyzm ma podłoże genetyczne i neurologiczne, coraz więcej badań wskazuje, że to środowisko, w tym żywienie i ogólny stan zdrowia metabolicznego, mają znaczący wpływ na funkcjonowanie osoby ze spektrum autyzmu, a odpowiednie zmiany mogą pomóc w złagodzeniu niektórych objawów.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Nutrition and Autism Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Żywienie a autyzm: kluczowe aspekty
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dieta eliminacyjna */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaBreadSlice className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Dieta eliminacyjna</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>U niektórych osób z autyzmem gluten (białko obecne w pszenicy, jęczmieniu i życie) oraz kazeina (białko mleka) mogą wpływać negatywnie na zachowanie i funkcjonowanie.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Te składniki są rozkładane na opioidy (peptydy opioidowe), które mogą przenikać przez "nieszczelne jelita" i wpływać na funkcjonowanie mózgu.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Zdrowie jelit */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <GiStomach className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Zdrowie jelit i mikrobiom</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Osoby z autyzmem często mają problemy żołądkowo-jelitowe (biegunki, zaparcia, bóle brzucha).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Zdrowie jelit wpływa na mózg poprzez oś jelitowo-mózgową. Dysbioza może nasilać objawy autyzmu.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Probiotyki, fermentowane produkty i dieta bogata w błonnik mogą wspierać równowagę mikrobiomu.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Candida */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <GiMushrooms className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Candida</h3>
                </div>
                <p className="text-gray-600">
                  U osób z autyzmem istnieje wysokie prawdopodobieństwo przerostu Candida albicans, co może powodować wytwarzanie toksycznych metabolitów wpływających na zachowanie i funkcje poznawcze. Dieta niskowęglowodanowa oraz wsparcie mikrobioty jelitowej (probiotyki, kiszonki) mogą pomóc ograniczyć przerost drożdżaków.
                </p>
              </motion.div>

              {/* Unikanie sztucznych dodatków */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaAllergies className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Unikanie sztucznych dodatków</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Barwniki, konserwanty i sztuczne słodziki mogą nasilać nadpobudliwość i inne trudności w zachowaniu.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Dieta oparta na naturalnych, nieprzetworzonych produktach jest korzystniejsza.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Wspieranie metabolizmu */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <MdOutlineCleaningServices className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Wspieranie metabolizmu i detoksykacji</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Osoby z autyzmem mogą mieć trudności z neutralizowaniem toksyn (np. metali ciężkich).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Żywność bogata w siarkę (np. brokuły, cebula, czosnek) wspiera detoksykację.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Kluczowe niedobory */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <GiFoodChain className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Kluczowe niedobory żywieniowe</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block w-6 text-center mr-2"><TbOmega className="inline text-green-500" /></span>
                    <span><strong>Omega-3:</strong> Pomagają w rozwoju mózgu, wspierają koncentrację i zmniejszają stany zapalne.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 text-center mr-2"><FaVial className="inline text-green-500" /></span>
                    <span><strong>Cynk i magnez:</strong> Wspierają funkcjonowanie układu nerwowego.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 text-center mr-2"><FaTablets className="inline text-green-500" /></span>
                    <span><strong>Witaminy z grupy B:</strong> Szczególnie B6 i B12 są istotne dla procesów metabolicznych mózgu.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 text-center mr-2">D</span>
                    <span><strong>Witamina D:</strong> Jej niedobór może nasilać objawy autyzmu, a suplementacja wspiera układ nerwowy i odpornościowy.</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Polecam literaturę
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Dzieci z głodującymi mózgami",
                  author: "Jaquelyn McCandless",
                  description: "Polskie tłumaczenie, które przygląda się terapiom medycznym dla dzieci z autyzmem, skupiając się na diecie i zdrowiu jelit."
                },
                {
                  title: "Dieta bezglutenowa i beznabiałowa w autyzmie",
                  author: "Katarzyna Świerczyńska-Krępa i Joanna Sokołowska",
                  description: "Bada, jak eliminacja glutenu i kazeiny może wpływać na objawy autyzmu, opierając się na badaniach naukowych."
                },
                {
                  title: "Jelita wiedzą lepiej",
                  author: "Michael Mosley",
                  description: "Choć nie dotyczy bezpośrednio autyzmu, oferuje wiedzę o zdrowiu jelit i mikrobiomie, co jest istotne dla osób z autyzmem."
                },
                {
                  title: "Szczęśliwe jelita",
                  author: "Vincent Pedre",
                  description: "Promuje holistyczne podejście do zdrowia jelit, co może być korzystne dla zdrowia osób z autyzmem, pomimo że nie jest specyficznie o tym zaburzeniu."
                },
                {
                  title: "Jelitowy mózg",
                  author: "Emeran Mayer",
                  description: "Analizuje związek między jelitami a mózgiem, co jest szczególnie interesujące w kontekście zdrowia psychicznego i autyzmu."
                },
                {
                  title: "Historia wewnętrzna",
                  author: "Giulia Enders",
                  description: "Jest przewodnikiem po zdrowiu jelit, podkreślając wpływ diety na ogólne zdrowie, co może mieć znaczenie dla osób z autyzmem."
                },
                {
                  title: "Healing the New Childhood Epidemics",
                  author: "Kenneth Bock i Nancy St. John",
                  description: "Podchodzi do autyzmu oraz innych zaburzeń rozwojowych jako do problemów wielowymiarowych, gdzie dieta odgrywa kluczową rolę. Proponuje kompleksowe podejście, w tym terapie dietetyczne, suplementację i detoksykację."
                },
                {
                  title: "The Autism Revolution",
                  author: "Dr. Mark Hyman",
                  description: "Hyman, znany z promocji zdrowia przez dietę, oferuje holistyczne podejście do autyzmu, w którym zdrowie jelit i dieta są kluczowe. Proponuje strategie żywieniowe, które mogą łagodzić objawy autyzmu."
                },
                {
                  title: "Gut and Psychology Syndrome",
                  author: "Dr. Natasha Campbell-McBride",
                  description: "Wprowadza koncepcję GAPS (Gut and Psychology Syndrome), sugerując, że wiele zaburzeń neurologicznych, w tym autyzm, ma swoje korzenie w zdrowiu jelit. Proponuje specjalną dietę, która ma na celu leczenie jelit i poprawę zdrowia psychicznego."
                },
                {
                  title: "The Autism Puzzle",
                  author: "Brittyn Coleman",
                  description: "Łączy autyzm z ekspozycją na toksyny środowiskowe i zdrowiem jelit, oferując wskazówki dietetyczne oraz strategie detoksykacji."
                },
                {
                  title: "Nourishing Hope for Autism",
                  author: "Julie Matthews",
                  description: "Skupia się na specyficznych strategiach dietetycznych dla dzieci z autyzmem, obejmując diety jak GFCF (bezglutenowa i beznabiałowa), oraz podkreślając znaczenie specyficznych suplementów i odżywiania dla poprawy objawów."
                }
              ].map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.05, duration: 0.5 }}
                  className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="flex items-start mb-3">
                    <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                      <FaBook className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-['Playfair_Display'] text-gray-800 leading-tight">{book.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 italic">Autor: {book.author}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 flex-grow">{book.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
                        Joe Rogan rozmawia z Robertem F. Kennedy Jr. o różnych tematach, w tym o historii rodziny Kennedy, środowisku, zdrowiu publicznym, a szczególnie o kontrowersjach związanych ze szczepieniami. Kennedy Jr. jest znany ze swojego krytycznego podejścia do polityki szczepień, co było głównym punktem dyskusji. Poruszają również tematy autyzmu, cenzury, demokracji i wolności słowa, z naciskiem na jego perspektywę dotyczącą zdrowia publicznego i wpływu korporacji farmaceutycznych.
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
                        Joe Rogan rozmawia z Garym Taubesem o wpływie cukru na zdrowie, szczególnie o jego roli w otyłości, cukrzycy i innych chorobach metabolicznych. Taubes argumentuje, że cukier jest toksyczny w sposób podobny do tytoniu, podkreślając, że nadmierne spożycie cukru może prowadzić do poważnych problemów zdrowotnych.
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
              
              {/* The Diary Of A CEO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaHeadphones className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-['Playfair_Display'] text-gray-800">The Diary Of A CEO (Steven Bartlett)</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#298: Dr Rangan Chatterjee</h4>
                      <p className="text-gray-600 text-sm">
                        Chatterjee, lekarz rodzinny i autor książek o zdrowiu, omawia holistyczne podejście do zdrowia, w tym dietę. Chociaż to nie jest odcinek specjalnie o autyzmie, Chatterjee często mówi o wpływie diety na zdrowie ogólne.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#223: Dr Tim Spector</h4>
                      <p className="text-gray-600 text-sm">
                        Odcinek skupia się na badaniach nad mikrobiomem jelitowym, genetyką i zdrowym odżywianiem. Spector jest profesorem genetyki, więc jego dyskusje mogą być szczególnie interesujące dla osób zainteresowanych, jak dieta wpływa na zdrowie.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                      <h4 className="font-medium text-gray-800 mb-2">#199: Dr David Sinclair</h4>
                      <p className="text-gray-600 text-sm">
                        Sinclair, znany z badań nad starzeniem się, porusza kwestie związane z dietą, postem i długowiecznością, co może być powiązane z ogólnym stanem zdrowia, w tym zdrowiem jelit.
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
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaPodcast className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Lex Fridman Podcast</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#152 - Dr. Andrew Huberman</h4>
                      <p className="text-gray-600 text-sm">
                        Huberman, profesor neurobiologii, rozmawia o zdrowiu, w tym o wpływie diety na mózg, co może być interesujące w kontekście zdrowia neurologicznego.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#67 - Dr. Rhonda Patrick</h4>
                      <p className="text-gray-600 text-sm">
                        Patrick omawia żywienie, suplementację i zdrowie mózgu. Chociaż nie jest to dedykowany autyzmowi, porusza tematy, które mogą być istotne dla zrozumienia wpływu diety na zdrowie neurologiczne.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* The Tim Ferriss Show */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <FaHeadphones className="text-green-600 text-xl" />
                    </div>
                    <h3 className="text-xl font-['Playfair_Display'] text-gray-800">The Tim Ferriss Show</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#164 - Dr. Peter Attia</h4>
                      <p className="text-gray-600 text-sm">
                        Attia, specjalista medycyny długowieczności, omawia zdrowie, dietę i wpływ żywienia na różne aspekty zdrowia, w tym zdrowie metaboliczne.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#93 - Dr. Rhonda Patrick</h4>
                      <p className="text-gray-600 text-sm">
                        Patrick rozmawia o nauce związanej z żywieniem, suplementacją i zdrowiem mózgu, co może obejmować dyskusje o neuroplastyczności i zdrowiu neurologicznym.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#450 - Dr. Andrew Huberman</h4>
                      <p className="text-gray-600 text-sm">
                        Huberman ponownie pojawia się w podcaście Ferrissa, gdzie poruszają tematy związane z optymalizacją zdrowia, w tym dietą, światłem dziennym i wpływem na sen i zdrowie ogólne.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">#492 - Temple Grandin</h4>
                      <p className="text-gray-600 text-sm">
                        Temple Grandin, znana autorka i osoba z autyzmem, rozmawia o swoim doświadczeniu, co może być jednym z rzadszych odcinków bezpośrednio dotyczących autyzmu. Chociaż nie jest to specjalnie o dietach, to bezpośredni wgląd w autyzm.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Modern Wisdom & Rich Roll in 2 columns */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Modern Wisdom */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaPodcast className="text-green-600 text-xl" />
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] text-gray-800">Modern Wisdom (Chris Williamson)</h3>
                    </div>
                    
                    <div className="space-y-3 flex-grow">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#700 - Dr Andrew Huberman</h4>
                        <p className="text-gray-600 text-sm">
                          Huberman, neurobiolog, często porusza tematy związane ze zdrowym trybem życia, w tym wpływem diety na zdrowie mózgu.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#577 - David Goggins</h4>
                        <p className="text-gray-600 text-sm">
                          Chociaż Goggins jest znany bardziej z wytrzymałości fizycznej i mentalnej, jego rozmowy często dotykają tematów związanych z odżywianiem w kontekście optymalizacji wydajności.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#368 - Dr. Rhonda Patrick</h4>
                        <p className="text-gray-600 text-sm">
                          Patrick rozmawia o optymalizacji zdrowia przez dietę, suplementację i style życia, co może obejmować zdrowe odżywianie.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* The Rich Roll Podcast */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3, duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaHeadphones className="text-green-600 text-xl" />
                      </div>
                      <h3 className="text-xl font-['Playfair_Display'] text-gray-800">The Rich Roll Podcast</h3>
                    </div>
                    
                    <div className="space-y-3 flex-grow">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#629 - Dr. Rhonda Patrick</h4>
                        <p className="text-gray-600 text-sm">
                          Rozmawiają o optymalizacji zdrowia przez dietę, suplementację i style życia, z naciskiem na naukowe podejście do zdrowia.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#580 - Dr. Michael Greger</h4>
                        <p className="text-gray-600 text-sm">
                          Autor "How Not to Die" omawia dietę roślinną jako sposób na zapobieganie i leczenie chorób.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#551 - Dr. David Perlmutter</h4>
                        <p className="text-gray-600 text-sm">
                          Dyskutują o wpływie diety na zdrowie mózgu, co jest istotne w kontekście zdrowego odżywiania. Debata ta może być interesująca w kontekście autyzmu.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-1">#422 - Dr. Mark Hyman</h4>
                        <p className="text-gray-600 text-sm">
                          Hyman, ekspert medycyny funkcjonalnej, mówi o wpływie diety na zdrowie, w tym o dietach eliminacyjnych.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Popularity of Elimination Diet Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-['Playfair_Display'] text-gray-900 mb-8 text-center">
              Popularność diety eliminacyjnej
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <p className="text-gray-600 mb-8">
                Zalecenia żywieniowe dla Huberta są coraz bardziej popularne nie tylko wśród celebrytów, ale również dietetyków i lekarzy. Dieta wykluczająca gluten, nabiał i cukier zyskała wielu zwolenników, a wśród nich można wymienić kilka znanych postaci:
              </p>
              
              <div className="space-y-10">
                {/* Gluten, Nabiał i Cukier */}
                <div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-4 border-b border-green-100 pb-2">
                    Rezygnacja z glutenu, nabiału i cukru
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Dr. Mark Hyman",
                        description: "Lekarz rodzinny i autor książek o zdrowiu, takich jak \"The Blood Sugar Solution\", który promuje dietę wykluczającą gluten, nabiał oraz przetworzone cukry w leczeniu stanów zapalnych i chorób przewlekłych."
                      },
                      {
                        name: "Dr. Terry Wahls",
                        description: "Neurolog i badaczka, która stworzyła \"Dieta Wahlsa\", eliminującą gluten, nabiał i cukry, wspierającą zdrowie w walce ze stwardnieniem rozsianym."
                      },
                      {
                        name: "Dr n. med. Danuta Myłek",
                        description: "Mikrobiolog, immunolog, specjalista chorób wewnętrznych i autorka wielu publikacji o zdrowiu. Promuje dietę bezglutenową, zwłaszcza w kontekście alergii i nietolerancji pokarmowych, oraz eliminację innych składników, takich jak cukier i nabiał, z indywidualnym podejściem."
                      },
                      {
                        name: "Dr n. med. Monika Jaracz",
                        description: "Psychiatra, która zajmuje się wpływem diety na zdrowie psychiczne. Promuje diety eliminacyjne, w tym bezglutenowe, beznabiałowe i bezcukrowe, w leczeniu zaburzeń psychicznych."
                      },
                      {
                        name: "Dr n. med. Anna Lewitt",
                        description: "Specjalistka medycyny funkcjonalnej, która promuje holistyczne podejście do zdrowia, z naciskiem na indywidualne podejście do pacjenta i dietę eliminacyjną, w tym wykluczenie glutenu, nabiału i cukru."
                      },
                      {
                        name: "Anna Lewandowska",
                        description: "Trenerka fitness, znana z promowania zdrowego stylu życia, w tym diety opartej na naturalnych, nieprzetworzonych produktach. Często promuje dietę bezglutenową i bezcukrową, choć z ograniczeniem nabiału."
                      },
                      {
                        name: "Małgorzata Rozenek-Majdan",
                        description: "Znana jako \"Perfekcyjna Pani Domu\", która dzieli się swoimi zdrowymi wyborami, w tym dietą wykluczającą gluten, cukier i ograniczającą nabiał."
                      },
                      {
                        name: "Karolina Szostak",
                        description: "Dziennikarka sportowa, która dzięki diecie eliminacyjnej (bez glutenu, nabiału i z ograniczeniem cukru) osiągnęła imponującą utratę wagi."
                      },
                      {
                        name: "Natalia Kukulska",
                        description: "Piosenkarka, która po narodzinach dziecka zaczęła stosować dietę bezglutenową i bezcukrową, z ograniczeniem nabiału, co wpłynęło pozytywnie na jej zdrowie i samopoczucie."
                      },
                      {
                        name: "Maja Ostaszewska",
                        description: "Aktorka, weganka, która wyklucza nabiał, ale również stosuje dietę bezglutenową i ogranicza cukier."
                      },
                      {
                        name: "Jessica Alba",
                        description: "Aktorka i założycielka Honest Company, promująca zdrowy styl życia oparty na diecie bezglutenowej, bezlaktozowej i z ograniczeniem cukru."
                      },
                      {
                        name: "Kourtney Kardashian",
                        description: "Znana z promowania zdrowych nawyków żywieniowych, dzieląc się przepisami bez glutenu, nabiału i cukru na Instagramie i blogu."
                      },
                      {
                        name: "Miranda Kerr",
                        description: "Modelka, która wspiera dietę bezglutenową, z niską zawartością cukru i ograniczeniem nabiału."
                      },
                      {
                        name: "Gigi Hadid",
                        description: "Modelka z celiakią, promująca dietę bezglutenową, z ostrożnym podejściem do cukru i nabiału."
                      },
                      {
                        name: "Victoria Beckham",
                        description: "Projektantka mody, której dieta wyklucza gluten, nabiał i cukier."
                      }
                    ].map((person, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5 + index * 0.05, duration: 0.3 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-800 mb-1">{person.name}</h4>
                        <p className="text-gray-600 text-sm">{person.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Gluten */}
                <div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-4 border-b border-green-100 pb-2">
                    Rezygnacja z glutenu
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Dr. David Perlmutter",
                        description: "Neurolog i autor książki \"Zbożowy umysł\", w której sugeruje, że gluten i cukry mogą przyczyniać się do problemów zdrowotnych, w tym chorób neurologicznych."
                      },
                      {
                        name: "Dr. Alessio Fasano",
                        description: "Pediatra i gastroenterolog, który bada wpływ diety bezglutenowej na zdrowie, szczególnie u osób z celiakią i innymi nietolerancjami pokarmowymi."
                      },
                      {
                        name: "Dr n. med. Katarzyna Świerczyńska-Krępa",
                        description: "Specjalistka pediatrii, gastroenterologii i hepatologii dziecięcej, zajmująca się celiakią u dzieci. Promuje dietę bezglutenową, a także eliminację innych potencjalnych alergenów."
                      },
                      {
                        name: "Elisabeth Hasselbeck",
                        description: "Była uczestniczka \"Survivor\", autorka książki \"The G-Free Diet\", promująca dietę bezglutenową."
                      }
                    ].map((person, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.8 + index * 0.05, duration: 0.3 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-800 mb-1">{person.name}</h4>
                        <p className="text-gray-600 text-sm">{person.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Others */}
                <div>
                  <h3 className="text-xl font-['Playfair_Display'] text-gray-800 mb-4 border-b border-green-100 pb-2">
                    Inne podejścia do zdrowego odżywiania
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Michael Mosley",
                        description: "Autor książki \"Jelita wiedzą lepiej\" oraz promotor diety 5:2 (post przerywany) i diety śródziemnomorskiej. Skupia się na zdrowiu jelit i wpływie diety na ogólne samopoczucie."
                      },
                      {
                        name: "Dr. Joel Fuhrman",
                        description: "Specjalista medycyny rodzinnej i autor książki \"Eat to Live\", który promuje dietę opartą na roślinach z naciskiem na spożywanie dużej ilości warzyw liściastych, owoców i orzechów."
                      },
                      {
                        name: "Dr. Robert Lustig",
                        description: "Pediatra-endokrynolog, znany z krytyki cukru, szczególnie fruktozy, jako przyczyny wielu chorób przewlekłych."
                      },
                      {
                        name: "Gwyneth Paltrow",
                        description: "Aktorka i założycielka Goop, która promuje dietę bezglutenową, organiczną i z niską zawartością cukru. Jej podejście do diety jest holistyczne."
                      },
                      {
                        name: "Agnieszka Maciąg",
                        description: "Polska modelka, pisarka i blogerka, która promuje zdrowy styl życia, w tym wegetarianizm, ograniczenie cukru, i często podaje przepisy bezglutenowe i beznabiałowe."
                      },
                      {
                        name: "Oprah Winfrey",
                        description: "Znana prezenterka telewizyjna, która przez lata eksperymentowała z różnymi dietami, w tym dietą bezglutenową i niskocukrową."
                      },
                      {
                        name: "Tim Ferriss",
                        description: "Autor \"The 4-Hour Body\" i \"The 4-Hour Chef\", promuje eksperymentowanie z dietą, w tym eliminację przetworzonych cukrów oraz okresowe wykluczanie glutenu i nabiału."
                      }
                    ].map((person, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.0 + index * 0.05, duration: 0.3 }}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-800 mb-1">{person.name}</h4>
                        <p className="text-gray-600 text-sm">{person.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
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