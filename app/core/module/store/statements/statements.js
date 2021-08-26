import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  statements:[]
}

export const statementsSlice = createSlice({
  name: 'statements',
  initialState,
  reducers: {
    getStatements: (state, action) => {
      state.statements = action.payload;
    },
  },
})

export const { getStatements } = statementsSlice.actions

export default statementsSlice.reducer
