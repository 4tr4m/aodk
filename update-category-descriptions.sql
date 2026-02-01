-- ============================================
-- Update existing category descriptions from category-data.js
-- This will OVERWRITE current descriptions with better ones
-- Run this in Supabase SQL Editor
-- ============================================

-- Update OBIADY (id: 1)
UPDATE categories 
SET 
  short_desc = 'Proste, smaczne i odżywcze obiady',
  description = 'Obiad to najważniejszy posiłek dnia, a w zabieganym tygodniu nie szukamy skomplikowanych dań. Raczej stawiamy na proste i szybkie rozwiązania, a takie właśnie jest zdrowe gotowanie. Chodzi o to, by posiłek był odżywczy, sezonowy i łatwy do przygotowania. Przepisy zawarte w tym dziale zostały stworzone tak, aby zapewnić nie tylko różnorodność składników odżywczych, ale także bogactwo smaków, dzięki czemu każdy posiłek staje się przyjemnością, która dostarcza energii na każdy dzień.'
WHERE id = 1;

-- Update ZUPY (id: 2)
UPDATE categories 
SET 
  short_desc = 'Bazujące na bulionie, pyszne, bez smażenia',
  description = 'Zupy to nie tylko podstawowy element polskiej kuchni, ale także jedna z najzdrowszych opcji w diecie. Doskonałe przez cały rok, zupy nie tylko nawadniają organizm, ale również dostarczają elektrolitów i wiele cennych substancji odżywczych w lekkiej, łatwo przyswajalnej formie. Większość przepisów w tym dziale opiera się na bulionie lub warzywnym wywarze, który pełen jest naturalnych składników o właściwościach przeciwzapalnych, takich jak goździki, lubczyk, kurkuma czy imbir. Taki wywar ma nie tylko działanie prozdrowotne, ale także rozgrzewa serce, dostarczając ciepła i komfortu zarówno ciału, jak i duszy.'
WHERE id = 2;

-- Update CHLEBY (id: 3)
UPDATE categories 
SET 
  short_desc = 'Jak prawdziwe, bez glutenu',
  description = 'Chleby są podstawą żywienia, jednak te bezglutenowe dostępne w popularnych sklepach często zawierają wątpliwe i zbędne dodatki. Od samego początku wiedziałam, że nie będą one dla mnie opcją, dlatego stworzyłam wypiek, który przypomina tradycyjny chleb z mąk glutenowych, zachowując przy tym wszystkie walory smakowe i odżywcze. Doskonale sprawdzają się tu nasiona, takie jak siemię lniane, sezam czy słonecznik, które nie tylko wzbogacają smak, ale również oferują szereg korzyści zdrowotnych. W tym dziale dzielę się moim autorskim przepisem na optymalną domową mieszankę na mąkę bezglutenową {LINK}. Chleb z tej mąki, szczególnie jeszcze ciepły po wypieczeniu, jest tak przepyszny, że nawet miłośnicy tradycyjnego chleba z glutenem zajadają go z przyjemnością.'
WHERE id = 3;

-- Update SMAROWIDLA (id: 4)
UPDATE categories 
SET 
  short_desc = 'Do chleba i nie tylko',
  description = 'Smarowidła to dla mnie świetna okazja, aby przemycić mojej rodzinie trochę warzyw i roślin strączkowych. Zauważyłam, że jeśli do kanapek dodamy szynkę czy ser, można pod nimi ukryć naprawdę sporo wartościowych składników, które w przeciwnym razie mogłyby zostać pominięte. To idealny sposób na wzbogacenie diety o błonnik, witaminy i minerały. Słodkie opcje są również znacznie zdrowsze niż gotowe sklepowe kremy, które często zawierają sztuczne dodatki i dużo cukru. Domowe smarowidła pozwalają na pełną kontrolę nad tym, co trafia na talerz, a także dają możliwość eksperymentowania z nowymi smakami i składnikami, co czyni je nie tylko zdrowym, ale i smacznym rozwiązaniem do każdego posiłku.'
WHERE id = 4;

-- Update BABECZKI i MUFFINY (id: 6)
UPDATE categories 
SET 
  short_desc = 'Warto mieć pod ręką na wynos',
  description = 'Babeczki i muffiny to must have, jeśli chodzi o jedzenie na wynos, tym bardziej, że są to opcje nie tylko zdrowe, ale i odżywcze. Większość przepisów polega na wrzuceniu składników do miski i zblendowaniu, co sprawia, że przygotowanie tych przekąsek jest szybkie i proste. Co ważne, mimo że te babeczki są bezglutenowe i pozbawione nabiału krowiego, wyglądają jak pszenne, glutenowe wypieki i często mogą mile zaskoczyć gości, dbających o dietę. To świetna alternatywa dla osób z nietolerancjami, która nie tylko zaspokaja apetyt na coś słodkiego, ale także dostarcza cennych składników odżywczych, nie rezygnując przy tym z tradycyjnej przyjemności jedzenia. Dodatkowo, dzięki wykorzystaniu naturalnych składników, można dostosować babeczki do różnych preferencji smakowych i dietetycznych, co sprawia, że są idealnym wyborem na każdą okazję.'
WHERE id = 6;

-- Update CIASTA (id: 7)
UPDATE categories 
SET 
  short_desc = 'Pyszne ciasta bez glutenu i nabiału',
  description = 'Ciasta to prawdziwa klasyka wypieków, która zawsze cieszy podniebienie. W wersji bezglutenowej i bez nabiału krowiego mogą być równie pyszne, pełne smaku i aromatu, jak te tradycyjne. W tym dziale dzielę się moim przepisem na <a href="/przepis/mieszanka-2" class="text-green-600 hover:text-green-700 underline">optymalną domową mieszankę na mąkę bezglutenową</a>, która stanowi doskonałą bazę do takich wypieków. Odpowiednia mieszanka mąk pozwala uzyskać idealną teksturę i smak, które zadowolą każdego, nawet jeśli nie stosuje diety bezglutenowej. Takie ciasta to świetna alternatywa dla osób z nietolerancjami, które nie muszą rezygnować z przyjemności spożywania wysokiej jakości słodkości. Co więcej, w tych ciastach nie znajdziesz żadnych dziwnych, potencjalnie szkodliwych składników ani dodatków, co sprawia, że są one w pełni naturalne i zdrowe. Dzięki odpowiednim składnikom, ciasta te są nie tylko pyszne, ale także pełne wartości odżywczych, co sprawia, że są doskonałym wyborem na każdą okazję.'
WHERE id = 7;

-- Update CIASTKA (id: 8)
UPDATE categories 
SET 
  short_desc = 'Bez glutenu, bez masła i bez margaryny',
  description = 'Ciastka to małe słodkości, które cieszą każdego. W wersji zdrowych alternatyw, pozbawione masła i margaryny, mogą być równie pyszne, a przy tym pełne wartości odżywczych. Dzięki odpowiednim składnikom, takie ciastka to doskonała opcja na szybką przekąskę, która nie tylko zaspokaja apetyt na coś słodkiego, ale również wspiera zdrowie. W pełni naturalne, bez sztucznych dodatków, zachwycają smakiem i konsystencją, stanowiąc idealną alternatywę dla tradycyjnych słodkości. Dodatkowo, są świetnym rozwiązaniem dla dzieci i dorosłych na diecie eliminacyjnej, pozwalając im cieszyć się smakiem "normalnych" ciastek, mimo ograniczeń dietetycznych.'
WHERE id = 8;

-- LUNCH (15) and ABC GOTOWANIA (16) - not in category-data.js
-- Add your own descriptions if needed

-- Verify updates - check which categories have been updated
SELECT 
  id,
  label,
  short_desc,
  CASE 
    WHEN description IS NULL THEN '❌ NO DESCRIPTION'
    WHEN LENGTH(description) < 100 THEN '⚠️ SHORT: ' || description
    ELSE '✅ UPDATED: ' || LEFT(description, 80) || '...'
  END as description_status,
  LENGTH(description) as char_count
FROM categories
ORDER BY id;

-- ============================================
-- DONE! All descriptions have been updated.
-- Categories 1, 2, 3, 4, 6, 7, 8 now have:
-- - Updated short_desc
-- - Updated description (long)
-- ============================================
