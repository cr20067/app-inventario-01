import "./Home.css";

import { FaBox, FaPlusCircle, FaChartBar, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { useInventory } from "../../modules/inventory/context/InventoryContext";
import { getMovements } from "../../modules/inventory/services/movementService";

function Home() {

  const navigate = useNavigate();

  const { products } = useInventory();

  const movements = getMovements();

  const recentMovements = movements.slice(0, 5);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (acc, product) => acc + product.stock,
    0
  );

  const inventoryValue = products.reduce(
    (acc, product) =>
      acc + (product.price * product.stock),
    0
  );

  const totalMovements = movements.length;

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  );

  return (
    <div className="home">

      <div className="home-header">
        <h1>Inventario NawiTech</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Productos</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Stock Total</h3>
          <p>{totalStock}</p>
        </div>

        <div className="stat-card">
          <h3>Movimientos</h3>
          <p>{totalMovements}</p>
        </div>

        <div className="stat-card">
          <h3>Valor Inventario</h3>
          <p>
            $
            {inventoryValue.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="low-stock-section">
        <h2>
          ⚠ Productos con Bajo Stock
        </h2>
        {lowStockProducts.length === 0 ? (
          <p>
            No hay productos con stock bajo.
          </p>
        ) : (
          <div className="low-stock-list">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="low-stock-card"
              >
                <h3>
                  {product.name}
                </h3>

                <p>
                  Stock:
                  {" "}
                  {product.stock}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recent-movements-section">
        <h2>
          📋 Movimientos Recientes
        </h2>
        {recentMovements.length === 0 ? (
          <p>
            No hay movimientos registrados.
          </p>
        ) : (
          <div className="recent-movements-list">
            {recentMovements.map((movement) => (
              <div
                key={movement.id}
                className="movement-card"
              >
                <div className="movement-header">
                  <span
                    className={
                      movement.type === "entry"
                        ? "movement-entry"
                        : "movement-exit"
                    }
                  >
                    {movement.type === "entry"
                      ? "Entrada"
                      : "Salida"}
                  </span>
                  <span>
                    {new Date(
                      movement.date
                    ).toLocaleDateString()}
                  </span>
                </div>
                <h3>
                  {movement.productName}
                </h3>
                <p>
                  Cantidad:
                  {" "}
                  {movement.quantity}
                </p>
                <p>
                  Stock:
                  {" "}
                  {movement.previousStock}
                  {" → "}
                  {movement.newStock}
                </p>
              </div>
            ))}
          </div>
        )}
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