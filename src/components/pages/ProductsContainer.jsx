import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"
import UserInformation from "../common/UserInformation"
import Products from "../common/Products"

const ProductsContainer = () => {
  const {user} = useContext(UserContext)
  const {products, setProducts} = useContext(CartContext)
  
  useEffect(() => {
    console.log('User information en products:', user);
  }, [user]);

  useEffect(() => {
      axios.get('http://localhost:8080/api/products', {
        withCredentials: true,
      })
      .then(res => {
        setProducts(res.data.payload,  () => {
          console.log('productos cargados: ' + JSON.stringify(products,null,2))
        });
      })
      .catch((error) => console.error('Error fetching products:', error));
    
  }, []);

  useEffect( ()=>{
      console.log('products: ', products);
  }, [products])
  
  return (
    <div>
      <UserInformation />
      <Products/>
    </div>
  )
}

export default ProductsContainer