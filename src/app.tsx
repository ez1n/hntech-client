import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header';
import Main from './components/main/main';
import Footer from './components/footer';
import Company from './components/company/company';
import Products from './components/products/products';
import ProductDetail from './components/productDetail/productDetail';

export default function App() {
  return (
    <Box sx={{ maxWidth: '1350px', m: 'auto' }}>
      <BrowserRouter>
        <Header />

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
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}