import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom"
const Profile = () => {
    const {user} = useContext(UserContext)
  return (

    <div>
        <div>
        <h1>Bienvenido{user.first_name} {user.last_name}</h1>
        </div>
        <div>
        <ul>
            <li>First name: {user.first_name}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
        </ul>
        </div>
        <div>
        <a href="/products">Products</a>
        | 
        {user.role !== "admin" && <Link to={`/carts/${user.cart}`}>Cart</Link> }
        
        <Link>[Logout]</Link>
        </div>
    </div>
  )
}

export default Profile