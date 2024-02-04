import React, { useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

const ProductRegistration = () => {
  const {products, setProducts} = useContext(CartContext)
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    code: "",
    price: 0,
    status: true,
    stock: 0,
    category: "",
    thumbnails: [],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:8080/api/products`,productData, {
          withCredentials: true, credentials: 'include'
        })
        setProducts(response.data.payload)
        setProductData({
          title: "",
          description: "",
          code: "",
          price: 0,
          status: true,
          stock: 0,
          category: "",
          thumbnails: [],
        })
      };

  return (
    <div>
      <h1>Registra un producto</h1>
      <p>
        <a href="/products">&lt; Volver a productos</a>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Code:
          <input
            type="text"
            name="code"
            value={productData.code}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            min="0"
            value={productData.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="checkbox"
            name="status"
            checked={productData.status}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            min="0"
            value={productData.stock}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Thumbnails:
          <input
            type="file"
            name="thumbnails"
            onChange={handleInputChange}
            multiple
          />
        </label>
        <br />
        <input type="submit" value="Registrar producto" id="createBtn" />
      </form>
      <hr />
    </div>
  );
};

export default ProductRegistration;
