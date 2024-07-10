import React, { useState } from 'react'
import "./login.css"
import { assets } from '../../assets/assets'

const LogInPopup = ({setShowLogin}) => {
    const[currentState,setCurrentState] = useState("Log In")
  return (
    <div className='login-popup'>
        <form  className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currentState === "Log In"?<></>:<input type="text" placeholder='Your Name' required />}
                
                <input type="email" placeholder='Your Email' required />
                <input type="password" placeholder='Password' required />
            </div>
            <button>{currentState==="Sign Up" ?"Create Account" : "Log In"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currentState==="Log In"?
            <p>Creare a new account ? <span onClick={()=>setCurrentState("Sign Up")}> Click here</span></p>
            :
            <p>Already have an account ? <span onClick={()=>setCurrentState('Log In')}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LogInPopup