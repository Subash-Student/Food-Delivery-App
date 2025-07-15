import { createContext,  useEffect,  useState } from "react";
import axios from "axios"
// import {food_list} from "../assets/assets"

export const StoreContext = createContext(null);


const StoreContextProvider = (props) =>{

    const[cartItems,setCartItems] = useState({});
    const url = "https://food-delivery-app-backend-plum.vercel.app";
    const [token,setToken] = useState("");
    const[food_list,setFoodList] = useState([]);
   const[isLoading,setIsloading] = useState(false);

    const addToCart = async(itemId)=>{
        
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            setIsloading(true)
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
            setIsloading(false)
        }
        
    }
    
    const removeFromCart = async(itemId)=>{
        setCartItems((prev )=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            setIsloading(true)
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            setIsloading(false)
        }
}

const getTotalCartAmount = ()=>{
    let totalAmount = 0;
    for (const item in cartItems){
        if(cartItems[item] >0){
            let itemInfo = food_list.find((product)=>product._id === item);
            totalAmount += itemInfo.price * cartItems[item]
        } 
    }
    return totalAmount;
}

const fetchFoodList = async()=>{
    setIsloading(true)
    const response = await axios.get(url+'/api/food/list');
    setIsloading(false)
    setFoodList(response.data.data);
    
    
}

const localCartData = async(token)=>{
    
    setIsloading(true)
    const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}});
    setIsloading(false)
    setCartItems(response.data.cartData)
}

useEffect(()=>{
    async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await localCartData(localStorage.getItem("token"));
        }
    }
    loadData();
},[])
    const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isLoading,
    setIsloading
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;