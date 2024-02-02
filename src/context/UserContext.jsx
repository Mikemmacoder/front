import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    // Cargar el user desde el Local Storage al iniciar la aplicación
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData != null) {
      setUser(userData);
    }
  }, []);
  //-------- Guardar el user en el Local Storage cuando cambie --------
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  // ----- Local Storage -----
  document.addEventListener("DOMContentLoaded", () => {
    let userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal != null) {
      setUser(userLocal);
    }
  });

  let data = {user, setUser}; // Acá escribo todas las variables y funciones que quiero pasar a los children
  return <UserContext.Provider value={data}> {children} </UserContext.Provider>;
};

export default UserContextProvider;