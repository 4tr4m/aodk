import React from 'react';
import { motion } from 'framer-motion';
import { FaBook } from 'react-icons/fa';

const HistoriaLiterature = () => {
  const recommendedBooks = [
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
      description: "Podchodzi do autyzmu oraz innych zaburzeń rozwojowych jako do problemów wielowymiarowych, gdzie dieta odgrywa kluczową rolę."
    },
    {
      title: "The Autism Revolution",
      author: "Dr. Mark Hyman",
      description: "Hyman, znany z promocji zdrowia przez dietę, oferuje holistyczne podejście do autyzmu, w którym zdrowie jelit i dieta są kluczowe."
    },
    {
      title: "Gut and Psychology Syndrome",
      author: "Dr. Natasha Campbell-McBride",
      description: "Wprowadza koncepcję GAPS, sugerując, że wiele zaburzeń neurologicznych, w tym autyzm, ma swoje korzenie w zdrowiu jelit."
    }
  ];

  return (
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
        {recommendedBooks.map((book, index) => (
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
  );
};

export default HistoriaLiterature; 