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
  username: null,
  company: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    sign: (state, action) => {
      const data = action.payload;
      
      if(data=== null){
        state.api_key= null
        return;
      } else {
        state.api_key = data.api_key
        state.company_id = data.user.company_id
        state.created_date = data.user.created_date
        state.email = data.user.email
        state.first_name = data.user.first_name
        state.id = data.user.id
        state.last_name = data.user.last_name
        state.phone_number = data.user.phone_number
        state.role = data.user.role
        state.status = data.user.status
        state.time_zone = data.user.time_zone
        state.username = data.user.username
      }
    },
    setCompany: (state, action) => {
      state.company = action.payload
    },
    logout: (state) => {
      state.api_key= null
    },
  },
})

export const { sign, logout, setCompany } = loginSlice.actions

export default loginSlice.reducer
