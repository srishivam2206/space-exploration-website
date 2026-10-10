# Space Explorer

A small beginner-friendly React website that uses NASA's public APIs.
It shows the Astronomy Picture of the Day and lets you search NASA's image library.

## Features

- **Home page**: NASA's Astronomy Picture of the Day (APOD), with title, date and explanation. Works for both images and videos. Shows a loading spinner and an error message.
- **Search page**: type a term (for example `mars`) and see results in a responsive grid of cards (thumbnail, title, date, short description).
- **Load more**: fetches the next page of results using the API's `page` parameter.
- **Detail pop-up**: click a card to see the full description. Close it with the button, by clicking outside, or with the Esc key.
- Dark space theme in plain CSS, works on phones and desktops.

## Tech stack

- React 18 (with Vite as the build tool)
- Plain JavaScript (no TypeScript)
- react-router-dom (for the Home and Search pages)
- Plain CSS (no UI library)
- No backend: the browser calls the NASA APIs directly

## Setup (step by step)

1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open a terminal in this project folder.
3. Install the packages:
   ```
   npm install
   ```
4. Create your settings file by copying the example:
   ```
   cp .env.example .env
   ```
   (On Windows Command Prompt use `copy .env.example .env`.)
5. Start the app:
   ```
   npm run dev
   ```
6. Open the address shown in the terminal (usually http://localhost:5173).

Other commands:

- `npm run build` creates the production files in the `dist` folder.
- `npm run preview` serves the built files locally so you can check them.

## Getting a free NASA API key

1. Go to https://api.nasa.gov
2. Fill in the "Generate API Key" form (first name, last name, email).
3. The key is shown on the page and also emailed to you.
4. Open your `.env` file and replace `DEMO_KEY`:
   ```
   VITE_NASA_API_KEY=your_key_here
   ```
5. Stop and restart `npm run dev` (Vite only reads `.env` at startup).

Never commit your `.env` file. It is already listed in `.gitignore`.

## Project structure

```
space-exploration-website/
├── index.html              Page shell; loads src/main.jsx
├── package.json            Dependencies and npm scripts
├── vite.config.js          Vite settings
├── .env.example            Example settings (copy to .env)
├── .gitignore              Files Git should ignore
└── src/
    ├── main.jsx            Starts React and the router
    ├── App.jsx             Navbar + list of pages (routes)
    ├── utils.js            Small helpers (format date, shorten text)
    ├── api/
    │   └── nasa.js         All NASA API calls
    ├── hooks/
    │   └── useFetch.js     Small hook for loading / error / data
    ├── components/
    │   ├── Navbar.jsx      Top navigation
    │   ├── Loader.jsx      Loading spinner
    │   ├── ErrorMessage.jsx  Error box
    │   ├── ResultCard.jsx  One search result card
    │   └── ImageModal.jsx  Detail pop-up
    ├── pages/
    │   ├── Home.jsx        Picture of the Day
    │   ├── Search.jsx      Search, grid, Load more, modal
    │   └── NotFound.jsx    Unknown URL page
    └── styles/
        └── global.css      All styling
```

## APIs used

- APOD: `https://api.nasa.gov/planetary/apod?api_key=...`
- NASA Image and Video Library: `https://images-api.nasa.gov/search?q=...&media_type=image&page=...` (no key needed)

## Limitations

- **DEMO_KEY is rate limited.** NASA documents low hourly and daily limits for it, shared by everyone using it. If you see a "Too many requests" message, get your own free key (see above).
- **The API key is visible in the browser.** Anything starting with `VITE_` is bundled into the site, so do not treat it as secret. NASA keys are free and low risk, but a real production app would use a small backend.
- **Search detail view uses the thumbnail.** The search results give a small preview image, so the pop-up image is not full resolution.
- **Some APOD videos may not embed.** The app puts the video link into an iframe, which works for embed links (such as YouTube) but may not for every video host.
- **Search results are limited by the API.** The library returns results in pages, so very deep pages may not be available.
- **No tests and no automatic runtime check were run for this project.** If an API changes its response shape, `src/api/nasa.js` is the place to fix it.
