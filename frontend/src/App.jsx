import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import { InventoryProvider } from "./modules/inventory/context/InventoryContext";

import MainLayout from "./shared/layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from "./modules/inventory/pages/Products/Products";
import AddProduct from "./modules/inventory/pages/AddProduct/AddProduct";
import initialProducts from "./modules/inventory/data/products";
import EditProduct from "./modules/inventory/pages/EditProduct/EditProduct";
import Movements from "./modules/inventory/pages/Movements/Movements";
import Toast from "./shared/components/Toast/Toast";
import NewSale from "./modules/sales/pages/NewSale/NewSale";

function App() {

  // Crea estado de Toast
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    actionText: "",
    onAction: null
  });

  // Mostrar Toast
  const showToast = (toastConfig) => {
    const {
      message,
      type = "success",
      actionText = "",
      onAction = null
    } = typeof toastConfig === "string"
      ? { message: toastConfig }
      : toastConfig;

    setToast({
      visible: true,
      message,
      type,
      actionText,
      onAction
    });
  };
  
  // Estado para modo oscuro
  const [darkMode, setDarkMode] =
  useState(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    return savedTheme === "true";
  });

  // Estado para modo oscuro
  useEffect(() => {

    if (darkMode) {
      document.body.classList.add(
        "dark-mode"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
    }
    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);

  return (
    <InventoryProvider>
      <BrowserRouter>

        <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/productos" element={<Products  showToast={showToast}/>} />
            <Route path="/agregar" element={<AddProduct  showToast={showToast}/>} />
            <Route path="/editar/:id" element={<EditProduct  showToast={showToast}/>} />
            <Route path="/movimientos" element={<Movements />} />

            <Route path="/ventas/nueva" element={<NewSale />} />
          </Routes>

        </MainLayout>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          actionText={toast.actionText}
          onAction={toast.onAction}
          onClose={() =>
            setToast({
              ...toast,
              visible: false
            })
          }
        />

      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;