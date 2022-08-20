import React, { useEffect } from 'react';
import { api } from '../network/network';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clickEditGoBack } from '../app/reducers/dialogSlice';
import {
  updateManagerPassword,
  updateManagerEmail,
  updateManagerTime,
  updateAddress,
  updateAfterService,
  updateFax,
  updatePhone,
  setFooter
} from '../app/reducers/managerModeSlice';
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
import EditButton from './editButton';

export default function FloatingButton() {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const editState = useAppSelector(state => state.dialog.editState); // dialog open state
  const mail = useAppSelector(state => state.manager.mail); // 관리자 정보 state
  const footer = useAppSelector(state => state.manager.footer); // footer 정보 state

  useEffect(() => {
    // 관리자 정보 받아오기
    // dispatch(setManagerData());

    // footer 정보 받아오기
    // api.getFooter()
    //   .then(res => dispatch(setFooter({ footer: res })));
  }, []);

  // 이메일, 비밀번호 정보 변경
  const putManagerData = () => {
    // api.putUpdateMail(mail)
    //   .then(res => alert('변경되었습니다.'))
  };

  // footer 정보 변경
  const putUpdateFooter = () => {
    // api.putUpdateFooter(footer)
    //   .then(res => alert('변경되었습니다.'))
  };

  return (
    <>
      {managerMode &&
        <Fab
          variant="extended"
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
              width: 500
            }}>
            관리자 정보
          </Typography>

          <ContentContainer
            direction='row'
            sx={{ pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>비밀번호</TitleBox>
            <TextField
              type={'password'}
              value={mail.password}
              onChange={event => dispatch(updateManagerPassword({ password: event?.target.value }))}
              placeholder={'비밀번호'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>수신 메일</TitleBox>
            <TextField
              type={'email'}
              value={mail.email}
              onChange={event => dispatch(updateManagerEmail({ email: event?.target.value }))}
              placeholder={'메일 주소'} />
          </ContentContainer>

          {/* 발신메일 state 추가하기 */}
          <ContentContainer direction='row'>
            <TitleBox>발신 메일</TitleBox>
            <TextField
              type={'email'}
              value={''}
              onChange={event => console.log('발신 메일 변경')}
              placeholder={'메일 주소'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>메일 발송 시간</TitleBox>
            <Select
              defaultValue={mail.time}
              onChange={event => dispatch(updateManagerTime({ time: event?.target.value }))}
              MenuProps={{
                PaperProps: { sx: { maxHeight: 300 } }
              }}
              sx={{
                width: '30%',
                textAlign: 'center',
                fontSize: 18
              }}>
              <MenuList value='05:00'>05:00</MenuList><MenuList value='06:00'>06:00</MenuList>
              <MenuList value='07:00'>07:00</MenuList><MenuList value='08:00'>08:00</MenuList>
              <MenuList value='09:00'>09:00</MenuList><MenuList value='10:00'>10:00</MenuList>
              <MenuList value='11:00'>11:00</MenuList><MenuList value='12:00'>12:00</MenuList>
              <MenuList value='13:00'>13:00</MenuList><MenuList value='14:00'>14:00</MenuList>
              <MenuList value='15:00'>15:00</MenuList><MenuList value='16:00'>16:00</MenuList>
              <MenuList value='17:00'>17:00</MenuList><MenuList value='18:00'>18:00</MenuList>
              <MenuList value='19:00'>19:00</MenuList><MenuList value='20:00'>20:00</MenuList>
              <MenuList value='21:00'>21:00</MenuList><MenuList value='22:00'>22:00</MenuList>
              <MenuList value='23:00'>23:00</MenuList><MenuList value='00:00'>00:00</MenuList>
              <MenuList value='01:00'>01:00</MenuList><MenuList value='02:00'>02:00</MenuList>
              <MenuList value='03:00'>03:00</MenuList><MenuList value='04:00'>04:00</MenuList>
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
              value={footer.address}
              onChange={event => dispatch(updateAddress({ address: event?.target.value }))}
              placeholder={'본사 주소'}
              sx={{ width: '60%' }} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>A/S</TitleBox>
            <TextField
              type={'text'}
              value={footer.afterService}
              onChange={event => dispatch(updateAfterService({ afterService: event?.target.value }))}
              placeholder={'A/S'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>TEL</TitleBox>
            <TextField
              type={'text'}
              value={footer.phone}
              onChange={event => dispatch(updatePhone({ phone: event?.target.value }))}
              placeholder={'TEL'} />
          </ContentContainer>

          <ContentContainer
            direction='row'
            sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }} >
            <TitleBox>FAX</TitleBox>
            <TextField
              type={'text'}
              value={footer.fax}
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
