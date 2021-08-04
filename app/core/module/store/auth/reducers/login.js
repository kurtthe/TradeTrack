import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    sign: (state, action) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.token= null
    },
  },
})

export const { sign, logout } = loginSlice.actions

export default loginSlice.reducer
