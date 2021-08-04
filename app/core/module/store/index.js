import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'

export const store = configureStore({
  reducer: {
    loginReducer
  },
});
