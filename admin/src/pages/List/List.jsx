import React, { useEffect, useState } from 'react';
import axios from "axios";
import {toast} from "react-toastify";
import "./list.css";


const List = () => {

  const url = "https://food-delivery-app-backend-eta.vercel.app";
  const [list,setList] = useState([]);

  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error("Error")
    }
  }
useEffect(()=>{
fetchList();
},[])


const removeFood =async(foodId)=>{
const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
await fetchList();
if(response.data.success){
  toast.success(response.data.message)
}else{
  toast.error("Error");
}
}


  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-formate title">
           <b>Image</b>
           <b>Name</b>
           <b>Category</b>
           <b>Price</b>
           <b>Action</b>
          </div>
          {list.map((item,index)=>(
            <div className="list-table-formate" key={index}>
              <img src={item.image} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>

            </div>
          ))}
        </div>
    </div>
  )
}

export default List