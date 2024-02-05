import React, { useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { PaginationContext } from "../../context/PaginationContext";

const ProductListAdmin = ({handleEditClick, deleteProduct}) => {
  const {products} = useContext(CartContext);
  const {paginateItems, renderPaginateButtons} = useContext(PaginationContext)//Paginate
  const paginate = paginateItems(products)
  if (products.length == 0){
    return <p>No hay productos publicados</p>
  }
  return (
    <div id="products-user-admin">
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
          {paginate.itemsPagina.map((product) => (
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
      <div>{/* Renderizar botones de paginación, parámetros: totalPaginas y containerID */
          renderPaginateButtons(paginate.totalPaginas, "products-user-admin") 
        }
      </div>
    </div>
  );
};

export default ProductListAdmin;
