export const Desery = [
  {
    id: 'deser-1',
    name: 'Tiramisu',
    category: 'DESERY',
    shortDesc: 'Klasyczne włoskie tiramisu z mascarpone i kawą.',
    fullDesc: 'Delikatne tiramisu, które łączy w sobie smak kawy, czekolady i mascarpone. Idealne na każdą okazję.',
    image: 'desery.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Wymieszaj mascarpone z jajkami i cukrem. Nasącz biszkopty kawą i układaj warstwami. Schłodź w lodówce przez 3 godziny.',
    ingredients: [
      '250g mascarpone',
      '200g biszkoptów',
      '100ml espresso',
      '2 jajka',
      '100g cukru',
      'Czekolada do dekoracji'
    ].join('\n'),
    path: 'desery'
  },
  {
    id: 'deser-2',
    name: 'Panna cotta waniliowa',
    category: 'DESERY',
    shortDesc: 'Kremowa panna cotta o intensywnym smaku wanilii.',
    fullDesc: 'Panna cotta z dodatkiem wanilii, która jest gładka i jedwabista w smaku. Doskonała na lekki deser.',
    image: 'desery.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Podgrzej śmietanę z cukrem i wanilią, dodaj żelatynę i dokładnie wymieszaj. Wlej do foremek i schłodź przez 4 godziny.',
    ingredients: [
      '500ml śmietany kremówki',
      '100g cukru',
      '1 laska wanilii',
      '10g żelatyny'
    ].join('\n'),
    path: 'desery'
  },
  {
    id: 'deser-3',
    name: 'Ciasto czekoladowe z truskawkami',
    category: 'DESERY',
    shortDesc: 'Pyszne ciasto czekoladowe z truskawkami i bitą śmietaną.',
    fullDesc: 'Ciasto czekoladowe z dodatkiem świeżych truskawek i lekkiej bitej śmietany. Idealne na letnie popołudnia.',
    image: 'desery.jpg',
    imageCredit: 'Davor Nisevic',
    preparation: 'Upiecz ciasto, a po ostudzeniu udekoruj truskawkami i bitą śmietaną.',
    ingredients: [
      '200g mąki pszennej',
      '100g cukru',
      '50g kakao',
      '2 jajka',
      '100g masła',
      '100g truskawek',
      '200ml śmietany kremówki'
    ].join('\n'),
    path: 'desery'
  },
]

export default Desery;
