import { configureStore } from '@reduxjs/toolkit';
import { MenuSlice, ModeSlice } from './reducers/menusSlice';

export const store = configureStore({
  reducer: {
    menu: MenuSlice.reducer,
    mode: ModeSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;