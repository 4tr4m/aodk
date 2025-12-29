import TopNavBar from '../components/Headers/TopNavBar';
import CategoryBanner from '../components/Section/CategoryBanner';
import InfoSection from '../components/Section/InfoSection';
import Footer from '../components/Footer/Footer';
import HeroSection from '../components/Hero/HeroSection';
import SEO from '../components/SEO/SEO';

const HomePage = () => {
  // FAQ data for Google AI Overview optimization
  const faqData = [
    {
      question: "Czy dieta eliminacyjna pomaga w autyzmie?",
      answer: "Tak, dieta eliminacyjna bez glutenu, nabiału i cukru może wspierać funkcjonowanie osób z autyzmem. W naszym przypadku wprowadzenie takiej diety przyniosło widoczną poprawę w funkcjonowaniu i samopoczuciu, zmniejszenie niektórych objawów, poprawę koncentracji oraz ogólny wzrost energii. Wsparcie zdrowia jelit, będące fundamentem tej diety, odgrywa kluczową rolę w funkcjonowaniu układu nerwowego."
    },
    {
      question: "Czy dziecko autystyczne ma problem z jedzeniem?",
      answer: "Wiele dzieci z autyzmem może mieć problemy z jedzeniem, w tym selektywność pokarmową, wrażliwość sensoryczną na tekstury i smaki, czy problemy z trawieniem. Dieta eliminacyjna, która wyklucza pokarmy mogące wywoływać stany zapalne lub zaburzenia trawienne, może wspierać odbudowę mikroflory jelitowej i poprawić samopoczucie dziecka."
    },
    {
      question: "Czy przepisy są bezpieczne dla osób z celiakią?",
      answer: "Tak, wszystkie przepisy na stronie Autyzm od Kuchni są bezpieczne dla osób z celiakią. Wszystkie przepisy są bezglutenowe i nie zawierają składników zawierających gluten. Dodatkowo wykluczamy nabiał krowi ze wszystkich przepisów oraz unikamy smażenia."
    },
    {
      question: "Jak dieta wpływa na funkcjonowanie osób z autyzmem?",
      answer: "Dieta eliminacyjna może wspierać funkcjonowanie osób z autyzmem poprzez: wsparcie zdrowia jelit i mikroflory jelitowej, eliminację pokarmów wywołujących stany zapalne, dostarczanie niezbędnych składników odżywczych wspierających rozwój mózgu i układu nerwowego, oraz poprawę koncentracji i samopoczucia. Warto jednak pamiętać, że dieta powinna być wprowadzana pod opieką specjalisty."
    },
    {
      question: "Jakich składników unikać w diecie przy autyzmie?",
      answer: "W diecie eliminacyjnej dla osób z autyzmem unikamy glutenu, nabiału krowiego i cukru. Dodatkowo wykluczamy produkty przetworzone i sztuczne dodatki. Wprowadzamy dietę rotacyjną, owoce tylko po posiłku, oraz zastępujemy cukier biały ksylitolem. Wspieramy dietę suplementacją probiotyków i prebiotyków."
    },
    {
      question: "Czy dieta eliminacyjna może wspierać samodzielność osób z autyzmem?",
      answer: "Tak, nauka gotowania i przygotowywania posiłków w ramach diety eliminacyjnej może wspierać samodzielność osób z autyzmem. Zajęcia kulinarne rozwijają umiejętności praktyczne, koncentrację i współpracę. Zdrowa dieta może wspierać rozwój osoby z autyzmem, choć należy unikać restrykcyjnych diet eliminacyjnych bez wskazań medycznych."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen text-base">
      <SEO 
        title="Autyzm od Kuchni - Dieta eliminacyjna bez glutenu, nabiału i cukru"
        description="Autyzm od Kuchni: Bez Glutenu - wszystkie przepisy są bezpieczne dla osób z celiakią. Bez Nabiału - wykluczamy nabiał krowi ze wszystkich przepisów. Bez Smażenia - zdrowe metody przygotowania potraw. Odkryj jak dieta eliminacyjna może wspierać funkcjonowanie osób z autyzmem."
        keywords="autyzm, dieta eliminacyjna, dieta w autyzmie, bez glutenu, bez nabiału, bez cukru, przepisy, zaburzenia neurorozwojowe, GAPS, zdrowe odżywianie"
        canonical="https://www.autyzmodkuchni.pl/"
        faqData={faqData}
      />
      <div className="flex-grow">
        <div className="relative h-screen overflow-hidden">
          <TopNavBar />
          <div className="h-full flex flex-col">
            <div className="flex-grow flex items-center justify-center pb-16 sm:pb-0">
              <HeroSection />
            </div>
          </div>
        </div>
        <div className="relative z-10 bg-white">
          <CategoryBanner />
          <InfoSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;