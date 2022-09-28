import React, {useState} from 'react';
import './style.css';
import {adminApi} from '../network/admin';
import {api} from '../network/network';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {changeMode} from '../app/reducers/managerModeSlice';
import {clickManagerLogin} from '../app/reducers/dialogSlice';
import {
  Box,
  Button,
  Stack,
  styled,
  Typography
} from '@mui/material';
import CancelModal from './cancelModal';
import Login from './login';

export default function Footer() {
  const dispatch = useAppDispatch();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const footer = useAppSelector(state => state.manager.footer); // footer 정보
  const logo = useAppSelector(state => state.manager.logo); // 회사 로고
  const sites = useAppSelector(state => state.manager.footer.sites); // FAMILY SITE
  const [onLogout, setOnLogout] = useState(false); // 로그아웃

  // 로그아웃 modal
  const openLogout = () => {
    setOnLogout(onLogout => !onLogout);
  };

  const closeLogout = () => {
    setOnLogout(false);
  };

  // 로그아웃
  const getLogout = () => {
    adminApi.getLogout()
      .then(res => {
        localStorage.removeItem("login");
        closeLogout();
        const isLogin = localStorage.getItem("login");
        dispatch(changeMode({login: isLogin}));
      })
  };

  return (
    <Box sx={{p: 3, pb: 0, mt: 10, backgroundColor: '#042709'}}>
      {/* 로고 */}
      <LogoStack direction='row' spacing={2}>
        <img className='logoImage' src={`${api.baseUrl()}/files/admin/${logo.serverFilename}`} alt='HNTECH logo'/>
        <img className='logoKor' src='/images/korLogo.png' alt='korean logo'/>
      </LogoStack>

      {/* 회사 정보 */}
      <FooterStack direction='row'>
        <InfoBox>
          <ContentTypography sx={{mb: 1}}>
            본사 : {footer.address}
          </ContentTypography>

          <ContentBox>
            <ContentTypography>
              TEL : {footer.phone}
            </ContentTypography>

            <ContentTypography>
              FAX : {footer.fax}
            </ContentTypography>

            <ContentTypography sx={{color: '#e5ff3f', fontSize: 'large', fontWeight: 'bold'}}>
              A/S : {footer.afterService}
            </ContentTypography>
          </ContentBox>

          <ContentTypography sx={{mt: 2}}>
            https://www.hntec.co.kr
          </ContentTypography>
        </InfoBox>

        {/* FAMILY SITE */}
        <SiteBox>
          <ContentTypography sx={{mb: 1}}>
            FAMILY SITE
          </ContentTypography>

          {sites.map((item: { buttonName: string, link: string, id: number }) => (
            <a className={'familySite'} href={item.link} target='_blank' key={item.id}>
              <ContentTypography sx={{'&: hover': {color: '#ccff66'}}}>
                {item.buttonName}
              </ContentTypography>
            </a>
          ))}
        </SiteBox>
      </FooterStack>

      {/* 관리자 모드 버튼 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
        <Button
          onClick={managerMode ? openLogout : () => dispatch(clickManagerLogin())}
          sx={{
            color: '#FCFCFC',
            opacity: 0.6
          }}>
          {managerMode ? '로그아웃' : '관리자 모드'}
        </Button>
      </Box>

      <Login/>

      {/* 로그아웃 dialog */}
      <CancelModal
        openState={onLogout}
        title={'관리자 로그아웃'}
        text1={'로그아웃 하시겠습니까?'}
        text2={''}
        yesAction={getLogout}
        closeAction={closeLogout}
      />
    </Box>
  )
};

const LogoStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    width: '80% !important'
  },
  margin: 'auto',
  marginBottom: 15,
  width: '60%',
  display: 'flex',
  alignItems: 'center'
})) as typeof Stack;

const FooterStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    width: '80% !important'
  },
  width: '60%',
  margin: 'auto'
})) as typeof Stack;

const InfoBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    flex: 0.6,
  },
  width: 'max-content',
  flex: 0.7
})) as typeof Box;

const ContentBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  },
  display: 'flex',
  alignItems: 'center'
})) as typeof Box;

const ContentTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 'small'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    marginRight: 10
  },
  color: '#FCFCFC',
  opacity: 0.8,
  marginRight: 15,
  fontWeight: 'bold'
})) as typeof Typography;

const SiteBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    flex: 0.4
  },
  flex: 0.3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
})) as typeof Box;