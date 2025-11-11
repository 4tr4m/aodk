# Analiza SEO - Autyzm od Kuchni

## 📊 Obecne słowa kluczowe w kodzie

### 1. Strona główna (HomePage)
**Title:** "Autyzm od Kuchni - Dieta eliminacyjna bez glutenu, nabiału i cukru"

**Keywords:**
- autyzm
- dieta eliminacyjna
- dieta w autyzmie
- bez glutenu
- bez nabiału
- bez cukru
- przepisy
- zaburzenia neurorozwojowe
- GAPS
- zdrowe odżywianie

**Description:** "Odkryj jak dieta eliminacyjna bez glutenu, nabiału i cukru może wspierać funkcjonowanie osób z autyzmem i zaburzeniami neurorozwojowymi."

---

### 2. Strony przepisów (RecipePage)
**Title:** `{recipe.name} - Autyzm od kuchni`

**Description:** `{recipe.shortdesc}` (używa krótkiego opisu przepisu)

**Keywords:** Domyślne z komponentu SEO (brak dedykowanych dla przepisów)

**Problem:** Strony przepisów nie mają dedykowanych słów kluczowych - używają domyślnych.

---

### 3. Strony kategorii (CategoryPage)
**Title:** `{category.label} - Przepisy | Autyzm od Kuchni`

**Keywords:** 
- `{category.label}`
- przepisy
- dieta eliminacyjna
- bez glutenu
- bez nabiału
- bez cukru
- autyzm
- zaburzenia neurorozwojowe

**Przykłady kategorii:**
- OBIADY
- ZUPY
- DESERY
- SNAKI
- SMOOTHIE
- SAŁATKI/SUROWKI

---

### 4. Blog
**Title:** "Blog - Autyzm od Kuchni | Wiedza o diecie eliminacyjnej w autyzmie"

**Keywords:**
- blog o autyzmie
- dieta w autyzmie
- blog dieta eliminacyjna
- porady
- autyzm a dieta
- dieta bezglutenowa
- zaburzenia neurorozwojowe

---

### 5. Znajdki
**Title:** "Znajdki - Autyzm od Kuchni | Polecane produkty bezglutenowe i dietetyczne"

**Keywords:**
- zdrowa żywność
- produkty bezglutenowe
- bez nabiału
- bez cukru
- dieta eliminacyjna
- autyzm
- produkty polecane

---

### 6. Historia O Mnie
**Keywords:**
- autyzm
- dieta eliminacyjna
- zdrowe gotowanie
- bezglutenowe
- bez nabiału
- bez cukru

---

### 7. Historia O Autyzmie
**Keywords:**
- autyzm
- spektrum autyzmu
- dieta przy autyzmie
- rozwój dziecka z autyzmem

---

## 🔍 Słowa kluczowe, które prawdopodobnie wyskakują w Google

### Główne frazy (na podstawie obecnych meta tagów):
1. **"autyzm dieta"** / **"dieta w autyzmie"**
2. **"dieta eliminacyjna autyzm"**
3. **"przepisy bez glutenu autyzm"**
4. **"dieta bezglutenowa autyzm"**
5. **"bez glutenu bez nabiału przepisy"**
6. **"przepisy dla autyzmu"**
7. **"GAPS dieta"**
8. **"zaburzenia neurorozwojowe dieta"**

### Frazy długiego ogona (long-tail):
- "dieta eliminacyjna bez glutenu nabiału cukru"
- "przepisy bezglutenowe dla dzieci z autyzmem"
- "zdrowe odżywianie autyzm"
- "dieta wspierająca autyzm"
- "produkty bezglutenowe polecane"
- "blog o diecie w autyzmie"

---

## ⚠️ Problemy i braki w SEO

### 1. **Brak dedykowanych słów kluczowych dla przepisów**
- Strony przepisów używają tylko `recipe.shortdesc` jako description
- Brak dedykowanych keywords dla konkretnych przepisów
- Każdy przepis powinien mieć unikalne słowa kluczowe

### 2. **Brak strukturyzowanych danych Schema.org dla przepisów**
- Obecny jest tylko Schema dla Organization
- Brak Schema.org Recipe (ważne dla Google Recipes)
- Brak BreadcrumbList dla lepszej nawigacji

### 3. **Brak alternatywnych wariantów słów kluczowych**
- Nie ma wariantów: "bezglutenowe", "bezmleczne", "bez cukru"
- Brak synonimów: "spektrum autyzmu", "ASD", "zaburzenia ze spektrum autyzmu"

### 4. **Ograniczone słowa kluczowe lokalne**
- Brak fraz typu: "przepisy polskie", "polska dieta eliminacyjna"
- Brak geolokalizacji (jeśli dotyczy)

### 5. **Brak optymalizacji dla pytań (voice search)**
- Brak fraz typu: "jak gotować dla dziecka z autyzmem"
- "co jeść przy autyzmie"
- "jakie przepisy dla autyzmu"

---

## ✅ Rekomendacje poprawy SEO

### 1. **Dodaj dedykowane keywords dla przepisów**
```jsx
// W RecipePage.jsx
<SEO 
  title={`${recipe.name} - Autyzm od kuchni`}
  description={recipe.shortdesc}
  keywords={`${recipe.name}, przepis bez glutenu, przepis bez nabiału, przepis bez cukru, ${recipe.category?.toLowerCase()}, dieta eliminacyjna, autyzm, przepisy dla autyzmu`}
  image={recipe.image}
  url={window.location.href}
/>
```

### 2. **Dodaj Schema.org Recipe**
Dodaj strukturyzowane dane dla przepisów - to zwiększy szanse na wyświetlanie w Google Recipes:
```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "Nazwa przepisu",
  "description": "Opis",
  "image": "URL obrazu",
  "recipeCategory": "Kategoria",
  "recipeIngredient": ["składnik1", "składnik2"],
  "recipeInstructions": {...}
}
```

### 3. **Rozszerz słowa kluczowe o warianty**
- "bezglutenowe przepisy" (obok "bez glutenu")
- "bezmleczne dania" (obok "bez nabiału")
- "przepisy bez cukru" (obok "bez cukru")
- "spektrum autyzmu" (obok "autyzm")
- "ASD dieta" (dla angielskich wyszukiwań)

### 4. **Dodaj frazy pytające (voice search)**
- "jak gotować dla dziecka z autyzmem"
- "co jeść przy autyzmie"
- "jakie przepisy dla autyzmu"
- "dieta eliminacyjna jak zacząć"

### 5. **Optymalizuj tytuły przepisów**
Zamiast: `{recipe.name} - Autyzm od kuchni`
Lepiej: `{recipe.name} - Przepis bez glutenu, nabiału i cukru | Autyzm od Kuchni`

### 6. **Dodaj BreadcrumbList Schema**
Pomaga Google zrozumieć strukturę strony:
```
Strona główna > Kuchnia > {Kategoria} > {Przepis}
```

### 7. **Rozszerz description dla przepisów**
Zamiast tylko `shortdesc`, dodaj więcej kontekstu:
```
"{shortdesc} Przepis bez glutenu, nabiału i cukru idealny dla osób z autyzmem. {dodatkowe info}"
```

---

## 📈 Potencjalne nowe słowa kluczowe do rozważenia

### Wysokie potencjał:
1. **"dieta GAPS autyzm"** - już masz GAPS w keywords
2. **"przepisy eliminacyjne"** - krótsza wersja
3. **"dieta bezglutenowa dla dzieci"** - bardziej specyficzne
4. **"zdrowe przepisy autyzm"** - pozytywny ton
5. **"przepisy wspierające autyzm"** - empatyczne podejście

### Średni potencjał:
1. **"dieta przeciwzapalna autyzm"**
2. **"przepisy bez alergenów"**
3. **"dieta wspomagająca rozwój"**
4. **"zdrowe gotowanie dla autyzmu"**

### Niski potencjał (ale warto rozważyć):
1. **"przepisy organiczne autyzm"**
2. **"dieta paleo autyzm"**
3. **"przepisy wegańskie autyzm"**

---

## 🎯 Priorytety działań SEO

### Wysoki priorytet (zrób teraz):
1. ✅ Dodać dedykowane keywords dla każdego przepisu
2. ✅ Dodać Schema.org Recipe dla przepisów
3. ✅ Poprawić tytuły przepisów (dodać "bez glutenu, nabiału i cukru")
4. ✅ Dodać BreadcrumbList Schema

### Średni priorytet (w ciągu miesiąca):
1. Rozszerzyć description dla przepisów
2. Dodać warianty słów kluczowych
3. Dodać frazy pytające

### Niski priorytet (długoterminowo):
1. Optymalizacja dla voice search
2. Lokalne SEO (jeśli dotyczy)
3. Rozszerzenie o nowe kategorie słów kluczowych

---

## 📝 Podsumowanie

**Obecne słowa kluczowe w Google Search (prawdopodobnie):**
- autyzm dieta
- dieta eliminacyjna
- przepisy bez glutenu
- dieta bezglutenowa autyzm
- przepisy dla autyzmu
- GAPS dieta
- bez glutenu bez nabiału

**Główne problemy:**
- Brak dedykowanych keywords dla przepisów
- Brak Schema.org Recipe
- Ograniczone warianty słów kluczowych

**Następne kroki:**
1. Dodać keywords do RecipePage
2. Zaimplementować Schema.org Recipe
3. Rozszerzyć tytuły i opisy

