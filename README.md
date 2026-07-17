# Pokédex – Webanwendung

Dieses Projekt ist ein Nachbau eines Pokédex als Webanwendung im Rahmen einer Weiterbildung zum Fullstack Developer.

Die Anwendung nutzt eine externe API, um Pokémon-Daten dynamisch zu laden und darzustellen.  
Der Fokus liegt auf einer sauberen technischen Umsetzung, klarer Struktur und einer benutzerfreundlichen Oberfläche.

---

## Funktionen

- Anzeige einer Pokémon-Liste
- Nachladen weiterer Pokémon über „Load More“ (Pagination)
- Detailansicht für einzelne Pokémon (Modal)
- Navigation zwischen Pokémon innerhalb der Detailansicht
- **Tab-Navigation im Detaildialog (Allgemein / Status)**
- **Floating Navigation Buttons (links/rechts außerhalb der Card)**
- Suchfunktion:
  - Suche ab mindestens 3 Zeichen
  - globale Suche über alle verfügbaren Pokémon
  - Reset der Suche möglich
- Ladezustände (Loading Spinner und visuelles Feedback)
- Fehlerbehandlung bei API-Anfragen
- Speicherung bereits geladener Daten im LocalStorage
- responsives Layout (Mobile-Optimierung)
- Keyboard-Navigation (Accessibility)

---

## Technologien

- HTML
- CSS (Flexbox, Grid)
- Vanilla JavaScript
- PokéAPI (https://pokeapi.co/)

---

## Projektstruktur

project-root/
│
├── index.html
├── css/
│ └── styles.css
│
├── js/
│ ├── main.js
│ ├── api/
│ │ └── fetchPokemon.js
│ ├── render/
│ │ ├── renderPokemon.js
│ │ ├── pokemonTemplates.js
│ │ └── pokemonDetailTemplates.js
│ └── utils/
│ └── helpers.js
│
└── assets/
└── favicon.svg


---

## Technische Umsetzung

Die Anwendung ist modular aufgebaut:

- **main.js**  
  Steuert den Ablauf der Anwendung und verwaltet den Zustand

- **fetchPokemon.js**  
  Führt alle API-Anfragen aus

- **renderPokemon.js**  
  Verantwortlich für das Rendern der Benutzeroberfläche

- **Templates (pokemonTemplates / pokemonDetailTemplates)**  
  Enthalten ausschließlich HTML-Strukturen

- **helpers.js**  
  Beinhaltet wiederverwendbare Hilfsfunktionen

Besonderer Fokus lag auf:

- kleinen, wartbaren Funktionen (Single Responsibility)
- klarer Trennung von Logik und Darstellung
- nachvollziehbarer und strukturierter Codeorganisation
- Verwendung von JSDoc zur Dokumentation

---

## Datenverarbeitung

- Pokémon-Daten werden über die PokéAPI geladen
- Detaildaten werden parallel mit `Promise.all` abgerufen
- bereits geladene Daten werden im LocalStorage gespeichert
- unnötige API-Anfragen werden dadurch reduziert
- Detaildaten werden zusätzlich im laufenden Zustand gecached

---

## Nutzung

### Projekt lokal starten

1. Repository klonen oder herunterladen
2. Projektordner öffnen
3. `index.html` im Browser öffnen

### Optional (empfohlen)

Start über einen lokalen Server, z. B.:

- Live Server (VS Code)
- oder ein einfacher HTTP Server

---

## Besonderheiten

- globale Suche über alle Pokémon (nicht nur geladene)
- Dialog mit Tab-Navigation zur besseren Übersicht
- Floating Navigation Buttons für bessere UX
- visuelle Ladezustände (inkl. Loader)
- Vermeidung unnötiger Re-Renders
- strukturierter und nachvollziehbarer Code

---

## Mögliche Erweiterungen

- Pokédex- oder Gameboy-Design
- Animationen und visuelle Effekte
- zusätzliche Filtermöglichkeiten (z. B. nach Typ)
- erweiterte Detailinformationen
- vollständige ARIA- und WCAG-Optimierung

---

## Autor

Bastian Wollny  
Weiterbildungsprojekt
