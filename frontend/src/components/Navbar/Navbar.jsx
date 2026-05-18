import "./Navbar.css";

import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { Link } from "react-router-dom";

function Navbar( { darkMode, setDarkMode } ) {

  const { toggleSidebar } = useContext(SidebarContext);

  return (
    <header className="navbar">

      {/* MOBILE */}
      <button className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <h2 className="logo">
        Inventario NawiTech
      </h2>

      {/* DESKTOP */}
      <nav className="desktop-nav">

        <Link to="/">Inicio</Link>

        <Link to="/productos">
          Productos
        </Link>

        <Link to="/agregar">
          Agregar
        </Link>

        <Link to="/reportes">
          Reportes
        </Link>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode
            ? <FaSun />
            : <FaMoon />
          }
        </button>

      </nav>

    </header>
  );
}

export default Navbar;