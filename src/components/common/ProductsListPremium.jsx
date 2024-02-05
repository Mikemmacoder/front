import React, { useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { PaginationContext } from "../../context/PaginationContext";

const ProductListPremium = ({handleEditClick, deleteProduct}) => {
  const {products} = useContext(CartContext);
  const {user} = useContext(UserContext);

  const {paginateItems, renderPaginateButtons} = useContext(PaginationContext)//Paginate
  const productsPremium = products.filter((elemento) => elemento.owner === user.email);
  const paginate = paginateItems(productsPremium)//Paginate
  console.log('paginate.totalPaginas' + JSON.stringify(paginate.totalPaginas, null, 2))
  if (productsPremium.length == 0){
    return <p>Aún no has publicado productos</p>
  }
    return (
      <div id="products-user-premium">
        <h2>Productos publicados</h2>
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
                <td>
                  <button onClick={() => handleEditClick(product)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>{/* Renderizar botones de paginación, parámetros: totalPaginas y containerID */
        paginate.totalPages >1 && paginate.totalPages!== 'undefined' ?
          renderPaginateButtons(paginate.totalPaginas, "products-user-premium") : null
         
        }
      </div>
      </div>
    );
  }

export default ProductListPremium;
