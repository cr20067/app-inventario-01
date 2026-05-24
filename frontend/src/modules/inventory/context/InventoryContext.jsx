import { createContext, useContext, useEffect, useState } from "react";

import { getProducts } from "../services/inventoryService";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = getProducts();
    setProducts(storedProducts);
  }, []);

  return (
    <InventoryContext.Provider
      value={{
        products,
        setProducts
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}