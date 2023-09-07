import { Schema,model,models } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:()=>Date.now(),
        immutable:true,
    }
})

const User=models.User || model("User",userSchema)


export default User;