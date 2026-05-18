import "./Products.css";

import { useRef, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import ConfirmModal from "../../../../shared/components/ConfirmModal/ConfirmModal";
import { getProducts, saveProducts, deleteProduct } from "../../services/inventoryService";
import categories from "../../data/categories";
import { useInventory } from "../../context/InventoryContext";

function Products({ showToast }) {

  const { products, setProducts } = useInventory();

  // Creacion de estados modal
  const [showModal, setShowModal] = useState(false);
  // Estados para busqueda y filtro
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para filtro de categoria
  const [selectedCategory, setSelectedCategory] = useState("");
  // Estados para filtro de precio
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  // Estado para producto seleccionado en el modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  //Referencia timer
  const deleteTimer = useRef(null);

  // Eliminar productos (Abre Modal)
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();
    // filtro de busqueda por nombre, ID y marca del producto
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search)
      ||
      product.id
        .toString()
        .includes(search)
      ||
      product.brand
        .toLowerCase()
        .includes(search);

    // filtro por categoria 
    const matchesCategory =
      selectedCategory === ""
      ||
      product.category === selectedCategory;

    // Filtro por rango de precio
    const matchesPrice =
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice));


    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice
    );
  });

  // Confirmacion de delete
  const confirmDelete = () => {

    const deletedProduct = selectedProduct;

    const updatedProducts = deleteProducts(deletedProduct.id);

    setProducts(updatedProducts);

    setShowModal(false);

    // TIMER
    deleteTimer.current = setTimeout(() => {
      console.log(
        "Eliminación definitiva"
      );

    }, 5000);

    // TOAST
    showToast({
      message: "Producto eliminado",
      type: "error",
      actionText: "DESHACER",

      onAction: () => {
        clearTimeout(deleteTimer.current);

        const restoredProducts = [
          ...getProducts(),
          deletedProduct
        ];

        saveProducts(restoredProducts);

        setProducts(restoredProducts);

        showToast({
          message: "Producto restaurado",
          type: "success"
        });
      }
    });
  };


  // Temporal para restaurar los datos
  //-----------------------------------------
  const resetProducts = () => {
    localStorage.removeItem("inventory_products");
    const restoredProducts = getProducts();
    setProducts(restoredProducts);
  };
  //-----------------------------------------

  return (
    <div className="products-page">

      <div className="products-header">
        <h1>Productos</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">
            Todas las categorías
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="price-filter">
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => handleDelete(product)}
          />
        ))}
      </div>
      
      {/* MODAL */} 
      <ConfirmModal
        visible={showModal}
        title="Eliminar producto"
        message={`¿Seguro que deseas eliminar "${selectedProduct?.name}"?`}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />

      {/* ---------temporal---------- */}
      <br /><br />
      <button onClick={resetProducts}>
        Restaurar Datos
      </button>
      {/* --------------------------- */}

    </div>
  );
}

export default Products;