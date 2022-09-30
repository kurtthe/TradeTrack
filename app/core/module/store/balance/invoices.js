import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  invoices:[],
  restricted: false,
}

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    getInvoices: (state, action) => {
      state.invoices = action.payload;
      state.restricted = action.restricted ? action.restricted : false;
    },
  },
})

export const { getInvoices } = invoicesSlice.actions

export default invoicesSlice.reducer
