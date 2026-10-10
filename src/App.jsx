import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import NotFound from "./pages/NotFound.jsx";

// App = the layout (navbar on top) + which page to show for each URL.
export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        Data from NASA open APIs. This is a learning project and is not run by NASA.
      </footer>
    </>
  );
}
