import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// icons
import {BsFillBagFill} from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import {FiX} from "react-icons/fi";
import {FaRegUserCircle} from "react-icons/fa";

///nextAuth
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"


// redux
import { useSelector } from "react-redux"


function Header() {

  const state=useSelector((state:any)=>state.counter.shopping)

    const {status,data}=useSession()
    

    const [open,setOpen]=useState<Boolean>(false)

    const router=useRouter()

    useEffect(() => {
        const closeMenu = () => {
            setOpen(false);
        };

        
        router.events.on("routeChangeStart",closeMenu)

        return()=>{
            router.events.off("routeChangeStart",closeMenu)
        }
        
    }, []);


    // logout
    const logoutHandeler=()=>{
        signOut()
        router.replace("/login")
    }

    const logout=()=>{
        signOut()
        router.replace("/login")
    }

    const menu:object[]=[
        {id:1,title:"صفحه اصلی",href:"/"},
        {id:2,title:"آگهی ها",href:"/agahi"},
        {id:3,title:"سبد خرید",href:"/shopping"},
    ]

    interface SOCHIAL{
        id:number,
        icon:string,
        title:string,
        href?:string
    }

    const icon:SOCHIAL=[
        {id:1,icon:"https://www.svgrepo.com/show/452231/instagram.svg",title:"اینستاگرام"},
        {id:2,icon:"https://www.svgrepo.com/show/452047/linkedin-1.svg",title:"لینکدین",href:"https://www.linkedin.com/in/kamyar-kamali-671a5822b/"},
        {id:3,icon:"https://www.svgrepo.com/show/512317/github-142.svg",title:"گیت هاب",href:"https://github.com/Kamyarkamali"},
    ]

  return (
    <div className='flex justify-between items-center h-[100px] max-w-[1400px] bg-blue-600 p-4 rounded-lg mx-auto'>

    <div className="hidden md:block">
    <div className="flex gap-8">
        <Link href={"/shopping"}>
        <BsFillBagFill size={23} color="white" className="relative"/>
        <span className="font-bold text-xl absolute right-[44px] md:right-[2,4rem] top-[43px] bg-red-500 text-gray-50 p-[2px] rounded-[20px]">{state.length}</span>
        </Link>
        <Link href={"/"} className="text-xl text-white">صفحه اصلی</Link>
    </div>
    </div>

    <div className="hidden md:block">
    <div className="flex gap-4 items-center">
        {
            status==="authenticated" ? (
                <div className="flex flex-col items-center ml-3"> 
                <FaRegUserCircle size={25} color="white"/>
                <span className="text-md text-white text-xl font-bold">{data.user.email}</span>
                </div>
            ) : (
                <Link href={"/singup"}>
                <button className="bg-white text-xl p-1 w-[130px] rounded-md">ثبت نام</button>
                </Link>
            )
        }
        
        {
            status==="authenticated" ? (
                <button onClick={logoutHandeler} className="bg-white text-gray-700 p-1 w-[130px] text-xl rounded-lg">خروج</button>
            ) : (
                <Link href={"/login"}>
        <button className="bg-black text-xl p-1 w-[130px] rounded-md text-white">ورود</button>
        </Link>
            )
        }

    </div>
    </div>

    <div>
        <Link href={"/agahi"} className=" text-xl text-white">
            آگهی ها
        </Link>
    </div>


    {/* hAMBOURGER MENU */}

    <div className="md:hidden mt-6">
    {
        open ? (
            <FiX size={25} color="white" onClick={()=>setOpen(!open)} className="cursor-pointer duration-300 ease-in"/>
        ) : (
            <BiMenu size={25} color="white" onClick={()=>setOpen(!open)} className="cursor-pointer duration-300 ease-in"/>
        )
    }

    {/* Menu */}

    <div className="md:hidden z-auto">
        <ul className={!open?"absolute bg-[#eee] p-3 flex flex-col items-center w-[300px] h-[100vh] right-[-100%] duration-300 z-[100]" : "absolute bg-[#eee] duration-300 p-3 flex flex-col items-center w-[300px] h-[100vh] right-0 gap-[4rem] rounded-lg z-[100]"}>
            {menu.map((item:any)=>(
                <Link href={item.href} key={item.id}>
                <li className="text-xl text-gray-400 font-bold hover:text-black hover:bg-white duration-300 hover:p-2 hover:rounded-md">{item.title}</li>
                </Link>
            ))}
            {/* button */}
        <div className="flex gap-5 items-center mt-9">
            {/* <Link href={"/singup"}>
                <button className="bg-blue-600 w-[120px] text-xl rounded-md p-1">ثبت نام</button>
            </Link> */}
            {
                status==="authenticated" ? (
                <div className="flex flex-col items-center ml-3"> 
                    <FaRegUserCircle size={25} color="gray"/>
                    <span className="text-md text-gray-700">{data.user.email}</span>
                </div>
                ) : (
                    <Link href={"/singup"}>
                    <button className="bg-blue-600 w-[120px] text-xl rounded-md p-1">ثبت نام</button>
                     </Link> 
                )
            }

            {
                status==="authenticated" ? (
                    <button onClick={logout} className="bg-black p-1 ml-3 rounded-lg w-[130px] text-white text-xl">خروج</button>
                ) : (
                    <Link href={"/login"}>
                    <button className="bg-black w-[120px] text-xl rounded-lg p-1 text-white">ورود</button>
                    </Link>
                )
            }
        </div>
        {/* button */}


        {/* SochialMedia */}
        <div className="flex gap-6">
            {icon.map((item:any)=>(
                <div className="flex items-center">
                    <Link href={`${item.href}`}>
                <img src={item.icon} alt={item.title} key={item.id} className="w-[31px]"/>
                    </Link>
                </div>
            ))}
            </div>

        {/* SochialMedia */}

        </ul>
        

    </div>

    {/* Menu */}

    </div>

    {/* hAMBOURGER MENU */}

    


    </div>
  )
}

export default Header