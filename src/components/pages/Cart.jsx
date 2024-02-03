import { useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { UserContext } from "../../context/UserContext";

//hay que hacer un fech directamente de la BD
//y obtener el carrito con los datos completos de los productos

const Cart = () => {
  const { cart, getProductsFromCart, deleteProdFromCart, decrementProdQuantity, incrementProductQuantity, finalizePurchase } = useContext(CartContext);
  const { user } = useContext(UserContext);

useEffect(() => {
  getProductsFromCart() 
}, []);

  return (
    <div>
      <h2>Products from Cart</h2>
      <hr />

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <td>
                  <strong>Producto</strong>
                </td>
                <td>
                  <strong>Descripción</strong>
                </td>
                <td>
                  <strong>Precio</strong>
                </td>
                <td>
                  <strong>Código</strong>
                </td>
                <td>
                  <strong>Stock</strong>
                </td>
                <td>
                  <strong>Cantidad</strong>
                </td>
                <td>
                  <strong>Eliminar</strong>
                </td>
              </tr>
            </thead>
            <tbody id="tbody">
              {cart.map((product) => (
                product.quantity > 0 ? (
                  <tr key={product.product._id}>
                    <td>{product.product.title}</td>
                    <td>{product.product.description}</td>
                    <td>{product.product.price}</td>
                    <td>{product.product.code}</td>
                    <td>{product.product.stock}</td>
                    <td>
                      <button
                        id="btnRest"
                        onClick={() =>
                          decrementProdQuantity(
                            product.product._id,
                            product.quantity
                          )
                        }
                      >
                        -
                      </button>
                      {product.quantity}
                      <button
                        id="btnAdd"
                        onClick={() =>
                          incrementProductQuantity(
                            product.product._id,
                            product.quantity,
                            product.product.stock
                          )
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        id="btnDelete"
                        onClick={() =>
                          deleteProdFromCart(product.product._id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
          <button onClick={finalizePurchase}>Finalizar compra</button>
        </div>
      )}
      <a href="/products">&lt; Volver a productos</a>
    </div>
  );
};

export default Cart;
