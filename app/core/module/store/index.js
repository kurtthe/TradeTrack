import { configureStore } from '@reduxjs/toolkit'

import loginReducer from './auth/reducers/login'
import liveBalanceReducer from './balance/liveBalance'
import invoicesReducer from './balance/invoices'
import newsReducer from './news/news'
import productsReducer from './cart/cart'

export const store = configureStore({
  reducer: {
    loginReducer,
    liveBalanceReducer,
    invoicesReducer,
    newsReducer,
    productsReducer
  },
});
