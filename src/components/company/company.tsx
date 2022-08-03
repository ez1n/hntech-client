import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Container } from '@mui/material';
import CompanySideMenu from './companySideMenu';
import Introduce from './introduce';
import History from './history';
import OrgChart from './orgChart';
import CompanyInfo from './companyInfo';
import Location from './location';

export default function Company() {
  const mode = useAppSelector(state => state.company.mode);

  return (
    <Container sx={{ display: 'flex' }}>
      {/* 회사소개 사이드 메뉴 */}
      <CompanySideMenu />

      {/* 컴포넌트 (페이지) */}
      {mode === 'INTRODUCE' && <Introduce />}

      {mode === 'HISTORY' && <History />}

      {mode === 'CHART' && <OrgChart />}

      {mode === 'INFORMATION' && <CompanyInfo />}

      {mode === 'LOCATION' && <Location />}
    </Container>
  )
};