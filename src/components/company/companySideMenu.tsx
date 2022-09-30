import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clickChangeIntroduce,
  clickChangeHistory,
  clickChangeOrgChart,
  clickChangeInfo,
  clickChangeLocation,
  clickChangeMode
} from '../../app/reducers/companySlice';
import {Box, Button, Container, MenuItem, Select, Stack, Typography, styled} from '@mui/material';

export default function CompanySideMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const companyMode = useAppSelector(state => state.company.mode);

  return (
    <SideMenuBox>
      <TitleStack>
        {/* title (회사소개) */}
        <Container sx={{width: 'max-content'}}>
          <Typography
            variant='h5' sx={{pl: 1, pb: 2, width: 'max-content', fontWeight: 'bold'}}>
            회사소개
          </Typography>
        </Container>

        {/* 하위 메뉴 */}
        <MenuButton
          onClick={() => {
            dispatch(clickChangeIntroduce());
            navigate('/company');
          }}
          sx={{
            color: companyMode === 'INTRODUCE' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: companyMode === 'INTRODUCE' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: companyMode === 'INTRODUCE' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          인사말
        </MenuButton>
        <MenuButton
          onClick={() => {
            dispatch(clickChangeHistory());
            navigate('/company');
          }}
          sx={{
            color: companyMode === 'HISTORY' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: companyMode === 'HISTORY' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: companyMode === 'HISTORY' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          회사 연혁
        </MenuButton>
        <MenuButton
          onClick={() => {
            dispatch(clickChangeOrgChart());
            navigate('/company');
          }}
          sx={{
            color: companyMode === 'CHART' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: companyMode === 'CHART' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: companyMode === 'CHART' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          조직도
        </MenuButton>
        <MenuButton
          onClick={() => {
            dispatch(clickChangeInfo());
            navigate('/company');
          }}
          sx={{
            color: companyMode === 'INFORMATION' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: companyMode === 'INFORMATION' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: companyMode === 'INFORMATION' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          CI 소개
        </MenuButton>
        <MenuButton
          onClick={() => {
            dispatch(clickChangeLocation());
            navigate('/company');
          }}
          sx={{
            color: companyMode === 'LOCATION' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: companyMode === 'LOCATION' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: companyMode === 'LOCATION' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          찾아오시는 길
        </MenuButton>
      </TitleStack>

      {/* 900px 이하 */}

      <MenuSelect
        defaultValue={companyMode}
        onChange={(event: any) => dispatch(clickChangeMode({mode: event?.target.value}))}
        size='small'>
        <MenuList value='INTRODUCE'>인사말</MenuList>
        <MenuList value='HISTORY'>회사연혁</MenuList>
        <MenuList value='CHART'> 조직도</MenuList>
        <MenuList value='INFORMATION'>CI 소개</MenuList>
        <MenuList value='LOCATION'>찾아오시는 길</MenuList>
      </MenuSelect>
    </SideMenuBox>
  )
};

const SideMenuBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
  paddingTop: 1,
  paddingBottom: 1,
  marginTop: 5,
  display: 'flex',
  justifyContent: 'flex-end'
})) as typeof Box;

const TitleStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    borderLeft: 'none',
    display: 'none'
  },
  borderLeft: '4px solid rgb(46, 125, 50)',
  width: 'max-content'
})) as typeof Stack;

const MenuButton = styled(Button)(() => ({
  padding: 10,
  paddingLeft: 10,
  paddingRight: 20,
  marginLeft: 20,
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: 10,
  borderRadius: 5,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    transform: 'scale(1.02)'
  }
})) as typeof Button;

const MenuSelect = styled(Select)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    width: '80%'
  },
  display: 'none',
  textAlign: 'center',
  margin: 20
}));

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem;
