import "./Sidebar.css";

import { useContext } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaChartBar,
  FaClipboardList,
  FaCashRegister,
  FaReceipt
} from "react-icons/fa";

import SidebarSection from "../../components/SidebarSection/SidebarSection";

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

        <SidebarSection
          icon={<FaBox />}
          title="Inventario"
        >

          <Link
            to="/productos"
            onClick={closeSidebar}
          >
            Productos
          </Link>

          <Link
            to="/agregar"
            onClick={closeSidebar}
          >
            Agregar
          </Link>

          <Link
            to="/movimientos"
            onClick={closeSidebar}
          >
            Movimientos
          </Link>
        </SidebarSection>

        <SidebarSection
          icon={<FaCashRegister />}
          title="Ventas"
        >

          <Link
            to="/ventas/nueva"
            onClick={closeSidebar}
          >
            Nueva Venta
          </Link>

          <Link
            to="/ventas/historial"
            onClick={closeSidebar}
          >
            Historial
          </Link>
        </SidebarSection>

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