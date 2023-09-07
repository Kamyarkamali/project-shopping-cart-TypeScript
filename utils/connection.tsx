import mongoose from "mongoose";

async function connectionDB(){
    if(mongoose.connections[0].readyState) return
    mongoose.set("strictQuery",false)
    await mongoose.connect("mongodb+srv://kamyar021:kamyar021@cluster0.biigvzd.mongodb.net/?retryWrites=true&w=majority")
    console.log("connection")
}


export default connectionDB;