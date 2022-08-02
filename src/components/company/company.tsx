import React, { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks'
import CompanyInfo from './companyInfo';
import History from './history';
import Introduce from './introduce';
import Location from './location';
import OrgChart from './orgChart';

export default function Company() {
  const mode = useAppSelector(state => state.company.mode);

  if (mode === 'INTRODUCE') {
    return (
      <Introduce />
    )
  }
  if (mode === 'HISTORY') {
    return (
      <History />
    )
  }
  if (mode === 'CHART') {
    return (
      <OrgChart />
    )
  }
  if (mode === 'INFORMATION') {
    return (
      <CompanyInfo />
    )
  }
  if (mode === 'LOCATION') {
    return (
      <Location />
    )
  }
  return (
    <>
      <Introduce />
      <History />
      <OrgChart />
      <CompanyInfo />
      <Location />
    </>
  )
};