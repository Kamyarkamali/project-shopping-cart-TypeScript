import Link from 'next/link'
import CartPage from "@/module/CartPage"
function Hero() {
  return (
    <div className='flex justify-center items-center max-w-[1400px] mx-auto'>
        <img className='h-[400px] relative md:h-[801px] w-[1390px]' src={"/images/pexels-sora-shimazaki-5935744.jpg"}/>
        <Link href={"/singup"} className='absolute flex flex-col items-center text-gray-600 md:text-2xl md:right-[4rem] md:top-[19rem] top-[24rem]'>
            <p className='text-xl text-yellow-500 font-bold'>برای دیدن آگهی ها همین الان ثبت نام کن</p>
            <button className='bg-orange-500 w-[200px] p-2 mt-3 rounded-lg text-gray-700'>ثبت نام</button>
        </Link>
        <h1 className='absolute text-gray-600 text-4xl md:right-[4rem] md:top-[14rem] top-[7rem]'>خریدی آسان با <span className='text-orange-600 font-bold'>آسان خرید</span></h1>

        <div className='hidden md:block border-[2px] shadow-[black]'>
        <div className='absolute border-[2px] shadow-md border-red-500 rounded-md p-1 bg-[#eee] left-0 flex flex-col items-center md:left-[5rem] md:w-[400px] md:top-[10rem]'>
            <p className='text-center text-xl text-gray-500 leading-[40px]'>
            آسان خرید" یک فروشگاه آنلاین متنوع است که به شما امکان می‌دهد محصولات مختلف را به راحتی و با اطمینان بخرید. این پلتفرم با تمرکز بر راحتی و سهولت خریداران، ارائه دهنده محصولات با کیفیت و قیمت مناسب از دسته‌های مختلفی از جمله الکترونیکی، مد و پوشاک، آرایشی و بهداشتی، خوراکی و بسیاری موارد دیگر است. از آسانی مرور سایت تا انتخاب و خرید سریع، "آسان خرید" تجربه خرید آنلاین را تازه تر و مطمئن‌تر می‌کند.
            </p>
            <button className='text-xl'>درباره ما بیشتر بخوانید</button>
        </div>
        </div>
    </div>
  )
}

export default Hero