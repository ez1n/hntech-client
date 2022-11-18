import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './reducers/menuSlice';
import adminSlice from './reducers/adminSlice';
import companyModifySlice from './reducers/companyModifySlice';
import dialogSlice from './reducers/dialogSlice';
import questionSlice from './reducers/questionSlice';
import commentSlice from './reducers/commentSlice';
import productSlice from './reducers/productSlice';
import archiveSlice from './reducers/archiveSlice';
import categorySlice from './reducers/categorySlice';

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    manager: adminSlice,
    companyModify: companyModifySlice,
    dialog: dialogSlice,
    question: questionSlice,
    comment: commentSlice,
    product: productSlice,
    archive: archiveSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;