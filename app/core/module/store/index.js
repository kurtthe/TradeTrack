import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'
import liveBalanceReducer from './balance/liveBalance'

export const store = configureStore({
  reducer: {
    loginReducer,
    liveBalanceReducer
  },
});
