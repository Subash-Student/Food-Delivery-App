import React, { useContext, useEffect, useState } from 'react'
import "./myorder.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios"
import { assets } from '../../assets/assets';


const MyOrder = () => {

    const [data,setData] = useState([]);
    const{url,token} = useContext(StoreContext);

    const fetchOrders = async()=>{
        const response = await axios.post(`${url}/api/order/userorders`,{},{headers:{token}});
            setData(response.data.data);
       
    }
    useEffect(()=>{
         if(token){
            fetchOrders();
         }
    },[token])

  return (
    <div className='my-order'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div className="my-orders-order" key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {
                                    order.items.map((item,index)=>{
                                        if(index === order.items.length - 1){
                                             return item.name+" X "+item.quantity
                                        }else{
                                            return item.name+" X "+item.quantity+" , "
                                        }
                                    })
                                }
                            </p>
                            <p>$ {order.amount}</p>
                            <p>Items : {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MyOrder