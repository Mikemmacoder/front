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
      const productFound = cartData.find(elemento => elemento.product._id === pid);
      let exist = cartData.some((elemento) => elemento.product._id === pid)
      if ( (!exist && stock > 0) || (exist && productFound.quantity < stock) ) {
        const response = await axios.post(`http://localhost:8080/api/carts/${cid}/products/${pid}`,{}, {
          withCredentials: true, credentials: 'include'
        })
        if (exist) {
          let newArray = cartData.map((elemento) => {
            if (elemento.product._id === pid) {
              return { ...elemento, quantity: elemento.quantity +1 };
            } else {
              return elemento;
            }
          });
          setCart(newArray)
            console.log('cart:' + JSON.stringify(cart,null,2))
            alert(`Ok. Todo salió bien! :)\nSe incrementó la cantidad del producto en el carrito!`)          
        } else {
          setCart([...cart, {product: {_id: pid}, quantity: 1}]);
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

  const getProductsFromCart = async () => {
    await axios.get(`http://localhost:8080/api/carts/${user.cart}`, {
          withCredentials: true, credentials: 'include'
    })
    .then(res => { 
      console.log('cart:' + JSON.stringify(res.data.payload.products,null,2));
      setCart(res.data.payload.products, () => {
        localStorage.setItem("cart", JSON.stringify(cart));
      })
    })
    .catch(err => alert(`Ocurrió un error :(\n${err}`))
  }
  const deleteProdFromCart = (pid) => {
    pid === undefined && alert("ID del producto no definido. No se puede eliminar.");
    let newCart = cart.filter( elemento =>elemento.product._id !== pid)
    setCart(newCart)
    console.log('nuevo cart:' + JSON.stringify(newCart,null,2))
    alert('Se eliminó el producto del carrito')
  }

  const decrementProdQuantity = (pid, quantity) => {
    quantity == 1 && deleteProdFromCart(pid)
    let newCart = cart.map((elemento) => {
      if (elemento.product._id === pid) {
        return { ...elemento, quantity: elemento.quantity -1 };
      } else {
        return elemento;
      }
    });
    setCart(newCart)
    alert('Se modificó la cantidad del producto en el carrito')
  };
  const incrementProductQuantity = (pid, quantity, stock) =>{
    if (stock > quantity) {
      let newCart = cart.map((elemento) => {
        if (elemento.product._id === pid) {
          return { ...elemento, quantity: elemento.quantity +1 };
        } else {
          return elemento;
        }
      });
      setCart(newCart)
      alert('Se modificó la cantidad del producto en el carrito')
    } else{
      alert('Has alcanzado el máximo de stock' )
    }
  }
  const finalizePurchase = () => {
    let newCart = JSON.parse(localStorage.getItem("cart"));
    let productsToBuy ={products: newCart} 
    axios.put(`http://localhost:8080/api/carts/${user.cart}`, productsToBuy, {
      withCredentials: true, credentials: 'include'
    })
    .then(response => {
      console.log(response.data); // Maneja la respuesta exitosa
      axios.get(`http://localhost:8080/api/carts/${user.cart}/purchase`, {
        withCredentials: true})
        .then(res => {
          console.log(res.data.payload)
          const {code,amount, purchaser, purchase_datetime} = res.data.payload
          alert(`Compra finalizada con éxito\n Comprador: ${purchaser} \n Código de compra: ${code}\n Fecha de compra: ${purchase_datetime}\n Total: $${amount}`)
          setCart([])
        })
        .catch(error => {
          console.error(error)
          alert(`Ocurrió un error :(\n${error.response.data.error}`);
        })
    })
    .catch(error => {
      console.error(error)
      alert(`Ocurrió un error :(\n${error.response.data.error}`);
    });
    }

  // ----- Local Storage -----
  document.addEventListener("DOMContentLoaded", () => {
    let carritoLocal = JSON.parse(localStorage.getItem("cart"));
    if (carritoLocal != null) {
      setCart(carritoLocal);
    }
  });

    let data = {cart, setCart, addToCart, products, setProducts, getProductsFromCart, deleteProdFromCart, decrementProdQuantity, incrementProductQuantity, finalizePurchase }; // Acá escribo todas las variables y funciones que quiero pasar a los children
  return <CartContext.Provider value={data}> {children} </CartContext.Provider>;
};

export default CartContextProvider;