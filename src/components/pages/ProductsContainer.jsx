import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../context/UserContext"
import { CartContext } from "../../context/CartContext"
import UserInformation from "../common/UserInformation"
import Pagination from "../common/Pagination"

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
        setProducts(res.data.payload);
      })
      .catch((error) => console.error('Error fetching products:', error));
    
  }, []);

  useEffect( ()=>{
      console.log('products: ', products);
  }, [products])
  

/* 
  const createProduct = ()=>{
    let newProduct = {
      title: 'Mikemma',
      description: 'coder',
      price: 7500,
      stock: 8,
      status: true,
      category: 'coder',
    }
    let data = axios.post('https://jsonplaceholder.typicode.com/posts', newProduct)
  } */
  return (
    <div>
      <UserInformation />
      <Pagination products={products} />
    </div>
  )
}

export default ProductsContainer