import "./Navbar.css";

import { FaBars, FaMoon, FaSun, FaCashRegister } from "react-icons/fa";
import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { Link } from "react-router-dom";

import NavbarDropdown from "../../components/NavbarDropdown/NavbarDropdown";

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

        <NavbarDropdown title="Inventario">

          <Link to="/productos">
            Productos
          </Link>

          <Link to="/agregar">
            Agregar
          </Link>

          <Link to="/movimientos">
            Movimientos
          </Link>

        </NavbarDropdown>

        <NavbarDropdown title="Ventas">

          <Link to="/ventas/nueva">
            Nueva Venta
          </Link>

          <Link to="/ventas/historial">
            Historial
          </Link>

        </NavbarDropdown>

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