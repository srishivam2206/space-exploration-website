import { NavLink } from "react-router-dom";

// Top bar with links. NavLink adds the class "active" to the current page link.
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="logo">Space Explorer</span>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/search">Search</NavLink>
        </nav>
      </div>
    </header>
  );
}
