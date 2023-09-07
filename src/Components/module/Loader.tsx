import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

function Loader() {
  return (
<ThreeDots 
height="40" 
width="40" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
  )
}

export default Loader