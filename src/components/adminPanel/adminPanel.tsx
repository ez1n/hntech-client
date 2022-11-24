import React, {useState} from 'react';
import '../style.css'
import {adminApi} from '../../network/admin';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {onLoading} from '../../app/reducers/dialogSlice';
import {
  setManagerData,
  setBanner,
  deleteOriginBanner,
  setLogo,
  addLogoFile,
  resetBannerFile,
  setFooter,
  setDocument,
  changeMode,
  resetDocumentFile
} from '../../app/reducers/adminSlice';
import {Drawer, Fab, Typography, Stack, styled, Box} from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import EditButton from '../editButton';
import Company from './company';
import CompanyImage from './companyImage';
import Documents from './documents';
import Password from './password';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function AdminPanel({successModify, errorToast}: propsType) {
  const dispatch = useAppDispatch();

  const [deleteBannerName, setDeleteBannerName] = useState<string[]>([]);

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const logoFile = useAppSelector(state => state.manager.logoFile); // 추가한 로고
  const bannerFile = useAppSelector(state => state.manager.bannerFile); // 새로 추가한 배너
  const documentFile = useAppSelector(state => state.manager.documentFile); // 새로 추가한 카다록, 자재 승인서
  const newPanelData = useAppSelector(state => state.manager.newPanelData); // 관리자 정보 변경
  const [onEdit, setOnEdit] = useState(false); // 관리자 정보 수정(drawer) open
  const {
    emailSendingTime,
    address,
    afterService,
    fax,
    phone,
    receiveEmailAccount,
    sendEmailAccount,
    sendEmailPassword,
    sites
  } = newPanelData;

  // 관리자 패널 - open
  const openOnEdit = () => setOnEdit(onEdit => !onEdit);

  // 관리자 패널 - close
  const closeOnEdit = () => setOnEdit(false);

  // 기존 배너 삭제
  const deleteOriginBannerImage = (index: number, bannerName: string) => {
    setDeleteBannerName(prev => [...prev, bannerName]);
    dispatch(deleteOriginBanner({num: index}));
  };

  // 로그인 에러
  const loginError = (code: number) => {
    if (code === 401) {
      errorToast('로그인이 필요합니다.');
      localStorage.removeItem('login');
      const isLogin = localStorage.getItem('login');
      dispatch(changeMode({login: isLogin}));
    }
  };

  // 로고 변경 요청
  const postLogo = () => {
    const logoForm = new FormData();
    logoForm.append('file', logoFile.file);
    logoForm.append('where', 'logo');

    return adminApi.postLogo(logoForm)
  };

  // 배너 변경 요청
  const postBanner = () => {
    const bannerForm = new FormData();
    bannerFile.map((item: { id: number, file: string, name: string }) => bannerForm.append('files', item.file))

    return adminApi.postBanner(bannerForm);
  };

  // 회사 이미지 요청 (로고, 배너)
  const getImages = (type: string | unknown) => {
    switch (type) {
      case 'logo':
        return adminApi.getImages()
          .then(res => {
            dispatch(addLogoFile({logo: {file: '', name: ''}}));
            dispatch(setLogo({logo: res.logoImage}));
          })
          .catch(console.log)
      case 'banner':
        return adminApi.getImages()
          .then(res => {
            successModify();
            dispatch(setBanner({banner: res.bannerImages}));
            dispatch(resetBannerFile());
          })
          .catch(console.log)
      default:
        throw new Error(`${type}: 요청할 수 없는 이미지 유형입니다.`);
    }
  };

  // 문서 변경 요청
  const postDocument = () => {
    const documentForm = new FormData();
    documentFile.catalog.file === '' ?
      documentForm.append('catalogFile', new Blob()) :
      documentForm.append('catalogFile', documentFile.catalog.file);
    documentFile.approval.file === '' ?
      documentForm.append('materialFile', new Blob()) :
      documentForm.append('materialFile', documentFile.approval.file);
    documentFile.tax.file === '' ?
      documentForm.append('taxFile', new Blob()) :
      documentForm.append('taxFile', documentFile.tax.file);

    return adminApi.postDocument(documentForm);
  };

  // 문서 요청
  const getDocument = () => {
    adminApi.getDocument()
      .then(res => {
        dispatch(setDocument({document: res}));
        dispatch(resetDocumentFile());
        successModify();
      })
      .catch(console.log)
  };

  // 관리자, 회사 정보 변경 함수
  const putUpdatePanelInfo = () => {
    dispatch(onLoading());

    const newPanelData = {
      emailSendingTime: emailSendingTime,
      address: address,
      afterService: afterService,
      fax: fax,
      phone: phone,
      receiveEmailAccount: receiveEmailAccount,
      sendEmailAccount: sendEmailAccount,
      sendEmailPassword: sendEmailPassword,
      sites: sites.map((item: { id: number, buttonName: string, link: string }) => (
          {buttonName: item.buttonName, link: item.link}
        )
      )
    };

    adminApi.putUpdatePanelInfo(newPanelData)
      .then(res => {
        successModify();
        dispatch(setFooter({footer: res.footer}));
        dispatch(setManagerData({panelData: res}));
      })
      .catch(error => {
        console.log(error);
        loginError(error.response.status);
      })
      .finally(() => dispatch(onLoading()))
  };

  // 로고, 배너 변경 함수
  const putUpdateImageInfo = () => {
    dispatch(onLoading());
    // 로고 변경
    postLogo()
      .then(type => getImages(type))
      .catch(error => {
        console.log(error);
        loginError(error.response.status);
      })

    // 배너 삭제
    deleteBannerName.map((item: string) => (
      adminApi.deleteImage(item)
        .then(() => setDeleteBannerName([]))
        .catch(error => {
          errorToast('배너를 삭제할 수 없습니다.');
          console.log(error);
        })
    ));

    // 배너 변경
    postBanner()
      .then(type => getImages(type))
      .catch(error => {
        console.log(error);
        loginError(error.response.status);
      })
      .finally(() => dispatch(onLoading()))
  };

  // 문서 변경 함수
  const putUpdateDocumentInfo = () => {
    dispatch(onLoading());
    postDocument()
      .then(() => getDocument())
      .catch(error => {
        console.log(error);
        loginError(error.response.status);
      })
      .finally(() => dispatch(onLoading()))
  };

  return (
    <>
      {/*  정보변경 버튼 */}
      {managerMode &&
        <AdminFab variant={'extended'} onClick={openOnEdit}>
          <ManageAccountsRoundedIcon fontSize='large'/>
          <AdminTypography>정보 수정</AdminTypography>
        </AdminFab>
      }

      {/* 관리자 패널 */}
      <Drawer
        anchor='right'
        open={onEdit}
        onClose={closeOnEdit}>
        <Stack spacing={2} sx={{m: 5}}>
          {/* 관리자 비밀번호 변경 */}
          <MainTitleTypography variant='h5'>관리자 비밀번호</MainTitleTypography>
          <Password successModify={successModify} errorToast={errorToast}/>

          {/* 관리자 / 회사 정보 */}
          <MainTitleTypography variant='h5'>관리자 / 회사 정보</MainTitleTypography>
          <Company/>

          <Stack sx={{alignItems: 'center', mb: 5}}>
            <EditButton name='변경' onClick={putUpdatePanelInfo}/>
          </Stack>

          {/* 홈페이지 정보 */}
          <MainTitleTypography variant='h5' sx={{paddingBottom: 0}}>홈페이지 정보</MainTitleTypography>
          <CompanyImage deleteOriginBannerImage={deleteOriginBannerImage}/>

          <Stack sx={{alignItems: 'center', mb: 5}}>
            <EditButton name='변경' onClick={putUpdateImageInfo}/>
          </Stack>

          {/* 카다록 / 자재승인서 / 시국세 */}
          <MainTitleTypography variant='h5' sx={{paddingBottom: 0}}>카다록 / 자재승인서</MainTitleTypography>
          <Documents/>

          <Stack direction='row' sx={{justifyContent: 'center', mb: 3}}>
            <EditButton name='변경' onClick={putUpdateDocumentInfo}/>
          </Stack>
        </Stack>

        <ExitBox>
          <ExitToAppRoundedIcon onClick={closeOnEdit} sx={{fontSize: 30, color: 'darkgreen'}}/>
        </ExitBox>
      </Drawer>
    </>
  )
};

const AdminFab = styled(Fab)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    right: 30,
  },
  position: 'fixed',
  right: 50,
  bottom: 50
})) as typeof Fab;

const AdminTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  marginLeft: 8
})) as typeof Typography;

const MainTitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '100% !important'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
  paddingTop: 15,
  paddingBottom: 15,
  textAlign: 'center',
  width: 550
})) as typeof Typography;

const ExitBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'inline',
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  display: 'none'
})) as typeof Box;