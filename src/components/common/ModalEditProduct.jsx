import React, { useState } from "react";
import './Modal.css'

const ModalEditProduct = ({ product, onEditProduct, onClose }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveClick = () => {
    const areAllFieldsFilled = Object.values(editedProduct).every((value) => value !== '');
    if (areAllFieldsFilled) {
      onEditProduct(editedProduct);
      onClose();
    } else {
      alert('Todos los campos deben contener un valor.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedProduct.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalEditProduct;
