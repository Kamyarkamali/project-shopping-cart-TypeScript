import React, { ChangeEvent, FormEvent, useState,useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react';

import { FORMDATA } from '@/types/data';
import Loader from '@/module/Loader';
import { useRouter } from 'next/router';

import { signIn } from "next-auth/react"

function Login() {

  const {status}=useSession()

  const [loading,setLoading]=useState<boolean>(false)

  const router=useRouter()

  const [singup,setSingUp]=useState<FORMDATA>({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const handelInput=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setSingUp((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const submitHandeler=async(e:FormEvent)=>{
    e.preventDefault()
    const {email,password}=singup
    setLoading(true)
    const data=await signIn("credentials",{
        email,
        password,
        redirect:false
    })

    setLoading(false)

    enum SERVERMESSEGE{
      ERROR="مشکل در عملیاد ساخت اکانت",
      LOGINSUCSSES="خوش آمدید",
    }

    if(data.error){
        toast.error(SERVERMESSEGE.ERROR)
    }else{
        toast.success(SERVERMESSEGE.LOGINSUCSSES)
    }
    router.replace("/agahi")
    
  }
    
  useEffect(()=>{
    if(status==="authenticated") router.replace("/agahi")
    toast.error("قبلا وارد اکانت خود شده اید")
  })

  return (
    <div className='flex flex-col items-center mt-[5rem]'>
        <form onSubmit={submitHandeler} className='flex flex-col items-center bg-[#e5e5e5] rounded-lg border-[2px] border-blue-500 p-3 w-[300px] h-[400px] justify-evenly'>
            <h1 className='text-3xl text-blue-500'>فرم ورود</h1>
            <input name='email' onChange={handelInput} value={singup.email} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='email' placeholder='ایمیل خود را وارد کنید...'/>
            <input name='password' onChange={handelInput} value={singup.password} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='password' placeholder="رمز عبور"/>

      {
        loading ? (
          <Loader/>
        ) : (
          <button className='bg-blue-600 hover:scale-105 duration-300 w-[150px] h-[43px] p-1 rounded-lg text-xl text-white font-bold'>ورود</button>
        )
      }

        </form>
        <Toaster/>
    </div>
  )
}

export default Login