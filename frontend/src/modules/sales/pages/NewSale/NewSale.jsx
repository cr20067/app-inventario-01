import "./NewSale.css";

import { useState } from "react";
import { useInventory } from "../../../inventory/context/InventoryContext";
import { addSale } from "../../services/salesService";
import { updateProduct } from "../../../inventory/services/inventoryService";
import { addMovement } from "../../../inventory/services/movementService";

function NewSale() {

  const { products, setProducts } = useInventory();

  const [selectedProductId, setSelectedProductId] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState([]);

  // Producto seleccionado
  const selectedProduct = products.find(
    (product) =>
      product.id === Number(selectedProductId)
  );

  // Agregar al carrito
  const handleAddToCart = () => {

    if (!selectedProduct) return;

    if (quantity <= 0) return;

    if (quantity > selectedProduct.stock) {
      alert("Stock insuficiente");
      return;
    }

    const saleItem = {
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity,
      subtotal:
        selectedProduct.price * quantity
    };

    setCart((prev) => [
      ...prev,
      saleItem
    ]);

    setQuantity(1);
  };

  const handleConfirmSale = () => {

    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // Guardar venta
    addSale({ items: cart, total });

    // Actualizar productos
    let updatedProducts = [...products];

    cart.forEach((item) => {

        const product = updatedProducts.find(
        (p) => p.id === item.productId
        );

        if (!product) return;

        const previousStock = product.stock;

        const newStock = previousStock - item.quantity;

        // Actualizar stock
        product.stock = newStock;

        // Registrar movimiento
        addMovement({
            productId: product.id,
            productName: product.name,
            type: "exit",
            quantity: item.quantity,
            previousStock,
            newStock,
            reason: "Venta"
        });

        // Persistir producto
        updateProduct(product);

    });

    setProducts([...updatedProducts]);

    alert("Venta realizada correctamente");

    setCart([]);
    };

  // Total venta
  const total = cart.reduce(
    (acc, item) =>
      acc + item.subtotal,
    0
  );

  return (
    <div className="new-sale-page">

      <h1>Nueva Venta</h1>

      <div className="sale-form">
        <select
          value={selectedProductId}
          onChange={(e) =>
            setSelectedProductId(e.target.value)
          }
        >

          <option value="">
            Selecciona un producto
          </option>

          {products.map((product) => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
              {" - "}
              Stock:
              {" "}
              {product.stock}

            </option>

          ))}

        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
        />

        <button onClick={handleAddToCart}>
          Agregar
        </button>
      </div>

      <div className="cart-section">
        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <p>
            No hay productos agregados.
          </p>
        ) : (
          <div className="cart-list">
            {cart.map((item, index) => (
              <div
                key={index}
                className="cart-item"
              >
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    {item.quantity}
                    {" x $"}
                    {item.price}
                  </p>
                </div>
                <strong>
                  $
                  {item.subtotal}
                </strong>
              </div>
            ))}
          </div>
        )}

        <div className="sale-total">
          <h2>
            Total:
            {" $"}
            {total}
          </h2>
        </div>
        
        <button
            className="confirm-sale-button"
            onClick={handleConfirmSale}
        >
            Confirmar Venta
        </button>

      </div>
    </div>
  );
}

export default NewSale;