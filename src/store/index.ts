import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from './account/slice';
import { transactionReducer } from './transaction/slice';

export const store = configureStore({
  reducer: {
    account: accountReducer.reducer,
    transaction: transactionReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});