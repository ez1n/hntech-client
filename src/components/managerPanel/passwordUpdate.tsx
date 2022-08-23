import React from 'react';
import { adminApi } from '../../network/admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickPasswordStateGoBack } from '../../app/reducers/dialogSlice';
import {
  updateCurPassword,
  updateManagerPassword,
  updateNewPassword,
  updateNewPasswordCheck
} from '../../app/reducers/managerModeSlice';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import EditButton from '../editButton';

export default function PasswordUpdate() {
  const dispatch = useAppDispatch();

  const passwordState = useAppSelector(state => state.dialog.passwordState); // 비밀번호 변경 dialog state
  const updatePassword = useAppSelector(state => state.manager.updatePassword); // 변경할 비밀번호 state

  // 관리자 비밀번호 변경
  const putUpdatePassword = (updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }) => {
    adminApi.putUpdatePassword(updatePassword)
      .then(res => dispatch(updateManagerPassword(res.newPassword)))
      .catch(error => console.log(error))
  };

  return (
    <Dialog
      open={passwordState}
      onClose={() => dispatch(clickPasswordStateGoBack())}>
      <DialogTitle sx={{ textAlign: 'center' }}>
        비밀번호 변경
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            type={'password'}
            onChange={event => dispatch(updateCurPassword({ curPassword: event?.target.value }))}
            placeholder={'현재 비밀번호'} />

          <TextField
            type={'password'}
            onChange={event => dispatch(updateNewPassword({ newPassword: event?.target.value }))}
            placeholder={'새 비밀번호'} />

          <TextField
            type={'password'}
            onChange={event => dispatch(updateNewPasswordCheck({ newPasswordCheck: event?.target.value }))}
            placeholder={'새 비밀번호 확인'} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        {EditButton('변경', () => {
          putUpdatePassword(updatePassword);
          dispatch(clickPasswordStateGoBack());
        })}
        {EditButton('취소', () => dispatch(clickPasswordStateGoBack()))}
      </DialogActions>
    </Dialog>
  )
}

