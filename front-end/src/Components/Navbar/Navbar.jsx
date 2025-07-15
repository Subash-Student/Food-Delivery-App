import React, { useContext, useState } from 'react'
import{Link,useNavigate} from "react-router-dom"
import './Navbar.css'
import {toast} from "react-toastify"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {

const [menu,setMenu]=useState("Home");
const { getTotalCartAmount,token,setToken} = useContext(StoreContext);
const navigate = useNavigate();

const logOut = ()=>{
  localStorage.removeItem("token");
  setToken("");
  navigate("/");
  toast.info("You Are Loged Out")


}
const navihdlr = ()=>{
  navigate("/myorders")
}
  return (
    <div className='navbar'>
       <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link> 
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
            <a href='#AppDownload' onClick={()=>setMenu("Mobile")} className={menu==="Mobile"?"active":""}>Mobile App</a>
            <a href='#footer' onClick={()=>setMenu("Contact-Us")}className={menu==='Contact-Us'?"active":""}>Contact Us</a>
            <a href='https://food-delivery-app-admin-ashy.vercel.app' target='blank' className={menu==='Contact-Us'?"active":""}>Admin Panel</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon}/>
            <div className="navbar-search-icon">
              <Link to='/cart'><img src={assets.basket_icon}/></Link>  
                <div className={getTotalCartAmount()===0 ? "" :"dot"}/>
            </div>
            {!token ? <button onClick={()=>setShowLogin(true)}>Sign In</button>
            :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="navprofile-dropdown">
                <li><img  src={assets.bag_icon} alt="" /><p onClick={navihdlr}>Orders</p></li>
                <hr />
                <li><img src={assets.logout_icon} alt="" /><p onClick={logOut}>LogOut</p></li>
              </ul>
            </div>

            }
           
        </div>
    </div>
  )
}

export default Navbar