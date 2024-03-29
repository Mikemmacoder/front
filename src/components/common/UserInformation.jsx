import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
import { LogoutContext } from "../../context/LogoutContext"

const UserInformation = () => {
    const {user, setUser} = useContext(UserContext)
    const {logout} = useContext(LogoutContext)
      
  return (
    <div>
        {!user && <p>Loading...</p>}
        <p>{user.first_name} {user.last_name}</p>
        <Link to="/profile">{user.email}</Link> 
        <p>Role: {user.role}</p>
        <button onClick={logout}>Logout</button>
        { user.role === "admin" && 
            <>
                <strong><Link to="/products/realtimeproducts">Administrar productos</Link></strong>
                <strong><Link to="/users">Administrar usuarios</Link></strong>
            </>
        }
        { user.role === "premium" && 
            <>
                <strong><Link to={`/Carts/${user.cart}`}>Cart</Link></strong>
                <strong><Link to="/">Chat</Link></strong>
                <strong><Link to="/products/realtimeproducts">Administrar productos</Link></strong>
            </>
        }
        { user.role === "user" && 
            <>
                <strong><Link to={`/Carts/${user.cart}`}>Cart</Link></strong>
                <strong><Link to="/">Chat</Link></strong>
            </>
        }
    </div>
  )
}

export default UserInformation