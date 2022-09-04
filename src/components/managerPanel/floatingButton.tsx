import React, { useState } from 'react';
import '../style.css'
import { adminApi } from '../../network/admin';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickEditGoBack, clickPasswordStateGoBack } from '../../app/reducers/dialogSlice';
import {
  updateManagerPassword,
  updateManagerSentMail,
  updateManagerReceivedMail,
  updateManagerTime,
  updateAddress,
  updateAfterService,
  updateFax,
  updatePhone,
  setManagerData,
  updateManagerSendEmailPassword,
  copyManagerData,
  deleteBanner,
  setBanner,
  addBannerFile,
  deleteOriginBanner,
  setLogo,
  addLogoFile,
  addApproval,
  addCatalog,
  updateDocument,
  resetBannerFile,
  setFooter
} from '../../app/reducers/managerModeSlice';
import {
  Drawer,
  Fab,
  TextField,
  Typography,
  Stack,
  styled,
  Select,
  MenuItem,
  List,
  ListItem
} from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import PasswordUpdate from './passwordUpdate';

export default function FloatingButton() {
  const dispatch = useAppDispatch();

  const [deleteBannerName, setDeleteBannerName] = useState<{ name: string }[]>([])

  const bannerForm = new FormData();
  const logoForm = new FormData();
  const documentForm = new FormData();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const editState = useAppSelector(state => state.dialog.editState); // 관리자 정보 수정(drawer) open state
  const panelData = useAppSelector(state => state.manager.panelData); // 관리자 정보 state
  const newPanelData = useAppSelector(state => state.manager.newPanelData); // 관리자 정보 변경 state
  const logo = useAppSelector(state => state.manager.logo); // 기존 로고 state
  const logoFile = useAppSelector(state => state.manager.logoFile); // 추가한 로고 state
  const banner = useAppSelector(state => state.manager.banner); // 기존 배너 state
  const bannerFile = useAppSelector(state => state.manager.bannerFile); // 새로 추가한 배너 state
  const documentName = useAppSelector(state => state.manager.document); // 기존 카다록, 자재승인서 이름 state
  const documentFile = useAppSelector(state => state.manager.documentFile); // 새로 추가한 카다록, 자재 승인서 state

  // 배너 사진 추가
  const addBannerImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addBannerFile({ banner: { file: event?.target.files[i], name: event?.target.files[i].name } }))
    }
  };

  // 새로 추가한 배너 삭제
  const deleteBannerImage = (index: number) => { dispatch(deleteBanner({ num: index })) };

  // 기존 배너 삭제
  const deleteOriginBannerImage = (index: number, bannerName: string) => {
    setDeleteBannerName([...deleteBannerName, { name: bannerName }]);
    dispatch(deleteOriginBanner({ num: index }));
  };

  // 관리자, 회사 정보 변경 요청
  const putUpdatePanelInfo = (panelData: {
    emailSendingTime: string,
    address: string,
    afterService: string,
    fax: string,
    phone: string,
    receiveEmailAccount: string,
    sendEmailAccount: string,
    sendEmailPassword: string
  }) => {
    adminApi.putUpdatePanelInfo(panelData)
      .then(res => {
        dispatch(setManagerData({ panelData: res }));
        dispatch(copyManagerData({ panelData: res }));
        dispatch(setFooter({ footer: res.footer }));
      })
      .catch(error => console.log(error))
  };

  // 로고, 배너 변경 요청
  const putUpdateImageInfo = () => {
    // 로고 사진
    logoForm.append('file', logoFile.file);
    logoForm.append('where', 'logo');
    // 배너 사진
    bannerFile.map((item: { file: string, name: string }) => bannerForm.append('files', item.file))

    // 로고 정보 변경 요청
    adminApi.postLogo(logoForm)
      .then(res => dispatch(setLogo({ logo: res })))
      .catch(error => console.log('postLogo', error))

    // 배너 삭제
    deleteBannerName.map((item: { name: string }) => (
      adminApi.deleteBanner(item.name)
        .then(res => setDeleteBannerName([]))
        .catch(error => console.log(error))
    ))

    // 배너 정보 변경 요청
    adminApi.postBanner(bannerForm)
      .then(res => {
        dispatch(setBanner({ banner: res }));
        dispatch(resetBannerFile());
      })
      .catch(error => console.log('postBanner', error))
  };

  // 카다록, 자재승인서 변경 요청
  const putUpdateDocumentInfo = () => {
    documentForm.append('catalogFile', documentFile.catalog.file);
    documentForm.append('materialFile', documentFile.approval.file);

    adminApi.postDocument(documentForm)
      .then(res => dispatch(updateDocument({
        catalogOriginalFilename: res.catalogOriginalFilename,
        materialOriginalFilename: res.materialOriginalFilename
      })))
      .catch(error => console.log(error))
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      {managerMode &&
        <Fab
          variant='extended'
          onClick={() => dispatch(clickEditGoBack())}
          sx={{
            position: 'fixed',
            right: 50,
            bottom: 50
          }}>
          <ManageAccountsRoundedIcon fontSize='large' sx={{ mr: 1 }} />
          정보 수정
        </Fab>
      }

      {/* 슬라이딩 패널 */}
      <Drawer
        anchor='right'
        open={editState}
        onClose={() => dispatch(clickEditGoBack())} >
        <Stack spacing={2} sx={{ m: 5 }}>
          <MainTitleTypography variant='h5'>관리자 정보</MainTitleTypography>

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
              value={panelData.adminPassword}
              disabled
              onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
              placeholder={'현재 비밀번호'} />

            {EditButton('변경', () => dispatch(clickPasswordStateGoBack()))}

            <PasswordUpdate />
          </ContentStack>

          {/* 메일 주소 */}
          <ContentStack direction='row' spacing={5}>
            <TextField
              type={'email'}
              label={'수신 메일'}
              value={newPanelData.receiveEmailAccount}
              onChange={event => dispatch(updateManagerReceivedMail({ receiveEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'}
              sx={{ flex: 0.45 }} />

            <TextField
              type={'email'}
              label={'발신 메일'}
              value={newPanelData.sendEmailAccount}
              onChange={event => dispatch(updateManagerSentMail({ sendEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'}
              sx={{ flex: 0.45 }} />
          </ContentStack>

          {/* 발신 메일 비밀번호, 메일 발송 시간 */}
          <ContentStack
            direction='row'
            spacing={5}
            sx={{ borderBottom: '2px solid rgba(46, 125, 50, 0.5)', }}>
            <TextField
              type={'password'}
              label={'발신 메일 비밀번호'}
              value={newPanelData.sendEmailPassword}
              onChange={event => dispatch(updateManagerSendEmailPassword({ sendEmailPassword: event?.target.value }))}
              placeholder={'발신 메일 비밀번호'}
              sx={{ flex: 0.45 }} />

            <ContentStack
              direction='column'
              sx={{ pb: 2, alignItems: 'flex-start', flex: 0.45 }}>
              <Typography variant='caption' sx={{ textAlign: 'left' }}>메일 발송 시간</Typography>
              <Select
                defaultValue={newPanelData.emailSendingTime}
                onChange={event => dispatch(updateManagerTime({ emailSendingTime: event?.target.value }))}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 300 } }
                }}
                sx={{
                  textAlign: 'center',
                  fontSize: 18,
                  width: '100%'
                }}>
                <MenuList value='5'>05:00</MenuList><MenuList value='6'>06:00</MenuList>
                <MenuList value='7'>07:00</MenuList><MenuList value='8'>08:00</MenuList>
                <MenuList value='9'>09:00</MenuList><MenuList value='10'>10:00</MenuList>
                <MenuList value='11'>11:00</MenuList><MenuList value='12'>12:00</MenuList>
                <MenuList value='13'>13:00</MenuList><MenuList value='14'>14:00</MenuList>
                <MenuList value='15'>15:00</MenuList><MenuList value='16'>16:00</MenuList>
                <MenuList value='17'>17:00</MenuList><MenuList value='18'>18:00</MenuList>
                <MenuList value='19'>19:00</MenuList><MenuList value='20'>20:00</MenuList>
                <MenuList value='21'>21:00</MenuList><MenuList value='22'>22:00</MenuList>
                <MenuList value='23'>23:00</MenuList><MenuList value='0'>00:00</MenuList>
                <MenuList value='1'>01:00</MenuList><MenuList value='2'>02:00</MenuList>
                <MenuList value='3'>03:00</MenuList><MenuList value='4'>04:00</MenuList>
              </Select>
            </ContentStack>
          </ContentStack>

          <MainTitleTypography variant='h5'>회사 정보</MainTitleTypography>

          <ContentStack
            direction='row'
            spacing={5}
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TextField
              type={'text'}
              label={'본사 주소'}
              multiline
              value={newPanelData.address}
              onChange={event => dispatch(updateAddress({ address: event?.target.value }))}
              placeholder={'본사 주소'}
              sx={{ flex: 0.45 }} />
            <TextField
              type={'text'}
              label={'A/S'}
              value={newPanelData.afterService}
              onChange={event => dispatch(updateAfterService({ afterService: event?.target.value }))}
              placeholder={'A/S'}
              sx={{ flex: 0.45 }} />
          </ContentStack>

          <ContentStack
            direction='row'
            spacing={5}
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TextField
              type={'text'}
              label={'TEL'}
              value={newPanelData.phone}
              onChange={event => dispatch(updatePhone({ phone: event?.target.value }))}
              placeholder={'TEL'}
              sx={{ flex: 0.45 }} />

            <TextField
              type={'text'}
              label={'FAX'}
              value={newPanelData.fax}
              onChange={event => dispatch(updateFax({ fax: event?.target.value }))}
              placeholder={'FAX'}
              sx={{ flex: 0.45 }} />
          </ContentStack>

          <Stack sx={{ alignItems: 'center', mb: 5 }}>
            {EditButton('변경', () => putUpdatePanelInfo(newPanelData))}
          </Stack>

          <MainTitleTypography variant='h5'>홈페이지 정보</MainTitleTypography>

          <ContentStack
            direction='row'
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <LogoTitleBox>회사 로고</LogoTitleBox>
            <Typography sx={{ flex: 0.8, color: 'darkgrey' }}>
              {logoFile.name !== '' ? logoFile.name : logo.originalFilename}
            </Typography>
            <label
              className='uploadButton'
              htmlFor='headerLogoInput'
              onChange={(event: any) => dispatch(addLogoFile({ logo: { file: event?.target.files[0], name: event?.target.files[0].name } }))}
            >
              업로드
              <input type={'file'} id='headerLogoInput' accept='image/*' />
            </label>
          </ContentStack>

          <ContentStack
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }} >
            <LogoTitleBox>배너 사진</LogoTitleBox>
            <Stack sx={{ flex: 0.8 }}>
              {/* 기존 배너 사진 */}
              {banner?.map((item: {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string
              }, index: number) => (
                <Stack key={index} direction='row' sx={{ alignItems: 'center' }}>
                  <Typography sx={{ color: 'darkgrey' }}>
                    {item.originalFilename}
                  </Typography>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginBannerImage(index, item.serverFilename)}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}

              {/* 추가한 배너 사진 */}
              {bannerFile?.map((item: { file: string, name: string }, index: number) => (
                <Stack key={index} direction='row' sx={{ alignItems: 'center' }}>
                  <Typography sx={{ color: 'darkgrey' }}>
                    {item.name}
                  </Typography>
                  <ClearRoundedIcon
                    onClick={() => deleteBannerImage(index)}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}
            </Stack>
            <label
              className='uploadButton'
              htmlFor='bannerInput'
              onChange={(event: any) => addBannerImage(event)}>
              업로드
              <input type={'file'} id='bannerInput' accept='image/*' multiple />
            </label>
          </ContentStack>

          <List>
            <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 배너 사진은 가로 세로 5:2 비율의 사진을 첨부해 주세요.</ListItem>
            <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 배너 사진은 최소 한 장 이상 필요합니다.</ListItem>
          </List>

          <Stack sx={{ alignItems: 'center', mb: 5 }}>
            {EditButton('변경', putUpdateImageInfo)}
          </Stack>

          <MainTitleTypography variant='h5'>카다록 / 자재승인서</MainTitleTypography>

          {/* 카다록, 자재 승인서 */}
          <ContentStack
            direction='row'
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <LogoTitleBox sx={{ flex: 0.3 }}>카다록</LogoTitleBox>
            <Typography sx={{ flex: 0.6, color: 'darkgrey' }}>
              {documentFile.catalog.name !== '' ? documentFile.catalog.name : documentName.catalogOriginalFilename}
            </Typography>
            <label
              className='uploadButton'
              htmlFor='catalogInput'
              onChange={(event: any) => dispatch(addCatalog({ catalog: { file: event?.target.files[0], name: event?.target.files[0].name } }))}
            >
              업로드
              <input type={'file'} id='catalogInput' />
            </label>
          </ContentStack>

          <ContentStack
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <LogoTitleBox sx={{ flex: 0.3 }}>자재승인서</LogoTitleBox>
            <Typography sx={{ flex: 0.6, color: 'darkgrey' }}>
              {documentFile.approval.name !== '' ? documentFile.approval.name : documentName.materialOriginalFilename}
            </Typography>
            <label
              className='uploadButton'
              htmlFor='approvalInput'
              onChange={(event: any) => dispatch(addApproval({ approval: { file: event?.target.files[0], name: event?.target.files[0].name } }))}
            >
              업로드
              <input type={'file'} id='approvalInput' />
            </label>
          </ContentStack>
        </Stack>

        <Stack direction='row' sx={{ justifyContent: 'center', mb: 5 }}>
          {EditButton('변경', putUpdateDocumentInfo)}
          {EditButton('나가기', () => dispatch(clickEditGoBack()))}
        </Stack>
      </Drawer >
    </>
  )
};

const MainTitleTypography = styled(Typography)(() => ({
  paddingTop: 15,
  paddingBottom: 15,
  textAlign: 'center',
  width: 550
})) as typeof Typography;

const ContentStack = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center'
})) as typeof Stack;

const LogoTitleBox = styled(Typography)(() => ({
  fontSize: 20,
  marginRight: 30,
  textAlign: 'center'
})) as typeof Typography;

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem;
