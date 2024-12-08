// Previous products array remains the same
export const recipes = [
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
  },
  {
    id: 'smarowidlo-1',
    name: 'Pasta z awokado i czosnkiem',
    category: 'SMAROWIDŁA',
    shortDesc: 'Lekka pasta idealna do pieczywa.',
    fullDesc: 'Kremowa pasta z awokado, czosnku i soku z cytryny. Doskonała na śniadanie.',
    image: 'smarowidla.jpg',
    imageCredit: 'Caroline Attwood',
    preparation: 'Rozgnieć awokado widelcem. Dodaj przeciśnięty czosnek i sok z cytryny. Wymieszaj i dopraw do smaku.',
    ingredients: [
      '1 dojrzałe awokado',
      '1 ząbek czosnku',
      'Sok z 1/2 cytryny',
      'Sól, pieprz'
    ].join('\n'),
    path: 'smarowidla'
  },
  {
    id: 'smarowidlo-2',
    name: 'Hummus klasyczny',
    category: 'SMAROWIDŁA',
    shortDesc: 'Domowy hummus z ciecierzycy.',
    fullDesc: 'Aksamitny hummus z ciecierzycy, tahini i oliwy. Idealny do chleba i warzyw.',
    image: 'smarowidla.jpg',
    imageCredit: 'Caroline Attwood',
    preparation: 'Zmiksuj ciecierzycę, tahini, czosnek i sok z cytryny. Dodaj oliwę i dopraw do smaku.',
    ingredients: [
      '1 szklanka ugotowanej ciecierzycy',
      '2 łyżki tahini',
      'Sok z 1 cytryny',
      '2 łyżki oliwy z oliwek',
      '1 ząbek czosnku',
      'Sól, pieprz'
    ].join('\n'),
    path: 'smarowidla'
  },
  {
    id: 'deser-1',
    name: 'Mus czekoladowy z aquafabą',
    category: 'DESERY',
    shortDesc: 'Lekki, wegański mus czekoladowy.',
    fullDesc: 'Delikatny mus czekoladowy z aquafabą. Wegańska wersja klasycznego deseru.',
    image: 'desery.jpg',
    imageCredit: 'Hector Bermudez',
    preparation: 'Rozpuść czekoladę. Ubij aquafabę na sztywną pianę. Wymieszaj delikatnie z czekoladą i schłódź.',
    ingredients: [
      '100g czekolady gorzkiej',
      'Aquafaba z 1 puszki ciecierzycy',
      '1 łyżeczka cukru'
    ].join('\n'),
    path: 'desery'
  },
  {
    id: 'deser-2',
    name: 'Pudding chia z owocami',
    category: 'DESERY',
    shortDesc: 'Zdrowy deser na bazie nasion chia.',
    fullDesc: 'Lekki pudding chia z mlekiem kokosowym i owocami sezonowymi.',
    image: 'desery.jpg',
    imageCredit: 'Hector Bermudez',
    preparation: 'Wymieszaj nasiona chia z mlekiem. Odstaw na noc w lodówce. Podaj z owocami.',
    ingredients: [
      '3 łyżki nasion chia',
      '1 szklanka mleka kokosowego',
      'Owoce sezonowe'
    ].join('\n'),
    path: 'desery'
  },
  {
    id: 'babeczka-1',
    name: 'Babeczki cytrynowe z makiem',
    category: 'BABECZKI i MUFFINY',
    shortDesc: 'Delikatne babeczki o cytrynowym smaku.',
    fullDesc: 'Pyszne babeczki z nutą cytryny i dodatkiem maku. Idealne na każdą okazję.',
    image: 'babeczki.jpg',
    imageCredit: 'Fausto Marques',
    preparation: 'Wymieszaj składniki suche i mokre. Połącz delikatnie i przełóż do foremek. Piecz w 180°C przez 20 minut.',
    ingredients: [
      '200g mąki bezglutenowej',
      '100g cukru',
      '2 jajka',
      '100ml oleju',
      'Sok i skórka z 1 cytryny',
      '2 łyżki maku'
    ].join('\n'),
    path: 'babeczki-muffiny'
  },
  {
    id: 'babeczka-2',
    name: 'Muffiny czekoladowe z bananem',
    category: 'BABECZKI i MUFFINY',
    shortDesc: 'Czekoladowa rozkosz z kawałkami banana.',
    fullDesc: 'Puszyste muffiny z gorzką czekoladą i bananami. Szybkie i łatwe w przygotowaniu.',
    image: 'babeczki.jpg',
    imageCredit: 'Fausto Marques',
    preparation: 'Wymieszaj wszystkie składniki, przełóż do foremek i piecz w 180°C przez 25 minut.',
    ingredients: [
      '150g mąki',
      '50g kakao',
      '2 banany',
      '1 łyżeczka proszku do pieczenia',
      '100g cukru',
      '50ml oleju'
    ].join('\n'),
    path: 'babeczki-muffiny'
  },
  {
    id: 'ciasto-1',
    name: 'Sernik jaglany z malinami',
    category: 'CIASTA',
    shortDesc: 'Zdrowy sernik na bazie kaszy jaglanej.',
    fullDesc: 'Aromatyczny sernik bez sera, z kaszą jaglaną i malinami. Bez glutenu i nabiału.',
    image: 'ciasta.jpg',
    imageCredit: 'Lindsay Cotter',
    preparation: 'Ugotuj kaszę jaglaną, zblenduj z mlekiem i miodem. Wyłóż na spód, dodaj maliny i piecz 40 minut w 180°C.',
    ingredients: [
      '200g kaszy jaglanej',
      '500ml mleka roślinnego',
      '100g miodu',
      '1 szklanka malin',
      'Spód: 100g orzechów, 50g daktyli'
    ].join('\n'),
    path: 'ciasta'
  },
  {
    id: 'ciasto-2',
    name: 'Brownie z fasoli',
    category: 'CIASTA',
    shortDesc: 'Wilgotne ciasto czekoladowe z fasoli.',
    fullDesc: 'Zdrowe brownie, które smakuje jak klasyczne, ale jest zrobione z czarnej fasoli.',
    image: 'ciasta.jpg',
    imageCredit: 'Lindsay Cotter',
    preparation: 'Zmiksuj fasolę z pozostałymi składnikami. Przełóż do formy i piecz 30 minut w 180°C.',
    ingredients: [
      '400g ugotowanej fasoli',
      '3 jajka',
      '50g kakao',
      '100g cukru',
      '50ml oleju kokosowego'
    ].join('\n'),
    path: 'ciasta'
  },
  {
    id: 'ciastko-1',
    name: 'Ciasteczka owsiane z żurawiną',
    category: 'CIASTKA',
    shortDesc: 'Chrupiące ciasteczka idealne na przekąskę.',
    fullDesc: 'Proste ciasteczka owsiane z żurawiną i nutą cynamonu. Zdrowa alternatywa na słodko.',
    image: 'ciastka.jpg',
    imageCredit: 'Rai Vidanes',
    preparation: 'Wymieszaj wszystkie składniki, formuj ciasteczka i piecz w 180°C przez 15 minut.',
    ingredients: [
      '2 szklanki płatków owsianych',
      '1/2 szklanki suszonej żurawiny',
      '2 jajka',
      '1/4 szklanki miodu',
      '1 łyżeczka cynamonu'
    ].join('\n'),
    path: 'ciastka'
  },
  {
    id: 'ciastko-2',
    name: 'Ciastka kokosowe',
    category: 'CIASTKA',
    shortDesc: 'Delikatne ciastka z wiórkami kokosowymi.',
    fullDesc: 'Aromatyczne, lekkie ciasteczka z kokosem. Idealne do kawy lub herbaty.',
    image: 'ciastka.jpg',
    imageCredit: 'Rai Vidanes',
    preparation: 'Zmieszaj wiórki kokosowe z jajkami i miodem. Formuj ciasteczka i piecz w 180°C przez 10 minut.',
    ingredients: [
      '200g wiórków kokosowych',
      '2 jajka',
      '3 łyżki miodu'
    ].join('\n'),
    path: 'ciastka'
  },
  {
    id: 'smoothie-1',
    name: 'Smoothie mango-banan',
    category: 'SMOOTHIE',
    shortDesc: 'Egzotyczny koktajl owocowy.',
    fullDesc: 'Kremowe smoothie z mango, bananem i mlekiem kokosowym. Idealne na orzeźwienie.',
    image: 'smoothie.jpg',
    imageCredit: '',
    preparation: 'Zblenduj mango, banana i mleko kokosowe. Podaj schłodzone.',
    ingredients: [
      '1 mango',
      '1 banan',
      '1 szklanka mleka kokosowego'
    ].join('\n'),
    path: 'smoothie'
  },
  {
    id: 'smoothie-2',
    name: 'Smoothie truskawkowo-szpinakowe',
    category: 'SMOOTHIE',
    shortDesc: 'Zdrowe i pyszne smoothie z truskawek i szpinaku.',
    fullDesc: 'Łączy w sobie słodycz truskawek i wartości odżywcze szpinaku. Idealne na szybkie śniadanie.',
    image: 'smoothie.jpg',
    imageCredit: '',
    preparation: 'Zmiksuj truskawki, szpinak i mleko migdałowe na gładko.',
    ingredients: [
      '1 szklanka truskawek',
      '1 garść szpinaku',
      '1 szklanka mleka migdałowego'
    ].join('\n'),
    path: 'smoothie'
  },
  {
    id: 'swieta-1',
    name: 'Pierogi z kapustą i grzybami',
    category: 'ŚWIĘTA',
    shortDesc: 'Klasyczne pierogi na Wigilię.',
    fullDesc: 'Tradycyjne pierogi wigilijne z farszem z kapusty kiszonej i suszonych grzybów.',
    image: 'swieta.jpg',
    imageCredit: '',
    preparation: 'Przygotuj farsz z kapusty i grzybów. Zagnieć ciasto, wypełnij farszem i ugotuj w osolonej wodzie.',
    ingredients: [
      '500g kapusty kiszonej',
      '100g suszonych grzybów',
      '500g mąki',
      '1 jajko',
      'Sól'
    ].join('\n'),
    path: 'swieta'
  },
  {
    id: 'swieta-2',
    name: 'Makowiec bezglutenowy',
    category: 'ŚWIĘTA',
    shortDesc: 'Świąteczny makowiec na bazie mąki bezglutenowej.',
    fullDesc: 'Delikatny i aromatyczny makowiec, idealny na Boże Narodzenie.',
    image: 'swieta.jpg',
    imageCredit: '',
    preparation: 'Przygotuj ciasto drożdżowe bezglutenowe. Nałóż masę makową, zwiń i piecz w 180°C przez 40 minut.',
    ingredients: [
      '300g mąki bezglutenowej',
      '100g masy makowej',
      '2 jajka',
      '50g cukru',
      '7g drożdży'
    ].join('\n'),
    path: 'swieta'
  },
  // Additional recipes for ZUPY
{
  id: 'zupa-3',
  name: 'Zupa pomidorowa z ryżem',
  category: 'ZUPY',
  shortDesc: 'Klasyczna zupa pomidorowa.',
  fullDesc: 'Zupa pomidorowa z dodatkiem ryżu, idealna na rodzinny obiad.',
  image: 'zupy.jpg',
  imageCredit: 'Nick Fewings',
  preparation: 'Podsmaż cebulę, dodaj przecier pomidorowy i bulion. Gotuj 20 minut. Na koniec dodaj ugotowany ryż.',
  ingredients: [
    '1 l bulionu warzywnego',
    '400 ml przecieru pomidorowego',
    '1 cebula',
    '100 g ryżu',
    'Sól, pieprz, bazylia'
  ].join('\n'),
  path: 'zupy'
},
{
  id: 'zupa-4',
  name: 'Żurek z kiełbasą',
  category: 'ZUPY',
  shortDesc: 'Tradycyjna zupa na zakwasie.',
  fullDesc: 'Aromatyczny żurek z białą kiełbasą i jajkiem, serwowany na święta i nie tylko.',
  image: 'zupy.jpg',
  imageCredit: 'Nick Fewings',
  preparation: 'Gotuj bulion z warzyw, dodaj zakwas i kiełbasę. Dopraw i podawaj z jajkiem.',
  ingredients: [
    '1 l bulionu',
    '200 ml zakwasu',
    '2 białe kiełbasy',
    '2 jajka',
    'Marchew, cebula, czosnek'
  ].join('\n'),
  path: 'zupy'
},
{
  id: 'zupa-5',
  name: 'Zupa krem z brokułów',
  category: 'ZUPY',
  shortDesc: 'Lekka i zdrowa zupa brokułowa.',
  fullDesc: 'Kremowa zupa z brokułów z dodatkiem ziemniaków i śmietanki roślinnej.',
  image: 'zupy.jpg',
  imageCredit: 'Nick Fewings',
  preparation: 'Gotuj brokuły i ziemniaki w bulionie. Zblenduj i dodaj śmietankę.',
  ingredients: [
    '1 brokuł',
    '2 ziemniaki',
    '1 l bulionu',
    '100 ml śmietanki roślinnej',
    'Sól, pieprz, gałka muszkatołowa'
  ].join('\n'),
  path: 'zupy'
},
{
  id: 'zupa-6',
  name: 'Zupa cebulowa',
  category: 'ZUPY',
  shortDesc: 'Francuska zupa z karmelizowaną cebulą.',
  fullDesc: 'Delikatna zupa cebulowa zapiekana z grzankami i serem.',
  image: 'zupy.jpg',
  imageCredit: 'Nick Fewings',
  preparation: 'Podsmaż cebulę na maśle, dodaj bulion i gotuj 30 minut. Serwuj z grzankami.',
  ingredients: [
    '4 cebule',
    '1 l bulionu wołowego',
    '1 łyżka masła',
    'Grzanki, ser żółty',
    'Sól, pieprz'
  ].join('\n'),
  path: 'zupy'
},
{
  id: 'zupa-7',
  name: 'Zupa ogórkowa',
  category: 'ZUPY',
  shortDesc: 'Kwaśna i orzeźwiająca zupa z ogórków kiszonych.',
  fullDesc: 'Tradycyjna polska zupa na bazie ogórków kiszonych i warzyw.',
  image: 'zupy.jpg',
  imageCredit: 'Nick Fewings',
  preparation: 'Dodaj starte ogórki kiszone do bulionu z ziemniakami i warzywami. Gotuj do miękkości.',
  ingredients: [
    '1 l bulionu',
    '4 ogórki kiszone',
    '2 ziemniaki',
    'Marchew, pietruszka',
    'Śmietanka roślinna'
  ].join('\n'),
  path: 'zupy'
},

// Additional recipes for CHLEBY
{
  id: 'chleb-3',
  name: 'Chleb orkiszowy na drożdżach',
  category: 'CHLEBY',
  shortDesc: 'Chleb z mąki orkiszowej, miękki i zdrowy.',
  fullDesc: 'Łatwy w przygotowaniu chleb orkiszowy, idealny na codzienne kanapki.',
  image: 'chleby.jpg',
  imageCredit: 'Bon Vivant',
  preparation: 'Wymieszaj mąkę orkiszową z drożdżami i wodą. Odstaw na godzinę do wyrośnięcia. Piecz w 200°C przez 40 minut.',
  ingredients: [
    '500g mąki orkiszowej',
    '300ml wody',
    '10g drożdży',
    '1 łyżeczka soli'
  ].join('\n'),
  path: 'chleby'
},
{
  id: 'chleb-4',
  name: 'Chleb pszenny z ziarnami',
  category: 'CHLEBY',
  shortDesc: 'Chleb pszenny z dodatkiem nasion.',
  fullDesc: 'Puszysty chleb pszenny z nasionami słonecznika i siemienia lnianego.',
  image: 'chleby.jpg',
  imageCredit: 'Bon Vivant',
  preparation: 'Wyrób ciasto z mąki, drożdży, wody i nasion. Piecz w 200°C przez 30 minut.',
  ingredients: [
    '500g mąki pszennej',
    '300ml wody',
    '10g drożdży',
    '50g nasion słonecznika',
    '50g siemienia lnianego'
  ].join('\n'),
  path: 'chleby'
},
{
  id: 'chleb-5',
  name: 'Chleb kukurydziany',
  category: 'CHLEBY',
  shortDesc: 'Chleb z mąki kukurydzianej.',
  fullDesc: 'Delikatny chleb kukurydziany, świetny do śniadania.',
  image: 'chleby.jpg',
  imageCredit: 'Bon Vivant',
  preparation: 'Wymieszaj mąkę kukurydzianą z wodą i drożdżami. Piecz w 180°C przez 40 minut.',
  ingredients: [
    '400g mąki kukurydzianej',
    '100g mąki pszennej',
    '10g drożdży',
    '300ml wody',
    '1 łyżeczka soli'
  ].join('\n'),
  path: 'chleby'
},
{
  id: 'chleb-6',
  name: 'Chleb razowy z miodem',
  category: 'CHLEBY',
  shortDesc: 'Chleb z mąki razowej z nutą miodu.',
  fullDesc: 'Zdrowy i lekko słodki chleb razowy, doskonały na śniadanie.',
  image: 'chleby.jpg',
  imageCredit: 'Bon Vivant',
  preparation: 'Wyrób ciasto z mąki razowej, drożdży, wody i miodu. Piecz w 180°C przez 40 minut.',
  ingredients: [
    '400g mąki razowej',
    '10g drożdży',
    '1 łyżka miodu',
    '300ml wody',
    '1 łyżeczka soli'
  ].join('\n'),
  path: 'chleby'
},
{
  id: 'chleb-7',
  name: 'Bagietka francuska',
  category: 'CHLEBY',
  shortDesc: 'Klasyczna bagietka z chrupiącą skórką.',
  fullDesc: 'Tradycyjna bagietka francuska, idealna do kanapek.',
  image: 'chleby.jpg',
  imageCredit: 'Bon Vivant',
  preparation: 'Przygotuj ciasto z mąki, drożdży i wody. Formuj bagietki i piecz w 220°C przez 25 minut.',
  ingredients: [
    '500g mąki pszennej',
    '300ml wody',
    '10g drożdży',
    '1 łyżeczka soli'
  ].join('\n'),
  path: 'chleby'
}

];

// Previous products export remains the same
export default recipes;