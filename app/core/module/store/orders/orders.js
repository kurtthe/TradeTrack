import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders:[]
}

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
})

export const { getOrders } = ordersSlice.actions

export default ordersSlice.reducer
