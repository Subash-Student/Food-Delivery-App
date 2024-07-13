import userModel from "../models/userModal.js";


//add items to user cart

const addToCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ErRor"});
    }

}

// remove item from user cart

const removeFromCart = async(req,res)=>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item Removed From Cart"})
    
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ErRor"})
    }
   

}

// fetch user cart data

const getCart = async(req,res)=>{
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        res.json({success:false,message:"ErRor"});
        console.log(error);
    }

}


export{addToCart,removeFromCart,getCart}