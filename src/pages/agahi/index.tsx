import Agahi from '@/templates/Agahi'

import { Product } from '@/types/data'



export function index({data}:{data:Product[]}) {

  return (
    <div className='md:flex md:flex-wrap grid grid-cols-2 max-w-[1200px] mx-auto justify-center gap-9'>
        {
            data.map((i)=>(
                <Agahi key={i.id} data={i}/>
            ))
        }
    </div>
  )
}

export default index

export async function getStaticProps(){
    const res=await fetch("https://fakestoreapi.com/products")

    const data=await res.json()

    return{props:{data}}
}



