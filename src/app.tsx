import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { Box } from '@mui/material';
import Header from './components/header';
import SideMenu from './components/sideMenu';
import Footer from './components/footer';
import Main from './components/main/main';
import Company from './components/company/company';
import Products from './components/products/products';
import ProductDetail from './components/productDetail/productDetail';
import ProductForm from './components/productForm/productForm';
import MainData from './components/mainData';
import Questions from './components/questions/questions';
import QuestionForm from './components/questionForm/questionForm';
import NoticeForm from './components/noticeForm/noticeForm';
import QuestionDetail from './components/questionDetail/questionDetail';
import Archives from './components/archives/archives';
import ArchiveForm from './components/archiveForm/archiveForm';
import ArchiveDetail from './components/archiveDetail';
import FloatingButton from './components/floatingButton';
import ProductModifyForm from './components/productModifyForm/productModifyForm';
import QuestionModifyForm from './components/questionModifyForm/questionModifyForm';
import NoticeModifyForm from './components/noticeModifyForm/noticeModifyForm';
import ArchiveModifyForm from './components/archiveModifyForm/archiveModifyForm';

export default function App() {
  const managerMode = useAppSelector(state => state.manager.managerMode);

  return (
    <Box>
      <BrowserRouter>
        <Header />
        <SideMenu />

        <Routes>
          <Route path='/' element={
            <Main />
          }></Route>

          <Route path='/company' element={
            <Company />
          }></Route>

          <Route path='/product' element={
            <Products />
          }></Route>

          <Route path='/product-detail' element={
            <ProductDetail />
          }></Route>

          <Route path='/product-form' element={
            managerMode && <ProductForm />
          }></Route>

          <Route path='/product-modify' element={
            managerMode && <ProductModifyForm />
          }></Route>

          <Route path='/data' element={
            <MainData />
          }></Route>

          <Route path='/question' element={
            <Questions />
          }></Route>

          <Route path='/question-form' element={
            <QuestionForm />
          }></Route>

          <Route path='/question-modify' element={
            <QuestionModifyForm />
          }></Route>

          <Route path='/notice-form' element={
            managerMode && <NoticeForm />
          }></Route>

          <Route path='/notice-modify' element={
            managerMode && <NoticeModifyForm />
          }></Route>

          <Route path='/question-detail' element={
            <QuestionDetail />
          }></Route>

          <Route path='/archive' element={
            <Archives />
          }></Route>

          <Route path='/archive-form' element={
            managerMode && <ArchiveForm />
          }></Route>

          <Route path='/archive-modify' element={
            managerMode && <ArchiveModifyForm />
          }></Route>

          <Route path='/archive-detail' element={
            <ArchiveDetail />
          }></Route>
        </Routes>

        <FloatingButton />
        <Footer />
      </BrowserRouter>
    </Box>
  )
};