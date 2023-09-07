import { Product } from "@/types/data"
import { shortName } from "../helpers/function"

function Cart({data}:{data:Product}) {
  return (
    <>
    <div className="flex flex-col items-center border-[2px] p-3 rounded-md border-blue-500">
      <img className="h-[200px]" src={data?.image}/>
      <p className="text-xl text-gray-500 mt-5">{data?.title}</p>
      <p className="text-xl">{data?.price} تومان</p>
    </div>
    </>
  )
}

export default Cart