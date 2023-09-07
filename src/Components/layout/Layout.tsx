import Header from '@/layout/Header'
import Footer from "@/layout/Footer"

function Layout({children}) {
  return (
    <div>
        <Header/>


    <div className='min-h-[600px]'>
        {children}
    </div>

    <Footer/>

    </div>
  )
}

export default Layout