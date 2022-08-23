import React from 'react';
import { adminApi } from '../../network/admin';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickEditGoBack, clickPasswordStateGoBack, clickSendMailPasswordStateGoBack } from '../../app/reducers/dialogSlice';
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
  copyManagerData
} from '../../app/reducers/managerModeSlice';
import {
  Drawer,
  Fab,
  TextField,
  Typography,
  Stack,
  styled,
  Select,
  MenuItem
} from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import EditButton from '../editButton';
import PasswordUpdate from './passwordUpdate';

export default function FloatingButton() {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const editState = useAppSelector(state => state.dialog.editState); // 관리자 정보 수정(drawer) open state
  const panelData = useAppSelector(state => state.manager.panelData); // 관리자 정보 state
  const newPanelData = useAppSelector(state => state.manager.newPanelData); // 관리자 정보 변경 state

  // 정보 변경
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
      })
      .catch(error => console.log(error))
  };

  return (
    <>
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

      <Drawer
        anchor='right'
        open={editState}
        onClose={() => dispatch(clickEditGoBack())} >
        <Stack spacing={2} sx={{ m: 5 }}>
          <Typography
            variant='h5'
            sx={{
              pb: 3,
              textAlign: 'center',
              width: 550
            }}>
            관리자 정보
          </Typography>

          <ContentContainer
            direction='row'
            sx={{
              pt: 2,
              pb: 2,
              borderTop: '2px solid rgba(46, 125, 50, 0.5)',
              borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
            }}>
            <TitleBox>비밀번호</TitleBox>
            <TextField
              type={'password'}
              value={panelData.adminPassword}
              disabled
              onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
              placeholder={'현재 비밀번호'} />

            {EditButton('변경', () => dispatch(clickPasswordStateGoBack()))}

            <PasswordUpdate />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>수신 메일</TitleBox>
            <TextField
              type={'email'}
              value={newPanelData.receiveEmailAccount}
              onChange={event => dispatch(updateManagerReceivedMail({ receiveEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>발신 메일</TitleBox>
            <TextField
              type={'email'}
              value={newPanelData.sendEmailAccount}
              onChange={event => dispatch(updateManagerSentMail({ sendEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>발신 메일 비밀번호</TitleBox>
            <TextField
              type={'password'}
              value={newPanelData.sendEmailPassword}
              onChange={event => dispatch(updateManagerSendEmailPassword({ sendEmailPassword: event?.target.value }))}
              placeholder={'발신 메일 비밀번호'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>메일 발송 시간</TitleBox>
            <Select
              defaultValue={newPanelData.emailSendingTime}
              onChange={event => dispatch(updateManagerTime({ emailSendingTime: event?.target.value }))}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 300 } }
              }}
              sx={{
                width: '30%',
                textAlign: 'center',
                fontSize: 18
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
          </ContentContainer>

          <Typography
            variant='h5'
            sx={{
              pt: 3,
              pb: 3,
              textAlign: 'center',
              width: 500
            }}>
            회사 정보
          </Typography>

          <ContentContainer
            direction='row'
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>본사 주소</TitleBox>
            <TextField
              type={'text'}
              multiline
              value={newPanelData.address}
              onChange={event => dispatch(updateAddress({ address: event?.target.value }))}
              placeholder={'본사 주소'}
              sx={{ width: '60%' }} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>A/S</TitleBox>
            <TextField
              type={'text'}
              value={newPanelData.afterService}
              onChange={event => dispatch(updateAfterService({ afterService: event?.target.value }))}
              placeholder={'A/S'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>TEL</TitleBox>
            <TextField
              type={'text'}
              value={newPanelData.phone}
              onChange={event => dispatch(updatePhone({ phone: event?.target.value }))}
              placeholder={'TEL'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }} >
            <TitleBox>FAX</TitleBox>
            <TextField
              type={'text'}
              value={newPanelData.fax}
              onChange={event => dispatch(updateFax({ fax: event?.target.value }))}
              placeholder={'FAX'} />
          </ContentContainer>
        </Stack>

        <Stack direction='row' sx={{ justifyContent: 'center', mb: 5 }}>
          {EditButton('변경', () => putUpdatePanelInfo(newPanelData))}
          {EditButton('나가기', () => dispatch(clickEditGoBack()))}
        </Stack>
      </Drawer>
    </>
  )
};

const ContentContainer = styled(Stack)(() => ({
  alignItems: 'center'
})) as typeof Stack;

const TitleBox = styled(Typography)(() => ({
  marginRight: 20,
  fontSize: 20,
  width: '30%',
  textAlign: 'center'
})) as typeof Typography;

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem
