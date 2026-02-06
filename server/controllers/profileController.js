import { User } from "../models/user.js";
import cookieParser from "cookie-parser";


export const getProfile = async(req,res)=>{
    const user = await User.findOne({email:req.user.email})
    if(!user){
        return res.status(404).json({message:"Profile not found"})
    }
    return res.json({username:user.username})
}