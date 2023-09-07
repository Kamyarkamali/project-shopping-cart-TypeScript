import { Product } from "@/types/data"
import React,{useEffect} from "react";
import { shortName } from "../helpers/function";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";

import { useSelector,useDispatch } from "react-redux"
import { addToCart, calculateTotalPrice } from "@/Redux/fetchare/productSlice";


import toast, { Toaster } from 'react-hot-toast';


interface AgahiProps{
    data:Product;
}

const Agahi:React.FC<AgahiProps>=({data})=> {

  const state=useSelector((state:any)=>state.counter)

  console.log(state)

  const dispatch=useDispatch()


  const router=useRouter()
  const {status}=useSession()

  useEffect(()=>{
    if(status==="unauthenticated") router.replace("/login")
  })

  const handelAddToCart=()=>{
    dispatch(addToCart(data)) 
    dispatch(calculateTotalPrice());
    toast.success("به سبد خرید اضافه شد")
  }

  

  return (
    <div>
        <div className="border-[2px] border-blue-500 bg-[#fdeded] p-7 mt-9 rounded-md">
            <img src={data.image} alt={data.title} className="w-[200px] h-[200px] rounded-lg"/>
            <p className="text-center text-xl mt-3 text-gray-500">{shortName(data.title)}</p>
            <div className="flex justify-center gap-8 mt-5">
                <button onClick={handelAddToCart} className="bg-blue-500 w-[140px] font-bold p-2 text-md rounded-md">افزودن به سبد خرید</button>
            </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default Agahi


