import React, { useEffect } from 'react';
import { categoryApi } from './network/category';
import { adminApi } from './network/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAllProductCategories } from './app/reducers/categorySlice';
import { setBanner, setDocument, setFooter, setLogo } from './app/reducers/managerModeSlice';
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
import QuestionDetail from './components/questionDetail/questionDetail';
import Archives from './components/archives/archives';
import ArchiveForm from './components/archiveForm/archiveForm';
import ArchiveDetail from './components/archiveDetail';
import FloatingButton from './components/managerPanel/floatingButton';
import ProductModifyForm from './components/productModifyForm/productModifyForm';
import QuestionModifyForm from './components/questionModifyForm/questionModifyForm';
import ArchiveModifyForm from './components/archiveModifyForm/archiveModifyForm';
import ProductCategoryForm from './components/productCategoryForm/productCategoryForm';
import ProductCategoryModifyForm from './components/productCategoryModifyForm/productCategoryModifyForm';
import { getCompanyImage } from './app/reducers/companyModifySlice';

export default function App() {
  const dispatch = useAppDispatch();
  const managerMode = useAppSelector(state => state.manager.managerMode);

  useEffect(() => {
    // 제품 카테고리 목록
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({ categories: res.categories })))

    // 홈페이지 하단 정보
    adminApi.getFooter()
      .then(res => dispatch(setFooter({ footer: res })))

    // Banner 
    adminApi.getBanner()
      .then(res => dispatch(setBanner({ banner: res })))
      .catch(error => console.log(error))

    // Logo
    adminApi.getLogo()
      .then(res => dispatch(setLogo({ logo: res })))
      .catch(error => console.log(error))

    // 카다록, 자재승인서
    adminApi.getDocument()
      .then(res => { dispatch(setDocument({ document: res })) })
      .catch(error => console.log(error))

    // 회사 소개 정보 받아오기
    adminApi.getCompany()
      .then(res => dispatch(getCompanyImage({ data: res })))
      .catch(error => console.log(error))

    console.log('login') // 로그인 지속되는지.. 확인하는거..
  }, []);

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <Box sx={{ flex: 1 }}>
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

            <Route path='/productCategory-form' element={
              managerMode && <ProductCategoryForm />
            }></Route>

            <Route path='/productCategory-modify' element={
              managerMode && <ProductCategoryModifyForm />
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
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  )
};