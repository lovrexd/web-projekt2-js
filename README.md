# Beefsteak Zadar

Web aplikacija izrađena u sklopu kolegija **Uvod u web tehnologije** na Sveučilištu u Zadru.

Stranica prikazuje fiktivni premium steakhouse restoran u Zadru — četiri stranice koje demonstriraju semantički HTML, pristupačnost (a11y), moderan CSS layout (Flexbox + Grid), responzivni dizajn, CSS-only hamburger izbornik te interaktivni jelovnik napisan u plain JavaScriptu (bez framework-a).

---

## Mapa stranica (sitemap)

```
Početna (index.html)
├── Hero sekcija
├── Izdvojena jela iz ponude
└── Footer s kontaktima

Jelovnik (pages/jelovnik.html)
├── Katalog jela (tablice po kategorijama)
├── Pretraga i filtriranje
├── Detalji stavke
└── Upravljanje favoritima

O nama (pages/o-nama.html)
├── Priča restorana
├── Dry-aging proces
└── Razlozi za posjet

Kontakt (pages/kontakt.html)
├── Kontakt forma (s validacijom)
├── Google Maps embed
└── Kontakt informacije
```

---

## Struktura projekta

```
/
├── index.html                  ← Početna stranica
├── pages/
│   ├── jelovnik.html           ← Interaktivni jelovnik (s JS interaktivnošću)
│   ├── o-nama.html             ← O restoranu
│   └── kontakt.html            ← Kontakt forma + mapa
├── styles/
│   ├── tokens.css              ← Design tokeni (boje, fontovi, tranzicije)
│   ├── base.css                ← Reset, osnovni stilovi, flex layout za footer
│   ├── layout.css              ← Header, footer, gridovi, hamburger nav
│   └── components.css          ← Gumbi, kartice, tablice, forme, hero, detalji
├── js/
│   ├── main.js                 ← Inicijalizacija + fetch + bootstrap
│   ├── data.js                 ← fetchMenu() + definicije kategorija
│   ├── state.js                ← Centralni state objekt, setState()/getState(), okida render
│   ├── ui.js                   ← renderMenu, renderStatus, renderView (list ↔ detail)
│   ├── events.js               ← Event listeneri (klik, search, filter, form, back)
│   └── storage.js              ← localStorage wrapper za favorite i zadnji filter
├── data/
│   └── jelovnik.json           ← Podaci o jelima (16 stavki, 6 kategorija)
├── assets/
│   ├── img/                    ← Slike (hero, jela, chef, ikone)
│   └── (favicon.png)
└── README.md
```

---

## Navigacijska mapa

Dijagram pokazuje kako su stranice međusobno povezane:

```
                    ┌──────────────┐
                    │   Početna    │
                    │  index.html  │
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼───────┐ ┌─────▼──────┐ ┌───────▼──────┐
   │   Jelovnik   │ │   O nama   │ │   Kontakt    │
   │jelovnik.html │ │ o-nama.html│ │ kontakt.html │
   └──────────────┘ └────────────┘ └──────────────┘
```

Svaka stranica ima globalnu navigaciju (header) i footer
s linkovima na sve ostale stranice → potpuno povezana mreža.

---

## Tehnologije

- **HTML5** — semantički elementi, pristupačnost (a11y)
- **CSS3** — custom properties, Flexbox, Grid, media queries
- **JavaScript (ES modules)** — bez framework-a, modularna arhitektura
- **Fetch API + async/await** — dohvat podataka iz `jelovnik.json`
- **localStorage** — persistencija favorita i zadnjeg filtera

---

## JavaScript arhitektura

Aplikacija je podijeljena na module s jasnom odgovornošću:

| Modul | Uloga |
|---|---|
| `main.js` | Orkestrator — bootstrap, init, fetch s error handlingom |
| `data.js` | `fetchMenu()` — dohvat iz `data/jelovnik.json` + definicije kategorija |
| `state.js` | Centralni state objekt, `setState()`/`getState()`, okida render |
| `ui.js` | `renderMenu`, `renderStatus`, `renderView` (list ↔ detail) |
| `events.js` | Klik na red, filter gumbi, search input, favoriti, back gumb, forma |
| `storage.js` | `localStorage` wrapper za favorite i posljednji filter |

Tok podataka je jednosmjeran:

```
korisnička akcija → event handler → setState() → render() → DOM
```

---

## Funkcionalnosti

- Filtriranje jelovnika po kategoriji (Predjela, Odresci, Glavna jela, Salate, Prilozi, Pića)
- Pretraga stavki po imenu (live search)
- Toggle favorita s perzistentnim localStorage
- List ↔ detail view (klik na red u tablici, back gumb za povratak)
- Loading, error i empty stanja za svaki scenarij
- Perzistencija zadnjeg odabranog filtera između posjeta
- Kontakt forma s validacijom i povratnom porukom (bez reload-a)
- Responzivni CSS-only hamburger izbornik
- Google Maps embed na stranici kontakta
- Sticky header s aktivnom navigacijom po stranici

---

## Podaci — `jelovnik.json`

JSON sadrži **16 stavki** u **6 kategorija**:

| Kategorija | Stavke |
|---|---|
| `predjela` | Domaća goveđa juha, Carpaccio od bifteka, Paški sir i pršut |
| `odresci` | Ribeye Steak (Dry-aged), T-Bone Steak, Fillet Mignon |
| `glavna` | Beef Burger, Janjeći kotleti |
| `salate` | Miješana sezonska, Rukola s cherry rajčicama, Šopska salata |
| `prilozi` | Domaći krumpirići, Povrće na žaru, Batat pomfrit |
| `pica` | Zinfandel (Crno vino), Craft pivo (Lokalno) |

Svaka stavka ima: `id`, `category`, `name`, `detail`, `price`, `image`.

---

## Status projekta

| Predavanje | Tema | Status |
|---|---|---|
| 1 | HTML struktura + sitemap | ✅ Gotovo |
| 2 | Navigacija + pristupačnost | ✅ Gotovo |
| 3 | Forme + tablice + mediji | ✅ Gotovo |
| 4 | CSS osnove: tipografija i razmaci | ✅ Gotovo |
| 5 | Layout: Flexbox i Grid | ✅ Gotovo |
| 6 | Responsive dizajn + hamburger | ✅ Gotovo |
| 7 | Uredan CSS, komponente i finalizacija | ✅ Gotovo |
| 8 | JavaScript osnove + DOM | ✅ Gotovo |
| 9 | DOM manipulacija + eventi + forme | ✅ Gotovo |
| 10 | State, moduli i localStorage | ✅ Gotovo |
| 11 | Async JS: fetch, loading, error | ✅ Gotovo |
| 12 | Routing-like UI, refactor, deploy | ✅ Gotovo |

---

## Pokretanje lokalno

Pošto aplikacija koristi ES modules i `fetch()` nad lokalnom JSON datotekom, mora se posluživati preko HTTP servera (ne otvarati `file://` direktno):

```bash
# Opcija 1: VS Code Live Server extension (preporučeno)

# Opcija 2: Python
python -m http.server 8000

# Opcija 3: Node
npx serve
```

Zatim otvorite `http://localhost:8000` u browseru.

---

## Deploy (GitHub Pages)

1. Pushai projekt na GitHub repozitorij
2. Idi na **Settings → Pages**
3. Pod *Source* odaberi granu `main` i direktorij `/ (root)`
4. Klikni **Save** — stranica je live za minutu

Svaki push na `main` automatski ažurira deploy.

---

## Done checklist

Prije final deploya provjereno:

- [x] Filter po kategorijama radi
- [x] Pretraga (live search) radi
- [x] Loading stanje se prikazuje tijekom fetcha (600 ms delay)
- [x] Error stanje se prikazuje na network grešci
- [x] Empty stanje se prikazuje kad filter/pretraga nema rezultata
- [x] List ↔ detail view toggle radi
- [x] Favoriti se perzistiraju u localStorage
- [x] Zadnji filter se pamti između posjeta
- [x] Kontakt forma validira prazna polja i prikazuje povratnu poruku
- [x] Hamburger izbornik radi na mobilnom (CSS-only)
- [x] Responsive na 375 / 768 / 1100 px
- [x] Sve putanje relativne (radi i u pod-direktoriju)
- [x] Nema grešaka u konzoli

---

## Debug notes

**Script path bug (`index.html`)**: `src="scripts/main.js"` upućivao na nepostojeći direktorij. Mapa se zove `js/`, ne `scripts/`. Fix: zamijeniti s `src="js/main.js"`.

**Hero background na podstranicama**: `url('../assets/img/hero.jpg')` u `tokens.css` — putanja je relativna na CSS datoteku, ne na HTML. Radi ispravno jer su svi stilovi u `styles/` direktoriju.

---

*© 2026 Beefsteak Zadar — Studij informacijske tehnologije, Sveučilište u Zadru*