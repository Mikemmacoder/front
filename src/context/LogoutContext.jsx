import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { CartContext } from "./CartContext";
import axios from "axios";
export const LogoutContext = createContext()

const LogoutContextProvider = ({ children }) => {
    const {user, setUser} = useContext(UserContext);
    const {cart, setCart} = useContext(CartContext);
    const navigate = useNavigate();

    const logout = () => {
        // Lógica para cerrar sesión
        setUser({});
        setCart([]);
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        axios.get('http://localhost:8080/api/sessions/logout', {withCredentials: true, credentials: 'include'})
        .then(res=>{
            navigate('/')
            alert('Logout de sesión exitoso')})
        .catch(err => alert(`Ocurrió un error :(\n${err}`))
        
      };

  return (<LogoutContext.Provider value={{logout}}> {children} </LogoutContext.Provider>
    
  )
}

export default LogoutContextProvider