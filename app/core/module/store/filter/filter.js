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
      state.categorySelected = action.payload
    },
    selectedSubCategory: (state, action) => {
      state.subCategorySelected = action.payload
    },
    getProducts: (state, action) => {
      if (action.payload === undefined) {
        return
      }

      if (state.keepData) {
        state.products = [...state.products, action.payload]
        return
      }
      state.products = action.payload
    },
    changeKeepData: (state) => {
      state.keepData = !state.keepData
    },
    nextPage: (state) => {
      if (!state.keepData) {
        state.keepData = true
      }
      state.page = state.page + 1
    },
    getAllPages: (state, action) => {
      state.pagesTotal = action.payload
    },
    reset: (state) => {
      state.categorySelected = ''
      state.subCategorySelected = ''
      state.products = []
      state.keepData = false
      state.page = 1
      state.pagesTotal = 1
    },
    resetPage: (state) => {
      state.page = 1
    }
  }
})

export const {
  selectedCategory,
  getProducts,
  changeKeepData,
  selectedSubCategory,
  nextPage,
  getAllPages,
  reset,
  resetPage
} = filterStatementsSlice.actions

export default filterStatementsSlice.reducer
