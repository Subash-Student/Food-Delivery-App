import jwt from"jsonwebtoken"

const authMidleware = async(req,res,next) =>{

    const {token} = req.headers;
    if(!token){
        res.json({success:false,message:"Not Authorized Log in again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET );
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"errOr"})
        
    }

}


export default authMidleware;