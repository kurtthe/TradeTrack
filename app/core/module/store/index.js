import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'
import liveBalanceReducer from './balance/liveBalance'
import invoicesReducer from './balance/invoices'

export const store = configureStore({
  reducer: {
    loginReducer,
    liveBalanceReducer,
    invoicesReducer
  },
});
