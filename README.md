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
HTML5, CSS3 (Flexbox, Grid, CSS varijable)

## Autor
Lovre Ljoka, UNIZD SIT 2026