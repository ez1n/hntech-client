import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Container, Typography } from '@mui/material';
import CompanySideMenu from './companySideMenu';
import Introduce from './introduce';
import History from './history';
import OrgChart from './orgChart';
import CompanyInfo from './companyInfo';
import Location from './location';

export default function Company() {
  const mode = useAppSelector(state => state.company.mode);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 회사소개 사이드 메뉴 */}
      <Box sx={{ flex: 0.2 }}>
        <CompanySideMenu />
      </Box>

      <Box sx={{ flex: 0.8, mr: '10%' }}>

        {/* 회사 이념 (?) - 보류 */}
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <img className='CIImage' src='/images/logo-letter.png' alt='회사 이념' />
          <Box sx={{ ml: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ color: '#2B5835', fontSize: 20, fontWeight: 'bold' }}>화재안전 보국을 가치로 사람과 기술을 소중히하여</Typography>
            <Typography sx={{ color: '#2B5835', fontSize: 20, fontWeight: 'bold' }}>안심과 안전을 담보로 사회에 공헌하겠습니다.</Typography>
          </Box>
        </Container>

        {/* 컴포넌트 (페이지) */}
        {mode === 'INTRODUCE' && <Introduce />}

        {mode === 'HISTORY' && <History />}

        {mode === 'CHART' && <OrgChart />}

        {mode === 'INFORMATION' && <CompanyInfo />}

        {mode === 'LOCATION' && <Location />}
      </Box>
    </Box>
  )
};