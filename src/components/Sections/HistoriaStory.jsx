import React from 'react';
import { motion } from 'framer-motion';

const HistoriaStory = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="bg-white p-8 rounded-2xl shadow-lg prose prose-lg max-w-none mb-16"
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
  );
};

export default HistoriaStory; 