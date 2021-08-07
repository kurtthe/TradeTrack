import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  api_key: null,
  company_id: null,
  created_date: null,
  email: null,
  first_name: null,
  id: null,
  last_name: null,
  phone_number: null,
  role: null,
  status: null,
  time_zone: null,
  username: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    sign: (state, action) => {
      const data = action.payload;

      state.api_key = data.api_key
      state.company_id = data.company_id
      state.created_date = data.created_date
      state.email = data.email
      state.first_name = data.first_name
      state.id = data.id
      state.last_name = data.last_name
      state.phone_number = data.phone_number
      state.role = data.role
      state.status = data.status
      state.time_zone = data.time_zone
      state.username = data.username
    },
    logout: (state) => {
      state.token= null
    },
  },
})

export const { sign, logout } = loginSlice.actions

export default loginSlice.reducer
