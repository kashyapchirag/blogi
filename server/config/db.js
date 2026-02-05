import mongoose from "mongoose";

export const DBconnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo DB connected successfully');
    }catch(err){
        console.log('error during mongoDB connection');
    }
}
