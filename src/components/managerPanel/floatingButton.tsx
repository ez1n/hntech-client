import React, { useEffect } from 'react';
import { api } from '../../network/network';
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
  updateManagerSendEmailPassword
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

  // 이메일, 비밀번호 정보 변경
  const putManagerData = (mail: { password: '', sentMail: '', receivedMail: '', time: '' }) => {
    // api.putUpdateMail(mail)
    //   .then(res => dispatch(setManagerData({data: res})))
  };

  // footer 정보 변경
  const putUpdateFooter = (footer: { address: '', afterService: '', fax: '', phone: '' }) => {
    // api.putUpdateFooter(footer)
    //   .then(res => dispatch(setFooter({ footer: res })))
  };

  const passwordState = useAppSelector(state => state.dialog.passwordState); // 비밀번호 변경 dialog state


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
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>비밀번호</TitleBox>
            <TextField
              type={'password'}
              value={panelData.adminPassword}
              disabled
              onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
              placeholder={'현재 비밀번호'} />
            {EditButton('변경', () => {
              console.log(passwordState)
              dispatch(clickPasswordStateGoBack())
            })}

            <PasswordUpdate />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>수신 메일</TitleBox>
            <TextField
              type={'email'}
              value={panelData.receiveEmailAccount}
              onChange={event => dispatch(updateManagerReceivedMail({ receiveEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>발신 메일</TitleBox>
            <TextField
              type={'email'}
              value={panelData.sendEmailAccount}
              onChange={event => dispatch(updateManagerSentMail({ sendEmailAccount: event?.target.value }))}
              placeholder={'메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>발신 메일 비밀번호</TitleBox>
            <TextField
              type={'email'}
              value={panelData.sendEmailPassword}
              onChange={event => dispatch(updateManagerSendEmailPassword({ sendEmailPassword: event?.target.value }))}
              placeholder={'발신 메일 비밀번호'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>메일 발송 시간</TitleBox>
            <Select
              defaultValue={panelData.emailSendingTime}
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

            <Stack direction='row' sx={{ width: '25%', justifyContent: 'flex-end' }}>
              {EditButton('변경', putManagerData)}
            </Stack>
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
              value={panelData.footer.address}
              onChange={event => dispatch(updateAddress({ address: event?.target.value }))}
              placeholder={'본사 주소'}
              sx={{ width: '60%' }} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>A/S</TitleBox>
            <TextField
              type={'text'}
              value={panelData.footer.afterService}
              onChange={event => dispatch(updateAfterService({ afterService: event?.target.value }))}
              placeholder={'A/S'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>TEL</TitleBox>
            <TextField
              type={'text'}
              value={panelData.footer.phone}
              onChange={event => dispatch(updatePhone({ phone: event?.target.value }))}
              placeholder={'TEL'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }} >
            <TitleBox>FAX</TitleBox>
            <TextField
              type={'text'}
              value={panelData.footer.fax}
              onChange={event => dispatch(updateFax({ fax: event?.target.value }))}
              placeholder={'FAX'} />
          </ContentContainer>
        </Stack>

        <Stack direction='row' sx={{ justifyContent: 'center' }}>
          {EditButton('변경', putUpdateFooter)}
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
