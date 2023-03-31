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
  isLoading: false,
  info:{},
  error: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    setUserInfo(state, action) 
    {
      console.log("user action",action)
      state.info = action.payload;
      if(action.payload)
      {
        state.isAuthenticated=true
      }
    },
    setIsUserAuthenticated(state, action)
    {
      state.isAuthenticated=true
    }

  },
});

// Reducer
export default slice.reducer;

export const {setUserInfo} =slice.actions