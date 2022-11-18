import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {Box, Button, Container, MenuItem, Select, Stack, Typography, styled} from '@mui/material';

export default function CompanySideMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const type = new URLSearchParams(location.search).get('type');

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
          onClick={() => navigate('/company?type=introduce')}
          sx={{
            color: type === 'introduce' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: type === 'introduce' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: type === 'introduce' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          인사말
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/company?type=history')}
          sx={{
            color: type === 'history' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: type === 'history' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: type === 'history' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          회사 연혁
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/company?type=orgChart')}
          sx={{
            color: type === 'orgChart' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: type === 'orgChart' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: type === 'orgChart' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          조직도
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/company?type=CI')}
          sx={{
            color: type === 'CI' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: type === 'CI' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: type === 'CI' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          CI 소개
        </MenuButton>
        <MenuButton
          onClick={() => navigate('/company?type=location')}
          sx={{
            color: type === 'location' ? '#F0F0F0' : '#0F0F0F',
            backgroundColor: type === 'location' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
            '&:hover': {
              backgroundColor: type === 'location' ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
            }
          }}>
          찾아오시는 길
        </MenuButton>
      </TitleStack>

      {/* 900px 이하 */}

      <MenuSelect
        value={type}
        onChange={(event: any) => navigate(`/company?type=${event?.target.value}`)}
        size='small'>
        <MenuList value='introduce'>인사말</MenuList>
        <MenuList value='history'>회사연혁</MenuList>
        <MenuList value='orgChart'> 조직도</MenuList>
        <MenuList value='CI'>CI 소개</MenuList>
        <MenuList value='location'>찾아오시는 길</MenuList>
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
