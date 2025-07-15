import React from 'react'
import "./order.css"
import {toast} from "react-toastify";
import axios from "axios";
import {assets} from "../../assets/assets"
import { useEffect,useState } from 'react';



const Order = ({setIsloading}) => {

  const [orders,setOrders] = useState([]);
  const url = "https://food-delivery-app-backend-plum.vercel.app";

  const fetchAllOrder = async()=>{
    setIsloading(true)
    const response = await axios.get(url+"/api/order/list");
    setIsloading(false)
    if(response.data.data){
      setOrders(response.data.data);
    }else{
         toast.error(error)
    }
  }
 useEffect(()=>{
     fetchAllOrder();
 },[])

 const updateStatus = async(e,orderId)=>{
  const response = await axios.post(url+"/api/order/status",{orderId,status:e.target.value});
  if(response.data.success){
    await fetchAllOrder();
  }
 }



  return (
    <div className='order add'>
       <h3>Order Page</h3>
       <div className="order-list">
        {
          orders.map((order,index)=>(
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {
                    order.items.map((item,index)=>{
                      if(index === order.items.length - 1){
                        return item.name +" x " + item.quantity;
                      }else{
                        return item.name +" X " + item.quantity + " , "
                      }
                    })
                  }
                </p>
                <p className="order-item-name">
                  {
                    order.address.firstName + " " + order.address.lastName
                  }
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + " , "}</p>
                  <p>{order.address.city + " , " + order.address.state +" , " + order.address.country +" , " + order.address.pinCode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
                 </div>
                 <p>Items : {order.items.length}</p>
                 <p>$ {order.amount}</p>
                 <select onChange={(e)=>updateStatus(e,order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                 </select>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default Order