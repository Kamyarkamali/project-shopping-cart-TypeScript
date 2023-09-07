import Link from "next/link";
import React,{useEffect} from "react"

import { useSelector,useDispatch } from "react-redux"

import { incrementQuantity ,decrementQuantity,removeItem,clearCart} from "@/Redux/fetchare/productSlice"

import { useSession } from "next-auth/react";

import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";


export interface PRODUCTS{
    title:string,
    image:string,
    price:number,
    description:string,
    quantity:number,
    id:number,
    totalPrice:number
}

function ShoppPage() {
    const {status}=useSession()
    const router=useRouter()
  const state=useSelector((state:any)=>state.counter.shopping)
  const state2=useSelector((state:any)=>state.counter.totalPrice)

    useEffect(()=>{
        if(status==="unauthenticated") router.replace("/login")
        toast.error("برای دسترسی به اکانت خود وارد بشوید")
    })

  const dispatch=useDispatch()

    const decrementHandeler=(itemId:number)=>{
        dispatch(incrementQuantity(itemId))
        toast.success("مقدار اضافه شد")
    }


    const inrementHandeler=(itemId:number)=>{
        dispatch(decrementQuantity(itemId))
        toast.error("مقدار کم شد")
    }

    const removeHandeler=(itemId:number)=>{
        dispatch(removeItem(itemId))
        toast.error("مقدار حذف شد")
    }

    const cleareData=(item:any)=>{
        dispatch(clearCart(item))
        toast.success("پرداخت موفقیت آمیز بود")
    }


  return (
    <div className="flex flex-wrap flex-col items-center gap-6 mt-9">
        <div>
        {!state.length ? <p className="text-center text-3xl mt-9">سبد خرید خالی است :(</p> : null}
        </div>
        
    <div>


    {
        state.map((item:PRODUCTS)=>(
            <>
            <div key={item.id} className="flex items-center mt-5 justify-between border-red-500 rounded-lg p-3 border-[2px] w-[300px]"> 
                <img src={item.image} alt="/" className="h-[100px]"/>
                <p className="text-xl text-gray-600 font-bold">{item.quantity}</p>
                <div>
                    <button onClick={()=>removeHandeler(item.id)} className="text-xl">حذف</button>
                </div>
                <div className="flex gap-4">
                <button onClick={()=>decrementHandeler(item.id)} className="bg-blue-500 p-1 rounded-md text-xl font-bold">+</button>
                <button onClick={()=>inrementHandeler(item.id)} className="bg-red-500 p-1 rounded-md text-xl font-bold">-</button>
            </div>
            </div>
            </>
        ))
    }
    
    {state.length ?<div className="flex items-center rounded-md border-[2px] p-2 justify-center mt-9 bg-blue-600 text-white">
        <h1 className="text-xl text-white">مجموعه پرداختی :</h1>
        
        <div> 
            <h1 className="text-xl">{state2} تومان</h1>
        </div>

    </div> : null}

    {state.length?<div className="flex justify-center mt-6"> 
            <button onClick={cleareData} className="text-xl bg-green-700 p-2 w-[130px] rounded-md text-white">پرداخت</button>
    </div> : <Link className="bg-blue-500 p-2 text-white rounded-md text-xl" href={"/agahi"}>برو به فروشگاه</Link>}

    </div>
    <Toaster/>
    </div>
  )
}

export default ShoppPage