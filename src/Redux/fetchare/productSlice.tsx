import { createSlice } from "@reduxjs/toolkit";

const initialState={
    shopping:[],
    totlaPrice:0,
    paymentStatus:"unpaid"
}

const fetchareSlice=createSlice({
    name:"shpping",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const itemInCart = state.shopping.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.shopping.push({ ...action.payload, quantity: 1 });
      }
        },
        incrementQuantity: (state, action) => {
            const item = state.shopping.find((item) => item.id === action.payload);
            item.quantity++;
          },
          decrementQuantity: (state, action) => {
            const item = state.shopping.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
              item.quantity = 1
            } else {
              item.quantity--;
            }
          },
          removeItem: (state, action) => {
            const removeItem = state.shopping.filter((item) => item.id !== action.payload);
            state.shopping = removeItem;
          },
          calculateTotalPrice: (state) => {
            state.totalPrice = state.shopping.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0);
          },
          clearCart:(state)=>{
            state.shopping=[]
            state.totlaPrice=0
          }
    }
})


export default fetchareSlice.reducer

export const {addToCart,incrementQuantity,decrementQuantity,removeItem,calculateTotalPrice,clearCart}=fetchareSlice.actions