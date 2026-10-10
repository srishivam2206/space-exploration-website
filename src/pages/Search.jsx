import { useState } from "react";
import { searchImages } from "../api/nasa.js";
import ResultCard from "../components/ResultCard.jsx";
import ImageModal from "../components/ImageModal.jsx";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

// Search page: type a term, see a grid of NASA images, click one for details.
export default function Search() {
  const [term, setTerm] = useState("");          // what is typed in the box
  const [searchedTerm, setSearchedTerm] = useState(""); // the term we last searched
  const [results, setResults] = useState([]);    // all cards shown so far
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null); // item shown in the modal

  // Runs when the form is submitted: starts a new search from page 1.
  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser reloading the page
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    setLoading(true);
    setError("");
    setResults([]);
    try {
      const data = await searchImages(cleanTerm, 1);
      setResults(data.items);
      setTotalHits(data.totalHits);
      setSearchedTerm(cleanTerm);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Loads the next page and adds it to the end of the current results.
  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoading(true);
    setError("");
    try {
      const data = await searchImages(searchedTerm, nextPage);
      setResults((old) => [...old, ...data.items]);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const hasMore = results.length > 0 && results.length < totalHits;
  const noResults = searchedTerm && !loading && !error && results.length === 0;

  return (
    <section>
      <h1>Search NASA Images</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Try: mars, nebula, apollo..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          aria-label="Search term"
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>

      {error && <ErrorMessage message={error} />}
      {noResults && <p className="hint">No images found for "{searchedTerm}".</p>}

      {results.length > 0 && (
        <p className="hint">
          Showing {results.length} of {totalHits} results for "{searchedTerm}"
        </p>
      )}

      <div className="grid">
        {results.map((item) => (
          <ResultCard key={item.id} item={item} onSelect={setSelected} />
        ))}
      </div>

      {loading && <Loader text="Searching..." />}

      {hasMore && !loading && (
        <div className="center">
          <button type="button" onClick={handleLoadMore}>Load more</button>
        </div>
      )}

      {selected && <ImageModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
