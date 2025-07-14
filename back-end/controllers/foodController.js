import foodModal from "../models/foodModel.js";
import fs from "fs";
import streamifier from "streamifier"
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config()
// add food item

const addFood = async(req,res)=>{

    const imageFile = req.file  || null;
    if (!imageFile) return res.status(400).json({ message: "Image file is required" });

    const imagePath = await handleFileUpload(imageFile, uploadImage, "Image");

    const food = new foodModal({
        name:req.body.name,
        description:req.body.description,
        price: req.body.price,
        category : req.body.category,
        image : imagePath
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

// all food list

const listFood = async(req,res)=>{
try {
    const foods = await foodModal.find({});
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

// remove food item

const removeFood =async (req,res)=>{
   try {
       const food = await foodModal.findById(req.body.id);
       fs.unlink(`uploads/${food.image}`,()=>{});

       await foodModal.findByIdAndDelete(req.body.id);
       res.json({success:true,message:"food removed"})
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
   }
}



const handleFileUpload = async (file, uploadFunction, type) => {
    if (file) {
        try {
            const result = await uploadFunction(file);
            if (!result?.success) {
                throw new Error(`${type} upload failed`);
            }
            return result.url;
        } catch (error) {
            console.error(`Error during ${type} upload:`, error);
            throw new Error(`${type} upload encountered an error`);
        }
    }
    return null;
};




async function uploadImage(file) {
    return new Promise((resolve, reject) => {
        if (!file?.buffer) {
            return reject({ success: false, message: "Invalid image file" });
        }

        const safeFilename = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "image-files",
                resource_type: "image",
                public_id: safeFilename, // Unique filename to avoid conflicts
            },
            (error, result) => {
                if (error) {
                    console.error("Image upload error:", error);
                    return reject({ success: false });
                }
                resolve({ success: true, url: result.secure_url });
            }
        );

        // Convert the buffer to a readable stream and pipe it to Cloudinary
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
}


export {addFood,listFood,removeFood}