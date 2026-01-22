import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    content:String,
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likes:[
        {type:mongoose.Schema.Types.ObjectId,ref:'user'}
    ]
})

export const post = mongoose.model('post',postSchema)