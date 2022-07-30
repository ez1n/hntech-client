import { configureStore } from '@reduxjs/toolkit';
import { CompanySlice, ProductSlice, ServiceSlice } from './reducers/menusSlice';

export const store = configureStore({
  reducer: {
    company: CompanySlice.reducer,
    product: ProductSlice.reducer,
    service: ServiceSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;