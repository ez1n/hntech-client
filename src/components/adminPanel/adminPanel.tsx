import React, {useState} from 'react';
import '../style.css'
import {adminApi} from '../../network/admin';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {onLoading} from '../../app/reducers/dialogSlice';
import {
  setManagerData,
  copyManagerData,
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
import {
  Drawer,
  Fab,
  TextField,
  Typography,
  Stack,
  styled,
} from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import EditButton from '../editButton';
import PasswordUpdate from './passwordUpdate';
import Company from "./company";
import CompanyImage from "./companyImage";
import Documents from "./documents";

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function AdminPanel({successModify, errorToast}: propsType) {
  const dispatch = useAppDispatch();

  const [deleteBannerName, setDeleteBannerName] = useState<{ name: string }[]>([]);

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const adminPassword = useAppSelector(state => state.manager.panelData.adminPassword); // 관리자 정보
  const logoFile = useAppSelector(state => state.manager.logoFile); // 추가한 로고
  const bannerFile = useAppSelector(state => state.manager.bannerFile); // 새로 추가한 배너
  const documentFile = useAppSelector(state => state.manager.documentFile); // 새로 추가한 카다록, 자재 승인서
  const newPanelData = useAppSelector(state => state.manager.newPanelData); // 관리자 정보 변경
  const [onEdit, setOnEdit] = useState(false); // 관리자 정보 수정(drawer) open
  const [openPassword, setOpenPassword] = useState(false);
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

  // 비밀번호 변경 dialog
  const changePassword = () => setOpenPassword(prev => !prev);

  // 기존 배너 삭제
  const deleteOriginBannerImage = (index: number, bannerName: string) => {
    setDeleteBannerName(prev => [...prev, {name: bannerName}]);
    dispatch(deleteOriginBanner({num: index}));
  };

  // 관리자, 회사 정보 변경 요청
  const putUpdatePanelInfo = () => {
    adminApi.putUpdatePanelInfo({
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
      }
    )
      .then(res => {
        successModify();
        dispatch(setFooter({footer: res.footer}));
        dispatch(copyManagerData({panelData: res}));
        dispatch(setManagerData({panelData: res}));
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          errorToast('로그인이 필요합니다.');
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  // 로고, 배너 변경 요청
  const putUpdateImageInfo = () => {
    // 로고 사진
    const logoForm = new FormData();
    logoForm.append('file', logoFile.file);
    logoForm.append('where', 'logo');

    // 배너 사진
    const bannerForm = new FormData();
    bannerFile.map((item: { id: number, file: string, name: string }) => bannerForm.append('files', item.file))

    // 로고 정보 변경 요청
    adminApi.postLogo(logoForm)
      .then(() => {
        adminApi.getImages()
          .then(res => {
            dispatch(addLogoFile({logo: {file: '', name: ''}}));
            dispatch(setLogo({logo: res.logoImage}));
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))

    // 배너 삭제
    deleteBannerName.map((item: { name: string }) => (
      adminApi.deleteImage(item.name)
        .then(() => setDeleteBannerName([]))
        .catch(error => {
          console.log(error);

          if (error.response.status === 401) {
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
    ));

    // 배너 정보 변경 요청
    adminApi.postBanner(bannerForm)
      .then(() => {
        adminApi.getImages()
          .then(res => {
            successModify();
            dispatch(setBanner({banner: res.bannerImages}));
            dispatch(resetBannerFile());
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  // 카다록, 자재승인서 변경 요청
  const putUpdateDocumentInfo = () => {
    dispatch(onLoading());
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

    adminApi.postDocument(documentForm)
      .then(() => {
        adminApi.getDocument()
          .then(res => {
            dispatch(onLoading());
            dispatch(setDocument({document: res}));
            dispatch(resetDocumentFile());
            successModify();
          })
      })
      .catch(error => {
        console.log(error);
        dispatch(onLoading());
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
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

      {/* 슬라이딩 패널 */}
      <Drawer
        anchor='right'
        open={onEdit}
        onClose={closeOnEdit}>
        <Stack spacing={2} sx={{m: 5}}>
          <MainTitleTypography variant='h5'>관리자 비밀번호</MainTitleTypography>

          {/* 관리자 비밀번호 */}
          <ContentStack
            direction='row'
            spacing={5}
            sx={{
              pt: 2,
              pb: 2,
              borderTop: '2px solid rgba(46, 125, 50, 0.5)',
              borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
            }}>
            <TextField
              type={'password'}
              label={'관리자 비밀번호'}
              value={adminPassword}
              disabled
              autoComplete='off'
              placeholder={'현재 비밀번호'}
            />

            <EditButton name='변경' onClick={changePassword}/>

            <PasswordUpdate open={openPassword} onClose={changePassword} successModify={successModify}/>
          </ContentStack>

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

        </Stack>

        <Stack direction='row' sx={{justifyContent: 'center', mb: 3}}>
          <EditButton name='변경' onClick={putUpdateDocumentInfo}/>
        </Stack>

        <ExitStack direction='row'>
          <ExitToAppRoundedIcon
            onClick={closeOnEdit}
            sx={{fontSize: 30, color: 'darkgreen'}}/>
        </ExitStack>
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

const ContentStack = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center'
})) as typeof Stack;

const ExitStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'inline',
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  display: 'none'
})) as typeof Stack;

