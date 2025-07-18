import React, {  useState } from 'react'
import "./add.css"
import { assets } from '../../assets/assets'
import {toast} from "react-toastify"
import axios from "axios";

const Add = ({setIsloading}) => {

    const url = "https://food-delivery-app-backend-plum.vercel.app";
    const[image,setImage]= useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });

    const onChangeHandler = (e)=>{
       const name = e.target.name;
       const value = e.target.value;
       setData(prev =>({...prev,[name]:value}))
    }


    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);
       
        setIsloading(true)
        const response = await axios.post(`${url}/api/food/add`,formData);
        setIsloading(false)
        if(response.data.success){
           setData({
            name:"",
            description:"",
            price:"",
            category:"Salad"
           })
           setImage(false)
           toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }

    }




  return (
    <div className='add'>
        <form action="" className='flex-col' onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
                
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='type here' />
            </div>
            <div className="add-product-desc flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description"  rows="16" placeholder='Write content here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select  onChange={onChangeHandler} name="category" >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input  onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$ ' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>

    </div>
  )
}

export default Add