import CartPage from "@/module/CartPage"
import { Product } from "@/types/data"

function index({newData}:{newData:Product[]}) {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-7">
        {newData.map((item:Product)=>(
            <CartPage key={item.id} data={item}/>
        ))}
    </div>
  )
}

export default index


export async function getStaticProps(){
    const res=await fetch("https://fakestoreapi.com/products")

    const data=await res.json()

    const newData=data.slice(0,4)

    return{props:{newData}}
}