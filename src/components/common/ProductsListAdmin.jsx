import React, { useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductListAdmin = ({handleEditClick, deleteProduct}) => {
  const {products} = useContext(CartContext);
  if (products.length == 0){
    return <p>No hay productos publicados</p>
  }
  return (
    
    <div>
      <table id="realProductsTable">
        <thead>
          <tr>
            <td></td>
            <td>Nombre</td>
            <td>Descripción</td>
            <td>Precio</td>
            <td>Stock</td>
            <td>Código</td>
            <td>Categoría</td>
            <td>Status</td>
            <td>Propietario</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.code}</td>
              <td>{product.category}</td>
              <td>{product.status}</td>
              <td>{product.owner}</td>
              <td>
                <button onClick={() => handleEditClick(product)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin;
