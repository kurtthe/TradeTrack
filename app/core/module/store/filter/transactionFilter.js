import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  transactions: [],
  page: 1,
  pagesTotal: 1
}

export const transactionFilterSlice = createSlice({
  name: 'transactionFilter',
  initialState,
  reducers: {
    getTransactions: (state, action) => {
      console.log("=>new trasactions",action.payload)

      if (action.payload === undefined) {
        return
      }
      if (state.page > 1) {
        state.transactions = [...state.transactions, ...action.payload]
        return
      }
      state.transactions = action.payload
    },
    nextPage: (state) => {
      state.page = state.page + 1
    },
    getAllPages: (state, action) => {
      state.pagesTotal = action.payload
    },
    reset: (state) => {
      state.transactions = []
      state.page = 1
      state.pagesTotal = 1
    },
  }
})

export const {
  nextPage,
  getAllPages,
  reset,
  getTransactions
} = transactionFilterSlice.actions

export default transactionFilterSlice.reducer
