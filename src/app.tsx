import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

export default function App() {
  return (
    <Box sx={{ maxWidth: '1350px', m: 'auto' }}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/' element={
            <Main />
          }></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </Box>
  );
}