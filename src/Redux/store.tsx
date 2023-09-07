import {configureStore} from"@reduxjs/toolkit"

import fetchareSlice from "@/Redux/fetchare/productSlice"

const store=configureStore({
    reducer:{
        counter:fetchareSlice
    }
})

export default store