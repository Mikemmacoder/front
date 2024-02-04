import ProductRegistration from "../common/ProductRegistration"
import ProductList from "../common/ProductsList"
import ModalEditProduct from "../common/ModalEditProduct";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const AdminProducts = () => {
  const {products, setProducts} = useContext(CartContext);

// Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products", {
            withCredentials: true, credentials: 'include'
          });
        setProducts(response.data.payload);
      } catch (error) {
        console.error("Error al obtener la lista de productos:", error.message);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/products/${id}`, {
        withCredentials: true, credentials: 'include'
      });
      if (response.data.status === "error") {
        throw new Error(response.data.error);
      }
      setProducts(response.data.payload);
      alert("El producto ha sido eliminado");
    } catch (error) {
      alert(`Ocurrió un error: ${error.message}`);
    }
  };

  // Logica para editar productos
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

const handleEditProduct = async (editedProduct) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/products/${editedProduct.id}`, editedProduct, {
      withCredentials: true, credentials: 'include'
    });
    if (response.status === 200) {
      const editedIndex = products.findIndex((product) => product.id === editedProduct.id);
      setProducts((prevProducts) => [
        ...prevProducts.slice(0, editedIndex),
        editedProduct,
        ...prevProducts.slice(editedIndex + 1),
      ]);
      setIsModalOpen(false);
      setSelectedProduct(null);
    } else {
      alert('La solicitud PUT no fue exitosa:', response);
    }
  } catch (error) {
    alert('Error durante la solicitud PUT:', error);
  }
};


  return (
    <div>
        <ProductRegistration/>
        <ProductList handleEditClick={handleEditClick} deleteProduct={deleteProduct}/>
        {isModalOpen && (
          <ModalEditProduct
            product={selectedProduct}
            onEditProduct={handleEditProduct}
            onClose={() => setIsModalOpen(false)}
          />
        )}
    </div>
  )
}

export default AdminProducts