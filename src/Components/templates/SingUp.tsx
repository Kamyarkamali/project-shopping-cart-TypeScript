import React, { ChangeEvent, FormEvent, useState ,useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useSession } from 'next-auth/react';

import { FORMDATA } from '@/types/data';
import Loader from '@/module/Loader';
import { useRouter } from 'next/router';



function SingUp() {

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

enum SERVERMESSEGE{
    OK="ثبت نام با موفیت انجام شد",
    ERROR="مشکل در عملیاد ساخت اکانت",
    LOGINSUCSSES="خوش آمدید",
  }


  useEffect(()=>{
    if(status==="authenticated") router.push("/login")
    toast.error("قبلا ثبت نام کرده اید")
  })


  const submitHandeler=async(e:FormEvent)=>{
    e.preventDefault()
    const {email,password}=singup
    setLoading(true)
    const res=await fetch("/api/singup",{
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{'Content-Type':"application/json"}
    })
    setLoading(false)
    const data=await res.json()

    router.push("/login")

    if(data.error){
      toast.error(SERVERMESSEGE.ERROR)
    }else{
      toast.success(SERVERMESSEGE.OK)
    }

  }

  return (
    <div className='flex flex-col items-center mt-[5rem]'>
        <form onSubmit={submitHandeler} className='flex flex-col items-center bg-[#e5e5e5] rounded-lg border-[2px] border-blue-500 p-3 w-[300px] h-[400px] justify-evenly'>
            <h1 className='text-3xl text-blue-500'>ثبت نام</h1>
            <input name='username' onChange={handelInput} value={singup.username} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='text' placeholder='نام کاربری'/>
            <input name='email' onChange={handelInput} value={singup.email} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='email' placeholder='ایمیل خود را وارد کنید...'/>
            <input name='password' onChange={handelInput} value={singup.password} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='password' placeholder="رمز عبور"/>
            <input name='confirmPassword' onChange={handelInput} value={singup.confirmPassword} className='border-[2px] w-[240px] border-blue-400 p-2 rounded-md outline-none text-gray-500 hover:border-green-500 duration-300' type='password' placeholder="تکرار رمز عبور"/>

      {
        loading ? (
          <Loader/>
        ) : (
          <button className='bg-blue-600 hover:scale-105 duration-300 w-[150px] h-[43px] p-1 rounded-lg text-xl text-white font-bold'>ثبت نام</button>
        )
      }

        </form>
        <Toaster/>
    </div>
  )
}

export default SingUp