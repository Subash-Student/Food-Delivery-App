import mongoose from "mongoose";

export  const  connectDB =async()=>{
    await mongoose.connect('mongodb+srv://subash:SubashBanu2020$@cluster0.vobzlno.mongodb.net/food-delivery').then(()=>{
        console.log("db connected")
    })
}