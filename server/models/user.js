import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique: true},
    email:{type:String,required:true,unique: true},
    password:{type:String,required:true,minLength:5},
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]
})

export const User = mongoose.model('User',userSchema)