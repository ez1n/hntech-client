import React, {useEffect, useState} from 'react';
import {categoryApi} from './network/category';
import {adminApi} from './network/admin';
import {fileApi} from "./network/file";
import {api} from './network/network';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {setAllProductCategories, setMainCategories} from './app/reducers/categorySlice';
import {
  changeMode,
  copyManagerData,
  setBanner,
  setDocument,
  setFooter,
  setLogo,
  setManagerData
} from './app/reducers/adminSlice';
import {getCompanyImage, updateIntroduce} from './app/reducers/companyModifySlice';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ErrorBoundary} from 'react-error-boundary';
import {Box, Typography} from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
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
import NotFound from './components/notFound/notFound';
import ProductMiddleCategoryModifyForm from "./components/productCategoryModifyForm/productMiddleCategoryModifyForm";
import ProductMainCategoryForm from "./components/productCategoryForm/productMainCategoryForm";
import ProductMiddleCategoryForm from "./components/productCategoryForm/productMiddleCategoryForm";
import ProductMainCategoryModifyForm from "./components/productCategoryModifyForm/productMainCategoryModifyForm";
import Loading from "./components/loading";

export default function App() {
  const dispatch = useAppDispatch();
  const [catalogPDF, setCatalogPDF] = useState('');
  const [approvalPDF, setApprovalPDF] = useState('');
  const [taxPDF, setTaxPDF] = useState('');

  const document = useAppSelector(state => state.manager.document); // 카다록, 자재승인서 정보

  // 관리자 패널 정보
  const getPanelInfo = () => {
    adminApi.getPanelInfo()
      .then(res => {
        dispatch(setManagerData({panelData: res}));
        dispatch(copyManagerData({panelData: res}));
      })
  };

  // 로그인 확인
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

  // data
  useEffect(() => {
    // 홈페이지 하단 정보
    adminApi.getFooter()
      .then(res => dispatch(setFooter({footer: res})))
      .catch(error => console.log(error))

    // 메인 카테고리 목록
    categoryApi.getRepCategories()
      .then(res => dispatch(setMainCategories({categories: res})))
      .catch(error => console.log(error))

    // 제품 카테고리 목록
    categoryApi.getMainProductCategory()
      .then(res => dispatch(setAllProductCategories({categories: res})))
      .catch(error => console.log(error))

    // 카다록, 자재승인서, 시국세
    adminApi.getDocument()
      .then(res => dispatch(setDocument({document: res})))
      .catch(error => console.log(error))

    // 회사 소개 정보, Banner, Logo
    adminApi.getCompany()
      .then(res => {
        dispatch(getCompanyImage({data: res}));
        dispatch(setBanner({banner: res.bannerImages}));
        dispatch(setLogo({logo: res.logoImage}));
      })
      .catch(error => console.log(error))

    // 인사말
    adminApi.getIntroduce()
      .then(res => dispatch(updateIntroduce({newIntroduce: res.newIntroduce})))
      .catch(error => console.log(error))
  }, []);

  // 카다록, 자재승인서, 시국세
  useEffect(() => {
    if (!!document.catalogServerFilename) {
      fileApi.downloadFile(document.catalogServerFilename)
        .then(res => setCatalogPDF(URL.createObjectURL(res)))
        .catch(error => console.log(error))

      fileApi.downloadFile(document.materialServerFilename)
        .then(res => setApprovalPDF(URL.createObjectURL(res)))
        .catch(error => console.log(error))

      fileApi.downloadFile(document.taxServerFilename)
        .then(res => setTaxPDF(URL.createObjectURL(res)))
        .catch(error => console.log(error))
    }
  }, [document.catalogServerFilename]);

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
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Box className={'app'} sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw'}}>
          <ToastContainer position="top-center" autoClose={1000}/>

          <Box sx={{flex: 1}}>
            <Header/>
            <SideMenu/>

            <Routes>
              <Route path='/' element={
                <Main/>
              }></Route>

              <Route path='/company' element={
                <Company success={success} errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category' element={
                <Products successDelete={successDelete}/>
              }></Route>

              <Route path='/product' element={
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

              <Route path='/product/category/main/form' element={
                <ProductMainCategoryForm
                  success={success}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category/main/modify' element={
                <ProductMainCategoryModifyForm
                  successModify={successModify}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category/middle/form' element={
                <ProductMiddleCategoryForm
                  success={success}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/product/category/middle/modify' element={
                <ProductMiddleCategoryModifyForm
                  successModify={successModify}
                  errorToast={errorToast}/>
              }></Route>

              <Route path='/document' element={
                <MainData
                  catalogPDF={catalogPDF}
                  approvalPDF={approvalPDF}
                  taxPDF={taxPDF}/>
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
                  errorToast={errorToast}
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

              <Route path='*' element={
                <NotFound/>
              }></Route></Routes>

            <AdminPanel successModify={successModify} errorToast={errorToast}/>
          </Box>
          <Footer/>
        </Box>

        <Loading/>
      </BrowserRouter>
    </ErrorBoundary>
  )
};