import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invoices:[]
}

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    getInvoices: (state, action) => {
      state.invoices = action.payload;
    },
  },
})

export const { getInvoices } = invoicesSlice.actions

export default invoicesSlice.reducer
