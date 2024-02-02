import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"

const Pagination = ({ products }) => {
  const {user} = useContext(UserContext)
  const {cart, addToCart} = useContext(CartContext)

  const [elementosPorPagina] = useState(6); // indicar cantidad de elementos a mostrar por página
  const [paginaActual, setPaginaActual] = useState(1);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFin = paginaActual * elementosPorPagina;
  const productosPagina = products.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(products.length / elementosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    const productsContainerRef = document.getElementById('products-container');
    if (productsContainerRef) {
      productsContainerRef.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    // Resetear la página actual cuando cambia la lista de productos
    setPaginaActual(1);
  }, [products]);

  return (
    <div id="products-container">
      <h1>Products</h1>

      {productosPagina.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <p>{p.price}</p>
          <p>{p.stock}</p>
          <p>{p.code}</p>
          <p>{p.category}</p>
          <p>{p.status}</p>
          {user.role !== 'admin' &&
            <div>
              <button onClick={() => addToCart(p.id, user.cart, p.stock)}>Add To Cart</button>
            </div>
          }
        </div>
      ))}

      <div>
        {/* Renderizar botones de paginación */}
        {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numeroPagina) => (
          <button key={numeroPagina} onClick={() => cambiarPagina(numeroPagina)}>
            {numeroPagina}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
