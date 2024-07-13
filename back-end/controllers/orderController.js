import orderModal from "../models/orderModal.js";
import userModel from "../models/userModal.js";
import Stripe from "stripe";






//placing user order from front end

const placeOrder = async(req,res)=>{

    const frontend_Url = "http://localhost:5173";

    try {
        const newOrder = new orderModal({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});


        // WAITING FOR PAYMRNT VERIFICATION



        // const lineItem = req.body.items.map((item)=>({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:item.name,
        //         },
        //         unit_amount :item.price*100*80
        //     },
        //     quantity:item.quantity
        // }))

        // lineItem.push({
        //     price_data:{
        //         currency:"inr",
        //         product_data:{
        //             name:"Delivery Charges"
        //         },
        //         unit_amount:2*100*80,
        //     },
        //     quantity:1
        // })

        // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

        // const session = await stripe.checkout.sessions.create({
        //     line_items:lineItem,
        //     mode:"payment",
        //     success_url:`${frontend_Url}/verify?success=true&orderId=${newOrder.price_data}`,
        //     cancel_url:`${frontend_Url}/verify?success=false&orderId=${newOrder.price_data}`
        // })
        res.json({success:true,session_url:session.url})



    } catch (error) {
        res.json({success:false,message:"failed"});
        // console.log(error)
    }

}


// WAITING FOR PAYMRNT VERIFICATION


// const verifyOrder = async(req,res)=>{
//     const {orderId,success} = req.body;
//     try {
//         if(success === "true"){
//               await orderModal.findByIdAndUpdate(orderId,{payment:true});
//               res.json({success:true,message:"Paid"})
//         }else{
//             await orderModal.findByIdAndDelete(orderId);
//             res.json({success:false,message:"Not Paid"})
//         }
//     } catch (error) {
//         res.json({success:false,message:"error"})
//         console.log(error)
//     }

// }

// export{verifyOrder}

//  User order for Frontend

const userOrder = async(req,res)=>{

    try {
        const orders = await orderModal.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder,userOrder}
