import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import{Routes,Route} from "react-router-dom"
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Orders/Order'
import Loader from '../../front-end/src/Components/Loader/Loader'

const App = () => {
  const [isLoading,setIsloading] = useState(false)
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
      <Sidebar />
      {isLoading && <Loader />}
      <Routes>
        <Route path='/add' element={<Add setIsloading={setIsloading} />} />
        <Route path='/list' element={<List setIsloading={setIsloading} />} />
        <Route path='/orders' element={<Order setIsloading={setIsloading} />} />
      </Routes>
      
    </div>
    </div>
  )
    
    
}

export default App