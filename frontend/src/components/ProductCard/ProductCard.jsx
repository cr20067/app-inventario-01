import "./ProductCard.css";

import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onDelete }) {

  const navigate = useNavigate();

  return (
    <div className="product-card">

      <div className="product-info">

        <div className="category-badge">
          {product.category}
        </div>

        <h3>{product.name}</h3>   

        <p>
          Marca: {product.brand}
        </p>


        <p>
          Modelo: {product.model}
        </p>

        <p>
          Precio: ${product.price}
        </p>

        <p>
          Stock: {product.stock}
        </p>

      </div>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => navigate(`/editar/${product.id}`)}>
          <FaEdit />
        </button>

        <button className="delete-btn" onClick={() => onDelete(product.id)}>
          <FaTrash />
        </button>
      </div>

    </div>
  );
}

export default ProductCard;