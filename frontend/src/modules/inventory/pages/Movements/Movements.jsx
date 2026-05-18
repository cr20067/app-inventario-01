import "./Movements.css";

import { getMovements } from "../../services/movementService";

function Movements() {
  const movements = getMovements();

  return (
    <div className="movements-page">

      <div className="movements-header">
        <h1>
          Historial de Movimientos
        </h1>
      </div>

      {movements.length === 0 ? (

        <p>No hay movimientos registrados.</p>

      ) : (

        <table className="movements-table">

          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Stock Anterior</th>
              <th>Nuevo Stock</th>
            </tr>
          </thead>

          <tbody>

            {movements.map((movement) => (

              <tr key={movement.id}>

                <td>
                  {new Date(
                    movement.date
                  ).toLocaleString()}
                </td>

                <td>
                  {movement.productName}
                </td>

                <td>
                  {movement.type === "entry"
                    ? "Entrada"
                    : "Salida"}
                </td>

                <td>
                  {movement.quantity}
                </td>

                <td>
                  {movement.previousStock}
                </td>

                <td>
                  {movement.newStock}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}

export default Movements;