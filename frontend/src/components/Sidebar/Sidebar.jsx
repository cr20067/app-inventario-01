import "./Sidebar.css";

import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaPlusCircle,
  FaChartBar
} from "react-icons/fa";

function Sidebar() {

  const {
    isOpen,
    closeSidebar
  } = useContext(SidebarContext);

  return (
    <>

      {/* OVERLAY */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={closeSidebar}
      ></div>

      {/* SIDEBAR */}
      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
      >

        <Link to="/" onClick={closeSidebar}>
          <FaHome />
           Inicio
        </Link>

        <Link
          to="/productos"
          onClick={closeSidebar}
        >
          <FaBox />
          Productos
        </Link>

        <Link
          to="/agregar"
          onClick={closeSidebar}
        >
          <FaPlusCircle />
          Agregar
        </Link>

        <Link
          to="/reportes"
          onClick={closeSidebar}
        >
          <FaChartBar />
          Reportes
        </Link>

      </aside>

    </>
  );
}

export default Sidebar;