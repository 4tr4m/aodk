export const Obiady = [
  {
    id: 'obiad-1',
    name: 'Kurczak pieczony z warzywami',
    category: 'OBIADY',
    shortDesc: 'Soczysty kurczak z piekarnika z warzywami.',
    fullDesc: 'Prosty i zdrowy obiad – kurczak pieczony z marchewką, ziemniakami i ziołami. Doskonałe na każdą okazję.',
    image: 'obiady.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Obierz i pokrój warzywa. Natrzyj kurczaka przyprawami. Ułóż na blasze i piecz w 180°C przez 1,5 godziny.',
    ingredients: [
      '1 kurczak',
      '4 ziemniaki',
      '2 marchewki',
      'Oliwa z oliwek',
      'Przyprawy: sól, pieprz, papryka, zioła prowansalskie'
    ].join('\n'),
    path: 'obiady'
  },
  {
    id: 'obiad-2',
    name: 'Risotto z grzybami leśnymi',
    category: 'OBIADY',
    shortDesc: 'Kremowe risotto z aromatycznymi grzybami.',
    fullDesc: 'Delikatne risotto z ryżu arborio, grzybów leśnych i parmezanu. Idealne na elegancki obiad.',
    image: 'obiady.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Podsmaż cebulę i czosnek. Dodaj ryż i stopniowo wlewaj bulion. Na koniec wymieszaj z podsmażonymi grzybami.',
    ingredients: [
      '200g ryżu arborio',
      '300g grzybów leśnych',
      '1 cebula',
      'Bulion warzywny',
      'Parmezan',
      'Masło'
    ].join('\n'),
    path: 'obiady'
  }
];

export default Obiady;