import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clickChangeInfo } from '../app/reducers/managerModeSlice';
import {
  Drawer,
  Fab,
  TextField,
  Typography,
  Stack,
  styled,
  CssBaseline,
  Select,
  MenuItem
} from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import EditButton from './editButton';

export default function FloatingButton() {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자모드 state
  const changeInfo = useAppSelector(state => state.manager.changeInfo);

  return (
    <>
      {managerMode &&
        <Fab
          variant="extended"
          onClick={() => dispatch(clickChangeInfo())}
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
        open={changeInfo}
        onClose={() => dispatch(clickChangeInfo())} >
        <Stack spacing={2} sx={{ m: 5 }}>
          <Typography
            variant='h5'
            sx={{
              pb: 3,
              textAlign: 'center',
              width: 500
            }}>
            관리자 정보 수정
          </Typography>

          <ContentContainer direction='row' sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>비밀번호</TitleBox>
            <TextField type={'password'} placeholder={'비밀번호'} />
          </ContentContainer>

          <CssBaseline />

          <ContentContainer direction='row'>
            <TitleBox>발신 메일</TitleBox>
            <TextField type={'email'} placeholder={'발신 메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row' sx={{ pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)' }}>
            <TitleBox>수신 메일</TitleBox>
            <TextField type={'email'} placeholder={'수신 메일 주소'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>메일 발송 시간</TitleBox>
            <Select
              MenuProps={{
                PaperProps: { sx: { maxHeight: 300 } }
              }}
              sx={{
                width: '30%',
                textAlign: 'center',
                fontSize: 18
              }}>
              <MenuList value='05:00'>05:00</MenuList><MenuList value='05:30'>05:30</MenuList>
              <MenuList value='06:00'>06:00</MenuList><MenuList value='06:30'>06:30</MenuList>
              <MenuList value='07:00'>07:00</MenuList><MenuList value='07:30'>07:30</MenuList>
              <MenuList value='08:00'>08:00</MenuList><MenuList value='08:30'>08:30</MenuList>
              <MenuList value='09:00'>09:00</MenuList><MenuList value='09:30'>09:30</MenuList>
              <MenuList value='10:00'>10:00</MenuList><MenuList value='10:30'>10:30</MenuList>
              <MenuList value='11:00'>11:00</MenuList><MenuList value='11:30'>11:30</MenuList>
              <MenuList value='12:00'>12:00</MenuList><MenuList value='12:30'>12:30</MenuList>
              <MenuList value='13:00'>13:00</MenuList><MenuList value='13:30'>13:30</MenuList>
              <MenuList value='14:00'>14:00</MenuList><MenuList value='14:30'>14:30</MenuList>
              <MenuList value='15:00'>15:00</MenuList><MenuList value='15:30'>15:30</MenuList>
              <MenuList value='16:00'>16:00</MenuList><MenuList value='16:30'>16:30</MenuList>
              <MenuList value='17:00'>17:00</MenuList><MenuList value='17:30'>17:30</MenuList>
              <MenuList value='18:00'>18:00</MenuList><MenuList value='18:30'>18:30</MenuList>
              <MenuList value='19:00'>19:00</MenuList><MenuList value='19:30'>19:30</MenuList>
              <MenuList value='20:00'>20:00</MenuList><MenuList value='20:30'>20:30</MenuList>
              <MenuList value='21:00'>21:00</MenuList><MenuList value='21:30'>21:30</MenuList>
              <MenuList value='22:00'>22:00</MenuList><MenuList value='22:30'>22:30</MenuList>
              <MenuList value='23:00'>23:00</MenuList><MenuList value='23:30'>23:30</MenuList>
              <MenuList value='00:00'>00:00</MenuList><MenuList value='00:30'>00:30</MenuList>
              <MenuList value='01:00'>01:00</MenuList><MenuList value='01:30'>01:30</MenuList>
              <MenuList value='02:00'>02:00</MenuList><MenuList value='02:30'>02:30</MenuList>
              <MenuList value='03:00'>03:00</MenuList><MenuList value='03:30'>03:30</MenuList>
              <MenuList value='04:00'>04:00</MenuList><MenuList value='04:30'>04:30</MenuList>
            </Select>
          </ContentContainer>
        </Stack>

        <Stack direction='row' sx={{ justifyContent: 'center', mt: 2 }}>
          {EditButton('변경', () => console.log('정보 수정'))}
          {EditButton('취소', () => dispatch(clickChangeInfo()))}
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