import React, { useState } from 'react'
import{Link} from "react-router-dom"
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = ({setShowLogin}) => {

const [menu,setMenu]=useState("Home");

  return (
    <div className='navbar'>
        <img src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
            <a href='#AppDownload' onClick={()=>setMenu("Mobile")} className={menu==="Mobile"?"active":""}>Mobile App</a>
            <a href='#footer' onClick={()=>setMenu("Contact-Us")}className={menu==='Contact-Us'?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon}/>
            <div className="navbar-search-icon">
                <img src={assets.basket_icon}/>
                <div className="dot"/>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar