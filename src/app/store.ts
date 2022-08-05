import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './reducers/menusSlice';
import ManagerReducer from './reducers/managerModeSlice';
import CompanyReducer from './reducers/companySlice';
import ProductReducer from './reducers/productSlice';

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    manager: ManagerReducer,
    company: CompanyReducer,
    category: ProductReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;