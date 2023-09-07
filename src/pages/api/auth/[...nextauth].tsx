import NextAuth from "next-auth/next";
import User from "@/models/User";
import connectionDB from "@/utils/connection";

import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";


const authOptions={
    session:{strategy:"jwt"},
    providers:[
        CredentialsProvider({
            async authorize(credentials:any,req:any){
                const {email,password}=credentials

                try{
                    await connectionDB()
                }catch(error){
                    throw new Error("مشکل اتصال")
                }

                if(!email || !password){
                    throw new Error("مشکلی در ایمیل یا پسورد وجود دارد")
                }

                const user=await User.findOne({email:email})

                if(!user) throw new Error("اکانت وجود ندارد")

                const isValid=await verifyPassword(password,user.password)

                if(!isValid) throw new Error("مقادیر صحیح نمیباشد")
                
                return {email}
            },
        })
    ]
}

export default NextAuth(authOptions)