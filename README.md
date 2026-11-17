# 🛸 Rick and Morty Explorer — React + TypeScript

A responsive web application for exploring the Rick and Morty universe through its characters, episodes, and locations.

Built with **React, TypeScript, SCSS, and Vite**, using the [Rick and Morty API](https://rickandmortyapi.com/).

This project was developed as part of the **Full Stack Web Development Master's programme at Conquer Blocks**.

## 🌐 Live Demo

**[View Live Website](https://androsne.github.io/rick_and_morty_explorer_reactjs/)**

**[GitHub Repository](https://github.com/androsne/rick_and_morty_explorer_reactjs)**

## ✨ Features

### Characters

- Browse characters from the Rick and Morty universe.
- Search characters by name with debounced input.
- Filter by status, species, and gender.
- Combine multiple filters to refine results.
- Reset all filters with a single button.
- Navigate results using pagination.
- Open character cards to view additional details in a modal.
- Add or remove characters from favourites directly from their cards.

### Episodes

- Browse episodes from the series.
- View episode codes, names, air dates, and character counts.
- Navigate episodes using pagination.
- Open episode cards to view additional details in a modal.

### Locations

- Discover locations across the multiverse.
- View location names, types, dimensions, and resident counts.
- Navigate locations using pagination.
- Open location cards to view additional details in a modal.

### Favourites

- Add or remove characters from your favourites.
- Access saved characters in a dedicated Favourites section.
- Store favourite character IDs using the browser's `localStorage`.
- Keep favourites between browser sessions.
- Open saved character cards to view their details.

### User Interface

- Responsive, mobile-first layout for mobile, tablet, and desktop.
- Dark theme inspired by the Rick and Morty universe.
- Reusable React components for cards, pagination, and modals.
- Keyboard-accessible buttons and native HTML `<dialog>` modals.
- Navigation between sections without full page reloads using URL hashes.
- Loading, error, and empty states for API-driven content.
- Request cancellation with `AbortController` when fetching data.

## 🛠️ Technologies Used

| Technology   | Purpose                                                |
| ------------ | ------------------------------------------------------ |
| HTML5        | Semantic page structure                                |
| React        | Component-based user interface and state management    |
| TypeScript   | Static typing for components, props, and API responses |
| SCSS / Sass  | Modular styling and responsive layouts                 |
| Vite         | Development server and production builds               |
| Fetch API    | Communication with the external API                    |
| React hooks  | State, effects, refs, and reusable application logic   |
| localStorage | Persistent favourite characters                        |
| Git & GitHub | Version control and source code hosting                |
| GitHub Pages | Website deployment                                     |

## 📡 API

This application uses the free and public [Rick and Morty API](https://rickandmortyapi.com/).

The API provides information about:

- Characters
- Episodes
- Locations

Official API documentation: https://rickandmortyapi.com/documentation

## 📁 Project Structure

```text
rick_and_morty_explorer_reactjs/
├── public/
│   └── img/
│       ├── favicon.svg
│       ├── rick_and_morty.svg
│       ├── icon_portal.png
│       └── icon_rick_button.svg
│
├── src/
│   ├── components/
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterModal.tsx
│   │   ├── EpisodeCard.tsx
│   │   ├── EpisodeModal.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LocationCard.tsx
│   │   ├── LocationModal.tsx
│   │   └── Pagination.tsx
│   │
│   ├── hooks/
│   │   ├── useDialog.ts
│   │   ├── useFavourites.ts
│   │   └── usePaginatedData.ts
│   │
│   ├── pages/
│   │   ├── CharactersPage.tsx
│   │   ├── EpisodesPage.tsx
│   │   ├── FavouritesPage.tsx
│   │   └── LocationsPage.tsx
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── styles/
│   │   ├── components/
│   │   │   ├── _character.scss
│   │   │   ├── _content-header.scss
│   │   │   ├── _episode.scss
│   │   │   ├── _favourite.scss
│   │   │   ├── _filters.scss
│   │   │   ├── _footer.scss
│   │   │   ├── _header.scss
│   │   │   ├── _location.scss
│   │   │   ├── _modal.scss
│   │   │   └── _pagination.scss
│   │   ├── _global.scss
│   │   ├── _layout.scss
│   │   ├── _variables.scss
│   │   └── main.scss
│   │
│   ├── types/
│   │   ├── navigation.ts
│   │   └── rickAndMorty.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

### Main Modules and Components

**`App.tsx`**  
Manages section navigation, shared favourite state, and the selected items shown in modals.

**`services/api.ts`**  
Contains typed functions for fetching characters, episodes, and locations from the Rick and Morty API.

**`components/`**  
Contains reusable cards, modal components, navigation, footer, and pagination.

**`pages/`**  
Contains the Characters, Episodes, Locations, and Favourites views.

**`hooks/useFavourites.ts`**  
Manages favourite character IDs and synchronises them with browser localStorage.

**`hooks/usePaginatedData.ts`**  
Provides reusable data-fetching, loading, error, and pagination logic for Episodes and Locations.

**`hooks/useDialog.ts`**  
Manages the opening and closing of native HTML dialogs.

**`types/rickAndMorty.ts`**  
Defines TypeScript interfaces for API data and responses.

**`styles/`**  
Organises the application's SCSS variables, global styles, layout, and component styles.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/androsne/rick_and_morty_explorer_reactjs.git
```

**2. Navigate into the project**

```bash
cd rick_and_morty_explorer_reactjs
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

Generate the optimised production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Vite generates the production files inside the `dist/` directory.

## 🌍 Deployment

The application is intended to be hosted using **GitHub Pages**.

Its Vite configuration uses relative asset paths:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
});
```

If your project uses a React plugin or other Vite plugins, keep those in the actual configuration file alongside `base: "./"`.

After installing and configuring `gh-pages`, deploy with:

```bash
npm run deploy
```


## 🎓 Academic Project

This project was developed as part of the **Full Stack Web Development Master's programme at Conquer Blocks**.

The project provides practical experience with:

- React components, props, and shared state.
- TypeScript interfaces, typed props, and generic hooks.
- Asynchronous programming with `async/await`.
- Consuming REST APIs using `fetch()`.
- `useState`, `useEffect`, and `useRef`.
- Building reusable custom React hooks.
- Search, filtering, and pagination.
- Native HTML dialogs and modal interactions.
- Browser localStorage.
- Modular SCSS and responsive web design.
- Version control with Git and GitHub.
- Building and deploying a React application with Vite.

## 👨‍💻 Author

**Andreas Osnes**

Full Stack Web Development Student

GitHub: [@androsne](https://github.com/androsne)

## 🙏 Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) — Character, episode, and location data.
- [Conquer Blocks](https://www.conquerblocks.com/) — Full Stack Web Development academy.
- Rick and Morty — The universe that inspired the application's visual design and content.

---

**Disclaimer:** This is an educational, non-commercial project. Rick and Morty characters, images, and related trademarks belong to their respective owners.
