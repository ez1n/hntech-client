import React, { useEffect } from 'react';
import { categoryApi } from './network/category';
import { adminApi } from './network/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setAllProductCategories, setMainCategories } from './app/reducers/categorySlice';
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
import { toast, ToastContainer } from 'react-toastify';

export default function App() {
  const dispatch = useAppDispatch();
  const managerMode = useAppSelector(state => state.manager.managerMode);

  useEffect(() => {
    // 메인 카테고리 목록
    categoryApi.getMainCategories()
      .then(res => dispatch(setMainCategories({ categories: res })))

    // 제품 카테고리 목록
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({ categories: res.categories })))

    // 홈페이지 하단 정보
    adminApi.getFooter()
      .then(res => dispatch(setFooter({ footer: res })))

    // Banner 
    adminApi.getBanner()
      .then(res => dispatch(setBanner({ banner: res })))

    // Logo
    adminApi.getLogo()
      .then(res => dispatch(setLogo({ logo: res })))

    // 카다록, 자재승인서
    adminApi.getDocument()
      .then(res => { dispatch(setDocument({ document: res })) })

    // 회사 소개 정보 받아오기
    adminApi.getCompany()
      .then(res => dispatch(getCompanyImage({ data: res })))

    console.log('login') // 로그인 지속되는지.. 확인하는거..
  }, []);

  // toast
  const success = () => toast.success('등록되었습니다.');
  const successDelete = () => toast.success('삭제되었습니다.');
  const successModify = () => toast.success('변경되었습니다.');
  const successAnswer = () => toast.success('답변 완료 처리되었습니다.');

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <ToastContainer
          position="top-center"
          autoClose={1500}
        />

        <Box sx={{ flex: 1 }}>
          <Header />
          <SideMenu />

          <Routes>
            <Route path='/' element={
              <Main />
            }></Route>

            <Route path='/company' element={
              <Company success={success} />
            }></Route>

            <Route path='/product' element={
              <Products successDelete={successDelete} />
            }></Route>

            <Route path='/product-detail' element={
              <ProductDetail successDelete={successDelete} />
            }></Route>

            <Route path='/product-form' element={
              managerMode && <ProductForm success={success} />
            }></Route>

            <Route path='/product-modify' element={
              managerMode && <ProductModifyForm successModify={successModify} />
            }></Route>

            <Route path='/productCategory-form' element={
              managerMode && <ProductCategoryForm success={success} />
            }></Route>

            <Route path='/productCategory-modify' element={
              managerMode && <ProductCategoryModifyForm successModify={successModify} />
            }></Route>

            <Route path='/data' element={
              <MainData />
            }></Route>

            <Route path='/question' element={
              <Questions />
            }></Route>

            <Route path='/question-form' element={
              <QuestionForm success={success} />
            }></Route>

            <Route path='/question-modify' element={
              <QuestionModifyForm successModify={successModify} />
            }></Route>

            <Route path='/question-detail' element={
              <QuestionDetail successAnswer={successAnswer} successDelete={successDelete} />
            }></Route>

            <Route path='/archive' element={
              <Archives />
            }></Route>

            <Route path='/archive-form' element={
              managerMode && <ArchiveForm success={success} />
            }></Route>

            <Route path='/archive-modify' element={
              managerMode && <ArchiveModifyForm successModify={successModify} />
            }></Route>

            <Route path='/archive-detail' element={
              <ArchiveDetail successDelete={successDelete} />
            }></Route>
          </Routes>

          <FloatingButton successModify={successModify} />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  )
};