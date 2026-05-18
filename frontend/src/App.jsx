import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/AddProduct/AddProduct";
import initialProducts from "./data/products";
import EditProduct from "./pages/EditProduct/EditProduct";
import Toast from "./components/Toast/Toast";

function App() {
  const [products, setProducts] = useState(() => {
  
    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : initialProducts;
  });

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

  // Guardar productos en localStorage
  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

  }, [products]);

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
    <BrowserRouter>

      <MainLayout darkMode={darkMode} setDarkMode={setDarkMode}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products products={products} setProducts={setProducts} showToast={showToast}/>} />
          <Route path="/agregar" element={<AddProduct products={products} setProducts={setProducts} showToast={showToast}/>} />
          <Route path="/editar/:id" element={<EditProduct products={products} setProducts={setProducts} showToast={showToast}/>} />
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
  );
}

export default App;