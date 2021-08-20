import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'
import liveBalanceReducer from './balance/liveBalance'
import invoicesReducer from './balance/invoices'
import newsReducer from './news/news'

export const store = configureStore({
  reducer: {
    loginReducer,
    liveBalanceReducer,
    invoicesReducer,
    newsReducer
  },
});
