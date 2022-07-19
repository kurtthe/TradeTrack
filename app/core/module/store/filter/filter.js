import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categorySelected: '',
  products: [],
  page: 1,
  pagesTotal: 1
}

export const filterStatementsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectedCategory: (state, action) => {
      state.products = []
      state.page = 1
      state.pagesTotal = 1
      state.categorySelected = action.payload
    },
    getProducts: (state, action) => {

      console.log("=>new products",action.payload)
      
      if (action.payload === undefined) {
        return
      }
      if (state.page > 1) {
        state.products = [...state.products, ...action.payload]
        return
      }
      state.products = action.payload
    },
    nextPage: (state) => {
      state.page = state.page + 1
    },
    getAllPages: (state, action) => {
      state.pagesTotal = action.payload
    },
    reset: (state) => {
      state.categorySelected = ''
      state.products = []
      state.page = 1
      state.pagesTotal = 1
    },
  }
})

export const {
  selectedCategory,
  getProducts,
  nextPage,
  getAllPages,
  reset,
} = filterStatementsSlice.actions

export default filterStatementsSlice.reducer
