// All NASA API calls live here, so components never build URLs themselves.

// Key comes from the .env file. If it is missing we use NASA's shared DEMO_KEY.
const API_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

const APOD_URL = "https://api.nasa.gov/planetary/apod";
const IMAGES_URL = "https://images-api.nasa.gov/search";

// Small helper: fetch a URL, throw a readable error if something goes wrong.
async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many requests. The API rate limit was reached, please try again later.");
    }
    throw new Error(`Request failed (status ${response.status}).`);
  }
  return response.json();
}

// Astronomy Picture of the Day.
// Returns an object with: title, date, explanation, url, hdurl, media_type
export function getApod() {
  return getJson(`${APOD_URL}?api_key=${encodeURIComponent(API_KEY)}`);
}

// Search the NASA Image and Video Library (no key needed).
// page starts at 1. Returns a simple object: { items, totalHits }
export async function searchImages(term, page = 1) {
  const url =
    `${IMAGES_URL}?q=${encodeURIComponent(term)}` +
    `&media_type=image&page=${page}`;
  const data = await getJson(url);

  const rawItems = data.collection?.items || [];

  // Turn NASA's nested shape into a flat object that is easy to use in components.
  const items = rawItems
    .filter((item) => item.data && item.data[0]) // skip malformed entries
    .map((item) => {
      const info = item.data[0];
      const thumb = item.links && item.links[0] ? item.links[0].href : "";
      return {
        id: info.nasa_id,
        title: info.title || "Untitled",
        description: info.description || "",
        date: info.date_created || "",
        thumbnail: thumb,
      };
    });

  return {
    items,
    totalHits: data.collection?.metadata?.total_hits || 0,
  };
}
