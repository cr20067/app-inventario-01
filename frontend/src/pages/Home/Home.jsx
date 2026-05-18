import "./Home.css";

import { FaBox, FaPlusCircle, FaChartBar, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/DashboardCard/DashboardCard";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      <div className="home-header">
        <h1>Inventario NawiTech</h1>
      </div>

      <div className="dashboard-grid">

        <DashboardCard
          icon={<FaBox />}
          title="Productos"
          description="Ver productos"
          onClick={() => navigate("/productos")}
        />

        <DashboardCard
          icon={<FaPlusCircle />}
          title="Agregar"
          description="Agregar productos"
          onClick={() => navigate("/agregar")}
        />

        <DashboardCard
          icon={<FaChartBar />}
          title="Reportes"
          description="Ver estadísticas"
          onClick={() => navigate("/reportes")}
        />

        <DashboardCard
          icon={<FaCog />}
          title="Opciones"
          description="Configuración"
          onClick={() => navigate("/configuracion")}
        />

      </div>
    </div>
  );
}

export default Home;