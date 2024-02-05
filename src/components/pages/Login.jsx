import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';

const Login = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const {cart, setCart, getProductsFromCart} = useContext(CartContext)
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:8080/api/sessions/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const {_id, first_name, last_name, email, role, cart } = result.data
      const userData = {_id, first_name, last_name, email, role, cart}
      setUser(prevUser => {
        console.log('user en login: ', prevUser);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
      });
        // Cargar el carrito desde DB al cargar la app
        user.role !== 'admin' && getProductsFromCart()
      
      navigate('/products')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} id="FormLgn">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={input.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          required
        />
        <br />
        <a href="/forget-password">Olvidé mi contraseña</a>
        <br />
        <button type="submit">Iniciar sesión</button>
        |<Link to="/api/sessions/github">Login with GitHub</Link>|
        <Link to="/register">Register</Link>
      </form>
    </>
  );
};

export default Login;