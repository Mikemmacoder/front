import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import ForgotPassword from './components/pages/ForgotPassword.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CartContextProvider from './context/CartContext.jsx';
import UsertContextProvider from './context/UserContext.jsx';
import ProductsContainer from './components/pages/ProductsContainer.jsx';
import Cart from './components/pages/Cart.jsx';
import AdminProducts from './components/pages/AdminProducts.jsx';


function App() {
  return (
    <BrowserRouter>
      <UsertContextProvider> 
        <CartContextProvider> 
            <Routes>
              <Route path='/' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/forget-password' element={<ForgotPassword />}/>
              <Route path='/products' element={<ProductsContainer/>}/>
              <Route path='/carts/:cid' element={<Cart/>}/>
              <Route path='/products/realtimeproducts' element={<AdminProducts/>}/>
            </Routes>
        </CartContextProvider>
      </UsertContextProvider>
    </BrowserRouter>
  );
}

export default App
