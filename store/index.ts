import { configureStore } from '@reduxjs/toolkit';
import { accountReducer } from './account/slice';

export const store = configureStore({
  reducer: {
    account: accountReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});