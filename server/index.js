import express from "express"
import { connectDB } from "./data/connectDB.js"
import Place from "./models/newPlace.js"
// import Location from "./models/newPlace.js"
import cors from "cors"


const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("working")

})
app.get("/pins",async(req,res)=>{
    try{
        console.log("received req")
        const pins=await Place.find()
        // if(pins.latitude&&pins.longitude)
        res.status(200).json(pins)
        console.log(pins)
    }
    catch(err){
        console.log(err.message)
    }

})
app.post("/pins",async(req,res)=>{
    const newPlace=new Place(req.body)
    console.log(req.body)
    try{
        const savedPlace=await newPlace.save()
        res.status(200).json(savedPlace)
    }catch(err){
        res.status(500).json(err)
    }
})


connectDB();
app.listen(3000,()=>{
    console.log("server running on port 3000")
})