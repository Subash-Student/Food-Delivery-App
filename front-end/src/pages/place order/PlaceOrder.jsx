import React, { useContext,useEffect,useState } from 'react';
import "./placeOrder.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { StoreContext } from '../../Context/StoreContext';
import {toast} from "react-toastify"

const PlaceOrder = () => {

  const{getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  

 

  const[data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    pinCode:"",
    country:"",
    phone:""
});

const onChangeHandler = (e)=>{
  const name = e.target.name;
  const value = e.target.value;

  setData(data=>({...data,[name]:value}))
}


const placeOrder = async(e)=>{
  e.preventDefault();
  let orderItems = [];
  food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"] = cartItems[item._id];
      orderItems.push(itemInfo)
    }
  })
  let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2,
  }
let response = await axios.post(`${url}/api/order/place`,orderData,{headers:{token}});
if(response.data.success){
  const {session_url} = response.data;
  window.location.replace(session_url);
}else{
  toast.success("Your Order Is Placed");
  setTimeout(()=>{
    navigate("/")
  },1500)
}

}

const navigate = useNavigate();

useEffect(()=>{
  if(!token){
    navigate("/cart")
  }else if(getTotalCartAmount() === 0){
    navigate("/cart")
  }

},[token])


  
  return (
    <form onSubmit={placeOrder} className={"place-order"} >
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={data.email} placeholder="Email Address" type='email'/>
        <input required onChange={onChangeHandler} name='street' value={data.street} placeholder="Street" type='text'/>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City'/>
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required onChange={onChangeHandler} name='pinCode' value={data.pinCode} type="text" placeholder='Pin Code'/>
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text"  placeholder='Phone'/>
      </div>

      <div className="place-order-right">

      <div className='cart-total'>
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>$ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>$ {getTotalCartAmount()=== 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>$ {getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button type='submit' >PROCEED TO PAYMENT</button>
      </div>

      </div>
    </form>
  )
}

export default PlaceOrder