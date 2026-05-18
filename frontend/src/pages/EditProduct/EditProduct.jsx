import "./EditProduct.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import categories from "../../data/categories";

function EditProduct({ products, setProducts, showToast }) {

  const { id } = useParams();

  const navigate = useNavigate();

  // Buscar el producto por ID
  const product = products.find((p) => p.id === Number(id));

  // Estados locales para el formulario
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [model, setModel] = useState(product.model);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [category, setCategory] = useState(product.category);

  // Si el producto no existe, mostrar un mensaje
  if (!product) {
    return (
      <div className="add-product-page">
        <h1>Producto no encontrado</h1>
      </div>
    );
  }
  // Manejar el envio del formulario
  const handleSubmit = (e) => {

    e.preventDefault();

    const updatedProducts =
      products.map((p) => {
        if (p.id === product.id) {
          return {
            ...p,
            name,
            brand,
            model,
            price,
            stock,
            category
          };
        }
        return p;
      });
    setProducts(updatedProducts);

    // Mostrar mensaje de producto actualizado
    showToast({
      message: "Producto actualizado",
      type: "success"
    });

    navigate("/productos");
  };

  return (
    <div className="add-product-page">

      <h1>Editar Producto</h1>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
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
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
        />
        
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">
            Selecciona categoría
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}> {cat} </option>
          ))}
        </select>

        <button type="submit">
          Guardar Cambios
        </button>

      </form>

    </div>
  );
}

export default EditProduct;