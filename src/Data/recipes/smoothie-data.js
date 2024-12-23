export const Smoothie = [
  {
    id: 'smoothie-1',
    name: 'Smoothie truskawkowe',
    category: 'SMOOTHIE',
    shortDesc: 'Orzeźwiające smoothie truskawkowe z dodatkiem banana.',
    fullDesc: 'Smoothie truskawkowe z bananem to pyszne, zdrowe i pełne witamin połączenie, idealne na szybkie śniadanie lub przekąskę.',
    image: 'smoothie.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Zmiksuj wszystkie składniki do uzyskania gładkiej konsystencji. Podawaj schłodzone.',
    ingredients: [
      '200g truskawek',
      '1 banan',
      '200ml jogurtu naturalnego',
      'Kilka kostek lodu'
    ].join('\n'),
    path: 'smoothie'
  },
  {
    id: 'smoothie-2',
    name: 'Smoothie zielone',
    category: 'SMOOTHIE',
    shortDesc: 'Orzeźwiające smoothie z zielonych warzyw.',
    fullDesc: 'Zielone smoothie pełne witamin, idealne na detoks. Zawiera szpinak, jabłko i imbir, które oczyszczają organizm.',
    image: 'smoothie.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Zmiksuj wszystkie składniki w blenderze. Podawaj natychmiast po przygotowaniu.',
    ingredients: [
      '1 garść świeżego szpinaku',
      '1 jabłko',
      '1 cm kawałek imbiru',
      '200ml wody kokosowej',
      'Kilka kostek lodu'
    ].join('\n'),
    path: 'smoothie'
  },
  {
    id: 'smoothie-3',
    name: 'Smoothie tropikalne',
    category: 'SMOOTHIE',
    shortDesc: 'Soczyste smoothie tropikalne z mango i ananasem.',
    fullDesc: 'Smoothie tropikalne pełne egzotycznych owoców takich jak mango i ananas, które wprowadzą Cię w wakacyjny nastrój.',
    image: 'smoothie.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Zmiksuj owoce z sokiem pomarańczowym i podawaj z lodem.',
    ingredients: [
      '1 mango',
      '1/2 ananasa',
      '200ml soku pomarańczowego',
      'Kilka kostek lodu'
    ].join('\n'),
    path: 'smoothie'
  },
]

export default Smoothie;
