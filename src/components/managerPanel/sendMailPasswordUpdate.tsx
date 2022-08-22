import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickPasswordStateGoBack, clickSendMailPasswordStateGoBack } from '../../app/reducers/dialogSlice';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import EditButton from '../editButton';

export default function SendMailPasswordUpdate() {
  const dispatch = useAppDispatch();

  const sendMailPasswordState = useAppSelector(state => state.dialog.sendMailPasswordState); // 비밀번호 변경 dialog state

  return (
    <Dialog
      open={sendMailPasswordState}
      onClose={() => dispatch(clickSendMailPasswordStateGoBack())}>
      <DialogTitle>
        비밀번호 변경
      </DialogTitle>
      <DialogContent>
        <Stack direction='row' spacing={1}>
          <DialogContentText>
            현재 비밀번호
          </DialogContentText>
          <TextField
            type={'password'}
            disabled
            // onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
            placeholder={'현재 비밀번호'} />
        </Stack>

        <Stack direction='row' spacing={1}>
          <DialogContentText>
            새 비밀번호
          </DialogContentText>
          <TextField
            type={'password'}
            disabled
            // onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
            placeholder={'새 비밀번호'} />
        </Stack>

        <Stack direction='row' spacing={1}>
          <DialogContentText>
            새 비밀번호 확인
          </DialogContentText>
          <TextField
            type={'password'}
            disabled
            // onChange={event => dispatch(updateManagerPassword({ adminPassword: event?.target.value }))}
            placeholder={'새 비밀번호 확인'} />
        </Stack>
      </DialogContent>
      <DialogActions>
        {EditButton('변경', () => { console.log('변경') })}
        {EditButton('취소', () => dispatch(clickSendMailPasswordStateGoBack()))}
      </DialogActions>
    </Dialog>
  )
}

