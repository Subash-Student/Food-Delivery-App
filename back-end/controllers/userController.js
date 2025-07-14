import userModel from "../models/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";


// login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Does Not Exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        const token = createToken(user._id);

        res.json({success:true,token})
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"ErRor"})
        
    }

}

// create tokens

const createToken = (id)=>{
     return jwt.sign({id},process.env.JWT_SECRET)
}

// register user

const registerUser =async(req,res)=>{
    const{name,password,email} = req.body;
    try {
        //check user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            res.json({success:false,message:"User Already Exists"})
        }
        //validating email formate and strong password

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter Valid Email"})
        }

        if(password.length < 8){
            return res.json({success:false,message:"Please Enter Strong Password"})
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = userModel({
            name:name,
            email:email,
            password:hashedPassword
        })


        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export {loginUser,registerUser}