import React from 'react'
import Navbar from "./Components/Navbar/Navbar"
import {Route,Routes } from "react-router-dom"
import Home from './pages/home2/Home'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/place order/PlaceOrder'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/order' element={<PlaceOrder />} />
      </Routes>
    </div>
  )
}

export default App