import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PaginationContext } from '../../context/PaginationContext';

const UsersAdministration = () => {
    const [users, setUsers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [role, setRole] = useState("user");
    const {paginateItems, renderPaginateButtons} = useContext(PaginationContext)


    const getUsers = async () =>{
        const response = await axios.get('http://localhost:8080/api/users', {withCredentials: true, credentials: 'include'})
        setUsers(response.data.usersDTO)
    }
    useEffect(() => {
        try{ getUsers()}
        catch (error) {alert(`Ocurrió un error: ${error.message}`)}
    }, []);

    const createUser = async () => {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age,
        role: role,
      };
      axios.post("http://localhost:8080/api/users", newUser, {withCredentials: true, credentials: 'include'})
        .then((result) => {
          if (result.status === "error") throw new Error(result.error);
          setFirstName("");
          setLastName("");
          setEmail("");
          setAge(0);
          getUsers()
          alert(`El usuario con email ${result.data.payload.email} se ha agregado con éxito`);
        })
        .catch((err) => alert(`Ocurrió un error: ${err}`));
    };
  
    const deleteUser = async (userId) => {
        if (userId === undefined) {alert("ID del usuario no definido. No se puede eliminar.")}
        try {
            const result = await axios.delete(`http://localhost:8080/api/users/${userId}`, {
            withCredentials: true, credentials: 'include'
        });
        alert(result.data.message); // result.data.message = 1 usuario eliminado correctamente.
        getUsers()
        } catch(err) {alert(`Ocurrió un error: ${err}`)};
    };
    const delInactiveUsers = async () => {
        try {
          const result = await axios.delete(`http://localhost:8080/api/users`, {
            withCredentials: true, credentials: 'include'
          });
          if (result.status === "error") throw new Error(result.error);
          alert(result.data.message); // result.data.message = 1 usuario eliminado correctamente.
          getUsers()
      } catch(err) {alert(`Ocurrió un error: ${err}`)};
      };
  
    const changeUserRole = async (userId) => {
      if (userId === undefined) alert("ID del usuario no definido. No se puede modificar.")
      try{
        const result = await axios.get(`http://localhost:8080/api/users/premium/${userId}`, {withCredentials: true, credentials: 'include'})
        if (result.status === "error") throw new Error(result.error);
        alert(result.data.message); //"message":"Se ha actualizado el rol del usuario"
        getUsers()
        } catch(err) { alert(`Ocurrió un error: ${err}`)}
    };

    const handleRoleChange = (event) => setRole(event.target.value);
    
    const paginate = paginateItems(users)
    return (
      <div>
        <p>
          <a href="/products">{"<"} Volver a productos</a>
        </p>
        <h1>Registra un usuario</h1>
        <form>
          first_name:
          <input type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <br />
          last_name:
          <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <br />
          email:
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          age:
          <input type="number" name="age" min="0" required value={age} onChange={(e) => setAge(e.target.value)} />
          <br />
          <label htmlFor="role">Selecciona el rol:</label>
          <select id="role" name="role" value={role} onChange={handleRoleChange}>
            <option value="user">User</option>
            <option value="premium">Premium</option>
            <option value="admin">Admin</option>
          </select>
          <button type="button" onClick={createUser}>
            Registrar usuario
          </button>
        </form>
        <hr />
        <h2>Usuarios</h2>
        {users.length === 0 ? (
          <p id="text">No hay usuarios activos</p>
        ) : (
          <table id="tablaUsers">
            <thead>
              <tr>
                <td>
                  <strong>Nombre</strong>
                </td>
                <td>
                  <strong>Email</strong>
                </td>
                <td>
                  <strong>Rol</strong>
                </td>
                <td>
                  <strong>Última conexión<nav></nav></strong>
                </td>
                <td>
                  <strong>Modificar rol</strong>
                </td>
                <td>
                  <strong>Eliminar</strong>
                </td>
              </tr>
            </thead>
            <tbody id="u_tbody">
              {paginate.itemsPagina.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.last_connection}</td>
                  <td>
                    <button id="btnRole" onClick={() => changeUserRole(user._id)}>
                      Modificar rol
                    </button>
                  </td>
                  <td>
                    <button id="btnDelUser" onClick={() => deleteUser(user._id)}>
                      Eliminar usuario
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={delInactiveUsers }>Eliminar usuarios inactivos</button>
        <div>{/* Renderizar botones de paginación, parámetros: totalPaginas y containerID */
        renderPaginateButtons(paginate.totalPaginas, "tablaUsers")}
        </div>
      </div>
    );
}

export default UsersAdministration