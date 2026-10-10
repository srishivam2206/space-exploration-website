import { Link } from "react-router-dom";

// Shown for any URL that does not match a route.
export default function NotFound() {
  return (
    <section className="center">
      <h1>Page not found</h1>
      <p>Lost in space? <Link to="/">Go back home</Link>.</p>
    </section>
  );
}
