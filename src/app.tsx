import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
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
            <ProductForm />
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

          <Route path='/notice-form' element={
            <NoticeForm />
          }></Route>

          <Route path='/question-detail' element={
            <QuestionDetail />
          }></Route>

          <Route path='/archive' element={
            <Archives />
          }></Route>

          <Route path='/archive-form' element={
            <ArchiveForm />
          }></Route>

          <Route path='/archive-detail' element={
            <ArchiveDetail />
          }></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  )
};