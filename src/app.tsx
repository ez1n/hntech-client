import React, {useEffect} from 'react';
import {categoryApi} from './network/category';
import {adminApi} from './network/admin';
import {api} from './network/network';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useAppDispatch} from './app/hooks';
import {setAllProductCategories, setMainCategories} from './app/reducers/categorySlice';
import {
  changeMode,
  copyManagerData,
  setBanner,
  setDocument,
  setFooter,
  setLogo,
  setManagerData
} from './app/reducers/managerModeSlice';
import {getCompanyImage} from './app/reducers/companyModifySlice';
import {Box, Typography} from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ErrorBoundary} from 'react-error-boundary';
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
import AdminPanel from './components/adminPanel/adminPanel';
import ProductModifyForm from './components/productModifyForm/productModifyForm';
import QuestionModifyForm from './components/questionModifyForm/questionModifyForm';
import ArchiveModifyForm from './components/archiveModifyForm/archiveModifyForm';
import ProductCategoryForm from './components/productCategoryForm/productCategoryForm';
import ProductCategoryModifyForm from './components/productCategoryModifyForm/productCategoryModifyForm';
import NotFound from './components/notFound/notFound';

export default function App() {
  const dispatch = useAppDispatch();

  // 관리자 패널 정보
  const getPanelInfo = () => {
    adminApi.getPanelInfo()
      .then(res => {
        dispatch(setManagerData({panelData: res}));
        dispatch(copyManagerData({panelData: res}));
      })
  };

  // data
  useEffect(() => {
    // 메인 카테고리 목록
    categoryApi.getMainCategories()
      .then(res => dispatch(setMainCategories({categories: res})))

    // 제품 카테고리 목록
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({categories: res.categories})))

    // 홈페이지 하단 정보
    adminApi.getFooter()
      .then(res => dispatch(setFooter({footer: res})))

    // Banner
    adminApi.getBanner()
      .then(res => dispatch(setBanner({banner: res})))

    // Logo
    adminApi.getLogo()
      .then(res => dispatch(setLogo({logo: res})))

    // 카다록, 자재승인서, 시국세
    adminApi.getDocument()
      .then(res => dispatch(setDocument({document: res})))

    // 회사 소개 정보
    adminApi.getCompany()
      .then(res => dispatch(getCompanyImage({data: res})))
  }, []);

  // 로그인 여부 확인
  useEffect(() => {
    api.getCheckLogin()
      .then(res => {
        if (!res) {
          localStorage.removeItem("login");
          dispatch(changeMode({login: localStorage.getItem("login")}));
        } else {
          dispatch(changeMode({login: localStorage.getItem("login")}));
          getPanelInfo();
        }
      })
  }, []);

  // toast
  const success = () => toast.success('등록되었습니다.');
  const successDelete = () => toast.success('삭제되었습니다.');
  const successModify = () => toast.success('변경되었습니다.');
  const successAnswer = () => toast.success('답변 완료 처리되었습니다.');
  const errorToast = (message: string) => toast.error(message);

  // error boundary
  function ErrorFallback(error: any) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ReportProblemRoundedIcon sx={{color: '#FFCC00', fontSize: 150}}/>
        <Typography sx={{fontSize: 18, mt: 8}}>{error.message ? error.message : '오류가 발생했습니다.'}</Typography>
      </Box>
    )
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Box className={'app'} sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
          <ToastContainer
            position="top-center"
            autoClose={1000}
          />

          <Box sx={{flex: 1}}>
            <Header/>
            <SideMenu/>

            <Routes>
              <Route path='/' element={
                <Main/>
              }></Route>

              <Route path='/company' element={
                <Company success={success}/>
              }></Route>

              <Route path='/product/category' element={
                <Products successDelete={successDelete}/>
              }></Route>

              <Route path='/product/:categoryName/:index' element={
                <ProductDetail successDelete={successDelete}/>
              }></Route>

              <Route path='/product/form' element={
                <ProductForm
                  success={success}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/modify' element={
                <ProductModifyForm
                  successModify={successModify}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category/form' element={
                <ProductCategoryForm
                  success={success}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category/modify' element={
                <ProductCategoryModifyForm
                  successModify={successModify}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/document' element={
                <MainData/>
              }></Route>

              <Route path='/question' element={
                <Questions/>
              }></Route>

              <Route path='/question/form' element={
                <QuestionForm
                  success={success}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/question/modify' element={
                <QuestionModifyForm
                  successModify={successModify}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/question/:index' element={
                <QuestionDetail
                  successAnswer={successAnswer}
                  successDelete={successDelete}/>
              }></Route>

              <Route path='/archive' element={
                <Archives errorToast={errorToast}/>
              }></Route>

              <Route path='/archive/form' element={
                <ArchiveForm
                  success={success}
                  errorToast={errorToast}
                />
              }></Route>

              <Route path='/archive/modify' element={
                <ArchiveModifyForm
                  successModify={successModify}
                  errorToast={errorToast}
                />
              }></Route>

              <Route path='/archive/:index' element={
                <ArchiveDetail successDelete={successDelete}/>
              }></Route>

              <Route path='*' element={<NotFound/>}></Route></Routes>

            <AdminPanel successModify={successModify}/>
          </Box>
          <Footer/>
        </Box>
      </BrowserRouter>
    </ErrorBoundary>
  )
};