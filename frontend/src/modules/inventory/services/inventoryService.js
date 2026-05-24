import initialProducts from "../data/products";

const STORAGE_KEY = "inventory_products";

// Obtener productos
export const getProducts = () => {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (storedProducts) {
    return JSON.parse(storedProducts);
  }

  // Primera vez: usar datos iniciales
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));

  return initialProducts;
};

// Guardar productos
export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// Agregar producto
export const addProduct = (newProduct) => {
  const products = getProducts();

  const updatedProducts = [...products, newProduct];

  saveProducts(updatedProducts);

  return updatedProducts;
};

// Editar producto
export const updateProduct = (updatedProduct) => {
  const products = getProducts();

  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );

  saveProducts(updatedProducts);

  return updatedProducts;
};

// Eliminar producto
export const deleteProduct = (productId) => {
  const products = getProducts();

  const updatedProducts = products.filter(
    (product) => product.id !== productId
  );

  saveProducts(updatedProducts);

  return updatedProducts;
};