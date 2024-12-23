export const Ciasta = [
  {
    id: 'ciasto-1',
    name: 'Ciasto czekoladowe',
    category: 'CIASTA',
    shortDesc: 'Gęste, wilgotne ciasto czekoladowe z kawałkami czekolady.',
    fullDesc: 'Ciasto czekoladowe, które rozpływa się w ustach. Idealne dla miłośników intensywnego smaku czekolady.',
    image: 'ciasta.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Wymieszaj składniki, dodaj kawałki czekolady. Piecz w 180°C przez 35 minut.',
    ingredients: [
      '200g mąki pszennej',
      '100g cukru',
      '50g kakao',
      '3 jajka',
      '100g masła',
      '100g kawałków czekolady',
      '1 łyżeczka proszku do pieczenia',
      '100ml mleka'
    ].join('\n'),
    path: 'ciasta'
  },
  {
    id: 'ciasto-2',
    name: 'Sernik tradycyjny',
    category: 'CIASTA',
    shortDesc: 'Delikatny sernik z kruchego spodu, pełen kremowego nadzienia.',
    fullDesc: 'Sernik tradycyjny o gładkiej konsystencji i lekko cytrynowym smaku. Idealny na święta lub wyjątkowe okazje.',
    image: 'ciasta.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Połącz składniki na spód, a następnie przygotuj masę serową. Piecz w 160°C przez 50 minut.',
    ingredients: [
      '200g herbatników',
      '100g masła',
      '1kg twarogu sernikowego',
      '200g cukru',
      '4 jajka',
      '1 łyżeczka ekstraktu waniliowego',
      'Sok z 1 cytryny'
    ].join('\n'),
    path: 'ciasta'
  },
  {
    id: 'ciasto-3',
    name: 'Ciasto marchewkowe',
    category: 'CIASTA',
    shortDesc: 'Soczyste ciasto marchewkowe z orzechami i przyprawami.',
    fullDesc: 'Ciasto marchewkowe o delikatnej strukturze, pełne cynamonu i orzechów. Doskonałe na każdą porę roku.',
    image: 'ciasta.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Wymieszaj składniki, dodaj starte marchewki i orzechy. Piecz w 180°C przez 40 minut.',
    ingredients: [
      '200g mąki pszennej',
      '150g cukru',
      '2 jajka',
      '200g startej marchewki',
      '100g orzechów włoskich',
      '1 łyżeczka cynamonu',
      '1 łyżeczka proszku do pieczenia',
      '100ml oleju'
    ].join('\n'),
    path: 'ciasta'
  },
]

export default Ciasta;
