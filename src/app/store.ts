import { configureStore } from '@reduxjs/toolkit';
import { MenuSlice, ManagerSlice } from './reducers/menusSlice';
import CompanyReducer from './reducers/companySlice';

export const store = configureStore({
  reducer: {
    menu: MenuSlice.reducer,
    manager: ManagerSlice.reducer,
    company: CompanyReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;