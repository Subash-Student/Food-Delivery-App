import React from 'react'
import Navbar from './components/Navbar/Navbar'
import{Routes,Route} from "react-router-dom"
import Sidebar from './components/sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Orders/Order'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path='/add' element={<Add />} />
        <Route path='/list' element={<List />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
      
    </div>
    </div>
  )
    
    
}

export default App