import  Mongoose  from "mongoose";

const foodSchema = new Mongoose.Schema({
    name: {type :String,required :true},
    description: {type:String,required:true},
    price : {type:Number,required:true},
    image : {type:String,required:true},
    category: {type:String,required:true}
})

const foodModal = Mongoose.models.food || Mongoose.model("food",foodSchema);

export default foodModal;