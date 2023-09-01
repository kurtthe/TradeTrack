import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  categorySelected: '',
  products: [],
  page: 1,
  pagesTotal: 1,
  onlyFavourites: false,
  isLoading: true,
  restricted: false,
}

export const filterStatementsSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload
    },
    selectedCategory: (state, action) => {
      state.products = []
      state.page = 1
      state.pagesTotal = 1
      state.categorySelected = action.payload
      state.restricted = action.payload.restricted ? action.payload.restricted : false
    },
    getProducts: (state, action) => {

      if (action.payload === undefined) {
        return
      }
      if (state.page > 1) {
        state.products = [...state.products, ...action.payload]
        return
      }
      state.isLoading = !action.payload.length
      state.products = action.payload
      state.restricted = action.payload.restricted ? action.payload.restricted : false
    },
    nextPage: (state) => {
      state.page = state.page + 1
    },
    toggleFavorites: (state) => {
      state.onlyFavourites = !state.onlyFavourites
    },
    getAllPages: (state, action) => {
      state.pagesTotal = action.payload
    },
    reset: (state) => {
      state.categorySelected = ''
      state.products = []
      state.page = 1
      state.pagesTotal = 1
      state.onlyFavourites = false
      state.restricted = false
    },
  }
})

export const {
  selectedCategory,
  getProducts,
  nextPage,
  getAllPages,
  reset,
  toggleFavorites,
  toggleLoading,
} = filterStatementsSlice.actions

export default filterStatementsSlice.reducer
