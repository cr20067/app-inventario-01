import "./AddProduct.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import categories from "../../data/categories";

function AddProduct({ products, setProducts, showToast }) {

  const navigate = useNavigate();

  // Estados locales para el formulario
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name,
      brand,
      model,
      price,
      stock,
      category
    };

    setProducts([...products, newProduct]);

    // Notificacion Toast
    showToast({
      message: "Producto agregado exitosamente",
      type: "success"
    });
    
    navigate("/productos");
  };

  return (
    <div className="add-product-page">

      <h1>Agregar Producto</h1>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Modelo"
          value={model}
          onChange={(e) =>
            setModel(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />



        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}        >
          <option value="">
            Selecciona categoría
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}> {cat} </option>
          ))}
        </select>

        <button type="submit">
          Guardar Producto
        </button>

      </form>

    </div>
  );
}

export default AddProduct;