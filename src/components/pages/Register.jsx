import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: '',
    age: '',
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
      const result = await axios.post('http://localhost:8080/api/sessions/register', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      // Manejar la respuesta del servidor (result) según tus necesidades
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Registrar usuario</h1>
      <form onSubmit={handleSubmit} id="FormRgt">
        <label htmlFor="first_name">First name:</label>
        <input
          type="text"
          name="first_name"
          value={input.first_name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="last_name">Last name</label>
        <input
          type="text"
          name="last_name"
          value={input.last_name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={input.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          type="text"
          name="age"
          value={input.age}
          onChange={handleChange}
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
        <button type="submit">Crear</button>
        <Link to="/">Login</Link>
      </form>
    </>
  );
};

export default Register;