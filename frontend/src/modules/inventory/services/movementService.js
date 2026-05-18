const MOVEMENTS_KEY = "inventory_movements";

// Obtener movimientos
export const getMovements = () => {
  const movements = localStorage.getItem(MOVEMENTS_KEY);

  return movements
    ? JSON.parse(movements)
    : [];
};

// Guardar movimientos
export const saveMovements = (movements) => {
  localStorage.setItem(
    MOVEMENTS_KEY,
    JSON.stringify(movements)
  );
};

// Registrar movimiento
export const addMovement = (movement) => {

  const movements = getMovements();

  const newMovement = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...movement
  };

  const updatedMovements = [
    newMovement,
    ...movements
  ];

  saveMovements(updatedMovements);

  return updatedMovements;
};