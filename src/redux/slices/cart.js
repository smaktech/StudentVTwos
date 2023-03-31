import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

function objFromArray(array, key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  cartItems:[],
  cartItemsCount:0
};

const slice = createSlice({
  name: 'cartItem',
  initialState,
  reducers: {
    // START LOADING
    setCartItems(state, action) 
    {
      console.log("user action",action)
      state.cartItems = action.payload;
      if(action.payload)
      {
        state.cartItemsCount = action.payload.length;
      }else
      {
          state.cartItemsCount = 0;
      }
      
      
    },
    deleteCart(state, action) {
      const updateCart = state.cartItems.filter((item) => item !== action.payload);
        console.log("delete cart called ", updateCart, action.payload);
      state.cartItems = updateCart;
      state.cartItemsCount = state.cartItemsCount-1
    },
     

  },
});

// Reducer
export default slice.reducer;

export const {setCartItems,deleteCart} =slice.actions