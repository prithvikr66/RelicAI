import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://pkunofficial66:pkunofficial66@cluster0.zcx6lsf.mongodb.net/",{
        useNewUrlParser:true,
    useUnifiedTopology:true,
  
    })
    console.log("database connected")
}