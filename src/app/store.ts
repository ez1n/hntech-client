import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './reducers/menuSlice';
import managerModeSlice from './reducers/managerModeSlice';
import companySlice from './reducers/companySlice';
import companyModifySlice from './reducers/companyModifySlice';
import productCategorySlice from './reducers/productCategorySlice';
import dialogSlice from './reducers/dialogSlice';
import questionSlice from './reducers/questionSlice';
import commentSlice from './reducers/commentSlice';
import productSlice from './reducers/productSlice';
import productContentSlice from './reducers/productContentSlice';
import productFileSlice from './reducers/productFileSlice';
import questionContentSlice from './reducers/questionContentSlice';
import archiveSlice from './reducers/archiveSlice';
import archiveCategorySlice from './reducers/archiveCategorySlice';
import archiveFileSlice from './reducers/archiveFileSlice';
import noticeSlice from './reducers/noticeSlice';
import productCategoryContentSlice from './reducers/productCategoryContentSlice';
import fileSlice from './reducers/fileSlice';

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    manager: managerModeSlice,
    company: companySlice,
    companyModify: companyModifySlice,
    productCategory: productCategorySlice,
    dialog: dialogSlice,
    question: questionSlice,
    comment: commentSlice,
    product: productSlice,
    productContent: productContentSlice,
    productFile: productFileSlice,
    productCategoryContent: productCategoryContentSlice,
    archive: archiveSlice,
    archiveFile: archiveFileSlice,
    notice: noticeSlice,
    questionContent: questionContentSlice,
    archiveCategory: archiveCategorySlice,
    file: fileSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;