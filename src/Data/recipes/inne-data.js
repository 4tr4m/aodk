export const Inne = [
  {
    id: 'inne-1',
    name: 'Sałatka grecka',
    category: 'INNE',
    shortDesc: 'Świeża sałatka grecka z oliwkami i serem feta.',
    fullDesc: 'Klasyczna sałatka grecka z ogórkiem, pomidorami, cebulą, oliwkami i serem feta. Idealna na letnie dni.',
    image: 'inne.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Pokrój warzywa, wymieszaj wszystkie składniki w misce i polej oliwą z oliwek. Posyp oregano.',
    ingredients: [
      '1 ogórek',
      '2 pomidory',
      '100g sera feta',
      '50g oliwek',
      '1 cebula',
      'Oliwa z oliwek',
      'Oregano'
    ].join('\n'),
    path: 'inne'
  },
  {
    id: 'inne-2',
    name: 'Zupa pomidorowa',
    category: 'INNE',
    shortDesc: 'Aromatyczna zupa pomidorowa z bazylią.',
    fullDesc: 'Zupa pomidorowa z dodatkiem świeżej bazylii i śmietany. Doskonała na chłodne dni.',
    image: 'inne.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Podsmaż cebulę, dodaj pomidory, bulion i gotuj przez 20 minut. Na koniec zmiksuj i dodaj śmietanę.',
    ingredients: [
      '400g pomidorów',
      '1 cebula',
      '500ml bulionu warzywnego',
      '1 łyżka śmietany',
      'Świeża bazylia'
    ].join('\n'),
    path: 'inne'
  },
  {
    id: 'inne-3',
    name: 'Smoothie owocowe',
    category: 'INNE',
    shortDesc: 'Orzeźwiające smoothie z mango i ananasem.',
    fullDesc: 'Smoothie pełne owoców tropikalnych, które dodaje energii na cały dzień.',
    image: 'inne.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Wszystkie składniki wrzuć do blendera i zmiksuj na gładką masę.',
    ingredients: [
      '1 mango',
      '1/2 ananasa',
      '100ml soku pomarańczowego',
      'Kilka kostek lodu'
    ].join('\n'),
    path: 'inne'
  },
]

export default Inne;
