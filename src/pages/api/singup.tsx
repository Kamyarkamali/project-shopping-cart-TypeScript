import { hashPassword } from "@/utils/auth"
import connectionDB from "@/utils/connection"
import User from "@/models/User"

async function handler(req:any,res:any){
    if(req.method!=="POST"){
        return
    }


    try{
        await connectionDB()
    }catch(error){
       return res.status(500).json({status:"مشکلی در سرور رخ داده"})
        console.log("مشکلی در سرور رخ داده")
    }

    const {password,email}=req.body

    if(!email || !password){
        return res.status(422).json({status:"مقادیر صحیح نمیباشند"})
    }

    const exsiting=await User.findOne({email:email})

    if(exsiting){
        return res.status(422).json({status:"کاربر با این ایمیل وجود دارد"})
    }

    const hashedpasswords=await hashPassword(password)

    const newUser=await User.create({email:email,password:hashedpasswords})

    console.log(newUser)

     res.status(201).json({status:"اکانت ساخته شد",messege:"dsdsds"})
}

export default handler