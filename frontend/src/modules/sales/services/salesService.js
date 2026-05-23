const SALES_KEY = "sales";

// Obtener ventas
export const getSales = () => {

  const sales =
    localStorage.getItem(SALES_KEY);

  return sales
    ? JSON.parse(sales)
    : [];
};

// Guardar ventas
export const saveSales = (sales) => {

  localStorage.setItem(
    SALES_KEY,
    JSON.stringify(sales)
  );
};

// Agregar venta
export const addSale = (sale) => {

  const sales = getSales();

  const newSale = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...sale
  };

  const updatedSales = [
    newSale,
    ...sales
  ];

  saveSales(updatedSales);

  return updatedSales;
};