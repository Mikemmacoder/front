import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [input, setInput] = useState({
    email: '',
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
      const result = await axios.post('http://localhost:8080/api/sessions/forget-password', input, {
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
      <h1>Restablecer contraseña</h1>
      <form onSubmit={handleSubmit} id="FormPass">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={input.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Restablecer contraseña</button>
      </form>
    </>
  );
};

export default ForgotPassword;