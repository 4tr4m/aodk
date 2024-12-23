export const Zupy = [
  {
    id: 'zupa-1',
    name: 'Zupa krem z dyni',
    category: 'ZUPE',
    shortDesc: 'Delikatna zupa krem z dyni z dodatkiem imbiru.',
    fullDesc: 'Zupa krem z dyni to pyszna i sycąca potrawa, która rozgrzeje w chłodne dni. Z dodatkiem imbiru nadaje się idealnie na jesień.',
    image: 'zupy.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Pokrój dynię, cebulę i czosnek. Podsmaż je, a następnie dodaj bulion i gotuj do miękkości. Zmiksuj na krem.',
    ingredients: [
      '500g dyni',
      '1 cebula',
      '2 ząbki czosnku',
      '1 łyżeczka imbiru',
      '500ml bulionu warzywnego',
      'Sól, pieprz do smaku'
    ].join('\n'),
    path: 'zupy'
  },
  {
    id: 'zupa-2',
    name: 'Zupa pomidorowa',
    category: 'ZUPE',
    shortDesc: 'Aromatyczna zupa pomidorowa z makaronem.',
    fullDesc: 'Zupa pomidorowa to klasyka, którą każdy zna i uwielbia. Dodatek świeżych pomidorów sprawia, że smak jest intensywniejszy.',
    image: 'zupy.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Podsmaż cebulę i czosnek, dodaj pomidory, a następnie gotuj z bulionem. Dodaj makaron i gotuj jeszcze przez 10 minut.',
    ingredients: [
      '400g pomidorów',
      '1 cebula',
      '2 ząbki czosnku',
      '500ml bulionu warzywnego',
      '100g makaronu',
      'Sól, pieprz do smaku'
    ].join('\n'),
    path: 'zupy'
  },
  {
    id: 'zupa-3',
    name: 'Krem z brokułów',
    category: 'ZUPE',
    shortDesc: 'Zupa krem z brokułów z dodatkiem ziemniaków.',
    fullDesc: 'Krem z brokułów to zdrowa i pożywna zupa, którą można podać z grzankami lub odrobiną śmietany.',
    image: 'zupy.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Ugotuj brokuły z ziemniakami i cebulą, a następnie zmiksuj na gładki krem. Dopraw do smaku.',
    ingredients: [
      '500g brokułów',
      '2 ziemniaki',
      '1 cebula',
      '500ml bulionu warzywnego',
      'Sól, pieprz do smaku',
      'Śmietana do podania (opcjonalnie)'
    ].join('\n'),
    path: 'zupy'
  },
]

export default Zupy;
