import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        //username already exists
        if(await User.findOne({email})) return res.status(409).json({message:"email already exists"})

        else if(await User.findOne({username})) return res.status(409).json({message:"Username already exists"})

        //email already exists

        //hashing password
        const hashedPassword = await bcrypt.hash(password,10)
        await User.create({username,email,password:hashedPassword})
        res.status(201).json({message:"Registration success"})
        
    } catch (error) {
        res.status(500).json({message:"Server crash"})
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    
    try {
        const data = await User.findOne({email})
        //if account does not exists
        if(!data) return res.status(401).json({message:"wrong email or password"})

        //if password matched with hashedpassword
        const isMatch = await bcrypt.compare(password,data.password)
        if(isMatch){
            //create token using jwt
            const token =  jwt.sign({_id:data._id,email,username:data.username},process.env.JWT_SECRET,{expiresIn:"1h"})
            //send cookie to browser
            res.cookie("token",token,{httpOnly:true,sameSite:"Strict"})
            res.status(200).json({message:"login success",username:data.username})
        }else{
            return res.status(401).json({message:"wrong email or password"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Server crash"})
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        sameSite:"Strict"
    })
    res.status(200).json({message:"Logged Out"})
}
