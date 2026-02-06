import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

export const Post = mongoose.model('Post',postSchema)