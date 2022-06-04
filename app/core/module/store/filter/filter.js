import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categorySelected: '',
  subCategorySelected: '',
  products: [],
  keepData: false,
  page: 1,
  pagesTotal: 1
}

export const filterStatementsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    selectedCategory: (state, action) => {
      state.categorySelected = action.payload
    },
    selectedSubCategory: (state, action) => {
      state.subCategorySelected = action.payload
    },
    getProducts: (state, action) => {
      if (state.keepData) {
        state.products = [...state.products, action.payload]
        return
      }
      state.products = [action.payload]
    },
    changeKeepData: (state) => {
      state.keepData = !state.keepData
    },
    nextPage: (state) => {
      state.page = state.page + 1
    },
    getAllPages: (state, action) => {
      state.pagesTotal = action.payload
    }
  }
})

export const {
  selectedCategory,
  getProducts,
  changeKeepData,
  selectedSubCategory,
  nextPage,
  getAllPages
} = filterStatementsSlice.actions

export default filterStatementsSlice.reducer
