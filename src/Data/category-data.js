// src/data/category-data.js
export const kuchniaCategories = {
  mainCategories: [
    {
      link: '/kuchnia/obiady',
      label: 'OBIADY',
      shortDesc: 'Proste, smaczne i odżywcze obiady',
      image: 'obiady.jpg',
      imageCredit: 'Davor Nisevic'
    },
    {
      link: '/kuchnia/zupy',
      label: 'ZUPY',
      shortDesc: 'Bazujące na bulionie, pyszne, bez smażenia',
      image: 'zupy.jpg',
      imageCredit: 'Nick Fewings'
    },
    {
      link: '/kuchnia/chleby',
      label: 'CHLEBY',
      shortDesc: 'Jak prawdziwe, bez glutenu',
      image: 'chleby.jpg',
      imageCredit: 'Bon Vivant'
    },
    {
      link: '/kuchnia/smarowidla',
      label: 'SMAROWIDŁA',
      shortDesc: 'Do chleba i nie tylko',
      image: 'smarowidla.jpg',
      imageCredit: 'Caroline Attwood'
    },
    {
      link: '/kuchnia/desery',
      label: 'DESERY',
      shortDesc: 'Deser, a może drugie śniadanie',
      image: 'desery.jpg',
      imageCredit: 'Hector Bermudez'
    },
    {
      link: '/kuchnia/babeczki-muffiny',
      label: 'BABECZKI i MUFFINY',
      shortDesc: 'Warto mieć pod ręką na wynos',
      image: 'babeczki.jpg',
      imageCredit: 'Fausto Marques'
    },
    {
      link: '/kuchnia/ciasta',
      label: 'CIASTA',
      shortDesc: 'Bez glutenu i bez nabiału krowiego',
      image: 'ciasta.jpg',
      imageCredit: 'Lindsay Cotter'
    },
    {
      link: '/kuchnia/ciastka',
      label: 'CIASTKA',
      shortDesc: 'Bez glutenu, bez masła i bez margaryny',
      image: 'ciastka.jpg',
      imageCredit: 'Rai Vidanes'
    },
    {
      link: '/kuchnia/smoothie',
      label: 'SMOOTHIE',
      shortDesc: 'Naturalne koktajle owocowe',
      image: 'smoothie.jpg',
      imageCredit: ''
    },
    {
      link: '/kuchnia/inne',
      label: 'INNE',
      shortDesc: 'Pozostałe przepisy',
      image: 'inne.jpg',
      imageCredit: ''
    },
    {
      link: '/kuchnia/swieta',
      label: 'ŚWIĘTA',
      shortDesc: 'Dania na specjalne okazje',
      image: 'swieta.jpg',
      imageCredit: ''
    }
  ],
  displayGroups: {
    firstRow: ['OBIADY', 'ZUPY', 'CHLEBY', 'SMAROWIDŁA'],
    secondRow: ['DESERY', 'BABECZKI i MUFFINY', 'CIASTA', 'CIASTKA']
  }
};

export const skladnikCategories = [
  { link: '/skladnik/owoce', label: 'Owoce' },
  { link: '/skladnik/warzywa', label: 'Warzywa' },
];