import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clickChangeInfo } from '../app/reducers/managerModeSlice';
import {
  Drawer,
  Fab,
  TextField,
  Typography,
  Stack,
  styled
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
          <Typography variant='h5' sx={{ mb: 5, textAlign: 'center' }}>정보 수정</Typography>

          <ContentContainer direction='row'>
            <TitleBox>비밀번호</TitleBox>
            <TextField type={'password'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>메일 주소</TitleBox>
            <TextField type={'email'} />
          </ContentContainer>

          <ContentContainer direction='row'>
            <TitleBox>메일 발송 시간</TitleBox>
            <TextField type={'time'} />
          </ContentContainer>
        </Stack>

        <Stack direction='row' sx={{ justifyContent: 'center', mt: 2 }}>
          {EditButton('확인', () => console.log('정보 수정'))}
          {EditButton('취소', () => dispatch(clickChangeInfo()))}
        </Stack>
      </Drawer>
    </>
  )
};

const ContentContainer = styled(Stack)(() => ({
  alignItems: 'center'
}))

const TitleBox = styled(Typography)(() => ({
  marginRight: 20,
  fontSize: 20
}))