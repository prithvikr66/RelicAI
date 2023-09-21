import mongoose from "mongoose";
const subLocationSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    }
})
const Place=mongoose.model("Place",subLocationSchema)
export default Place