import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { UserContext } from "./UserContext";
export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([])
  const {user} = useContext(UserContext);
//------- Cargar el carrito desde el Local Storage al iniciar la aplicación --------
  useEffect(() => { 
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData != null) {
      setCart(cartData);
    }
  }, []);
  //-------- Guardar el carrito en el Local Storage cuando cambie --------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (pid, cid, stock) => {
    try{
      const cartData = JSON.parse(localStorage.getItem("cart"))
      const productFound = cartData.find(elemento => elemento.product === pid);
      let exist = cartData.some((elemento) => elemento.product === pid)
      if ( (!exist && stock > 0) || (exist && productFound.quantity < stock) ) {
        const response = await axios.post(`http://localhost:8080/api/carts/${cid}/products/${pid}`,{}, {
          withCredentials: true, credentials: 'include'
        })
        if (exist) {
          let newArray = cartData.map((elemento) => {
            if (elemento.product === pid) {
              return { ...elemento, quantity: elemento.quantity +1 };
            } else {
              return elemento;
            }
          });
          setCart(newArray)
            console.log('cart:' + JSON.stringify(cart,null,2))
            alert(`Ok. Todo salió bien! :)\nSe incrementó la cantidad del producto en el carrito!`)          
        } else {
          setCart([...cart, {product: pid, quantity: 1}]);
          console.log('nuevo cart:' + JSON.stringify(cart,null,2))
          alert(`Ok. Todo salió bien! :)\nEl producto se agregó al carrito!`)
        }
      }else {
        alert('No se ha podido añadir el producto al carrito\nHas alcanzado el máximo de stock' )
      }
    }catch(error){
      alert(`Ocurrió un error :(\n${error.response.data.error}`);
  }
  }
  // ----- Local Storage -----
  document.addEventListener("DOMContentLoaded", () => {
    let carritoLocal = JSON.parse(localStorage.getItem("cart"));
    if (carritoLocal != null) {
      setCart(carritoLocal);
    }
  });

    let data = {cart, setCart, addToCart, products, setProducts }; // Acá escribo todas las variables y funciones que quiero pasar a los children
  return <CartContext.Provider value={data}> {children} </CartContext.Provider>;
};

export default CartContextProvider;