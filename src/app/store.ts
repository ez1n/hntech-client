import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './reducers/menusSlice';
import ManagerReducer from './reducers/managerModeSlice';
import CompanyReducer from './reducers/companySlice';
import ProductReducer from './reducers/productSlice';
import DialogReducer from './reducers/dialogSlice';
import QuestionReducer from './reducers/questionSlice';
import ProductImageReducer from './reducers/productInfoSlice';
import { GradeImageReducer, InfoImageReducer } from './reducers/infoImageSlice';
import InfoFileReducer from './reducers/infoFileSlice';
import ArchiveFileReducer from './reducers/archiveFileSlide';

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    manager: ManagerReducer,
    company: CompanyReducer,
    category: ProductReducer,
    dialog: DialogReducer,
    question: QuestionReducer,
    product: ProductImageReducer,
    infoImage: InfoImageReducer,
    gradeImage: GradeImageReducer,
    productFile: InfoFileReducer,
    archiveFile: ArchiveFileReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;