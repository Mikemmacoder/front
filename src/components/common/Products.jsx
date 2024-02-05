import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"
import { PaginationContext } from '../../context/PaginationContext';

const Products = ({ }) => {
  const {user} = useContext(UserContext)
  const {addToCart, products} = useContext(CartContext)
  //Pagination
  const {paginateItems, renderPaginateButtons} = useContext(PaginationContext)
  const paginate = paginateItems(products) // parametros: array y cant de elementos a renderizar
                                              //retorna {itemsPagina, totalPaginas, paginaActual}
console.log('paginate.totalPaginas' + JSON.stringify(paginate.totalPaginas, null, 2))
  return (
    <div id="products-container">
      <h1>Products</h1>

      {paginate.itemsPagina.map((p) => ( 
        <div key={p._id}>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <p>{p.price}</p>
          <p>{p.stock}</p>
          <p>{p.code}</p>
          <p>{p.category}</p>
          <p>{p.status}</p>
          {user.role !== 'admin' &&
            <div>
              <button onClick={() => addToCart(p._id, user.cart, p.stock)}>Add To Cart</button>
            </div>
          }
        </div>
      ))}

      <div>{/* Renderizar botones de paginación, parámetros: totalPaginas y containerID */
        renderPaginateButtons(paginate.totalPaginas, "products-container")}
      
      </div>
    </div>
  );
};

export default Products;
