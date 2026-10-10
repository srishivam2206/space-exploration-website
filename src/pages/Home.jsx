import { getApod } from "../api/nasa.js";
import useFetch from "../hooks/useFetch.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

// Home page: shows NASA's Astronomy Picture of the Day (APOD).
export default function Home() {
  const { data, loading, error } = useFetch(getApod);

  if (loading) return <Loader text="Loading today's picture..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="apod">
      <h1>Astronomy Picture of the Day</h1>
      <p className="date">{data.date}</p>
      <h2>{data.title}</h2>

      {/* APOD can be an image or a video, so we check media_type */}
      {data.media_type === "video" ? (
        <div className="video-wrapper">
          <iframe
            src={data.url}
            title={data.title}
            allowFullScreen
          />
        </div>
      ) : (
        <img className="apod-image" src={data.hdurl || data.url} alt={data.title} />
      )}

      <p className="explanation">{data.explanation}</p>
      {data.copyright && <p className="date">Credit: {data.copyright.trim()}</p>}
    </section>
  );
}
