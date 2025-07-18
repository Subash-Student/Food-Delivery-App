import React, { useState } from 'react'
import Navbar from "./Components/Navbar/Navbar"
import {Route,Routes } from "react-router-dom"
import Home from './pages/home2/Home'
import Cart from './pages/cart/Cart'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaceOrder from './pages/place order/PlaceOrder'
import Footer from './Components/footer/Footer'
import LogInPopup from './Components/logInPopUp/LogInPopup'
import MyOrder from './pages/MyOrders/MyOrder'
import { useContext } from 'react'
import { StoreContext } from './Context/StoreContext'
import Loader from './Components/Loader/Loader'
// import Verifyed from './pages/Verify/Verifyed'

const App = () => {
  const[showLogin,setShowLogin] = useState(false);

  const {isLoading,setIsloading} = useContext(StoreContext);
  return (
    <>
    {showLogin?<LogInPopup setShowLogin={setShowLogin}/>:<></>}
    <ToastContainer />
    <div className='app'>
      {isLoading && <Loader />}
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/order' element={<PlaceOrder />} />
         <Route path='myorders' element={<MyOrder />} />


{/* WAITING FOR PAYMRNT VERIFICATION */}


         {/* <Route path='/verify' element={<Verifyed />} /> */}
      </Routes>
    </div>
    <Footer />
    </>
    
  )
}

export default App