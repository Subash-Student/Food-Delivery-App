import React, {  useContext, useState } from 'react'
import "./login.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const LogInPopup = ({setShowLogin}) => {
    const[currentState,setCurrentState] = useState("Log In");
    const {url} = useContext(StoreContext);
    const [data,setData] = useState({
        name:"",
        email:'',
        password:""
    });

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setData((data)=>({...data,[name]:value}));
    }

const onLogin = async(event)=>{
    event.preventDefault();
    let 

}




  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currentState === "Log In"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                
                <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder='Your Email' required />
                <input onChange={onChangeHandler} value={data.password} name='password' type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currentState==="Sign Up" ?"Create Account" : "Log In"}</button>
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