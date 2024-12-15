import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoSection.css';
import LinkSection from './LinkSection';

const InfoSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/category');
    window.scrollTo(0, 0);
  };

  return (
    <section className="info-container">
      <header className="header-section">
        <div className="logo-container">
          <img src="/img/logo.jpg" alt="Viking Nordic Health Logo" className="logo" />
        </div>
        <div className="title-container">
          <h1>Suplementy Diety</h1>
          <h2>VIKING Nordic Health</h2>
        </div>
      </header>

      <div className="content-section">
        <p className="text-content">
          Kwasy omega-3, witaminy i minerały to składniki odżywcze, na których niedobór cierpi wielu z nas. 
          Przez ostatnie 100 lat żywność na świecie uległa drastycznemu pogorszeniu, jest wysoko przetworzona 
          oraz nafaszerowana chemią. Coraz częściej dochodzi też do sztucznego zwiększania masy produktów 
          mięsnych w celu obniżenia kosztów ich produkcji. W wyniku tych procesów 
          <strong>dzisiejsza żywność jest pozbawiona wielu składników odżywczych</strong>, 
          co przyczynia się do drastycznego wzrostu zachorowań na przestrzeni ostatnich kilkunastu lat.
        </p>

        <p className="text-content">
          Doskonale zdajemy sobie sprawę, że wysiłek fizyczny, dieta oraz odpowiednie uzupełnienie składników 
          odżywczych są kluczowymi czynnikami dla naszego zdrowia. Dlatego 
          <strong>Viking postanowił wyjść naprzeciw dzisiejszym problemom żywieniowym</strong> i oferuje 
          suplementy diety zawierające: kwasy omega-3 6 9, kwasy DHA, EPA oraz wiele witamin i minerałów.
        </p>

        <h3 className="section-title">Dlaczego Viking?</h3>

        <p className="text-content">
          Tworząc nasz sklep z suplementami, <strong>inspirowaliśmy się legendarnymi wojownikami ze 
          Skandynawii</strong>, którzy znani byli ze swojej siły i wytrzymalości. Cechy te zawdzięczali 
          diecie składającej się z morskich ryb, bogatych w kwasy omega i witaminy. Wzorujemy się na tych 
          dzielnych bohaterach i dlatego <strong>oferujemy Ci produkty, które uzupełnią Twoją dietę w ważne 
          składniki odżywcze</strong>. Dzięki nim podołasz każdemu zadaniu, a nowy dzień będzie okazją do 
          kolejnych wyzwań.
        </p>
      </div>

      <div className="additional-content">
        <h3 className="section-title">Viking Nordic Health dla każdego</h3>
        <p className="text-content">
          Suplementy diety w naszym sklepie to <strong>doskonały wybór dla każdego</strong>. Jeśli więc 
          dbasz o zdrowie swoje i Twoich bliskich, zapoznaj się z naszą ofertą! Znajdziesz u nas rozwiązanie 
          licznych problemów żywieniowych. Posiadamy: suplementy na koncentrację, zwiększające odporność 
          i wpływające na prawidłową pracę serca, mózgu i układu krwionośnego. Produkty Zinzino to korzystna 
          cena i pewny efekt.
        </p>
        
        <button onClick={handleClick} className="cta-button">
          Zobacz więcej
        </button>
      </div>

      <LinkSection />
    </section>
  );
};

export default InfoSection;