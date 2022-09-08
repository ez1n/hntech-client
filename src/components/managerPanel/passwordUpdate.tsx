import React, { useState, useEffect } from 'react';
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

interface propsType {
  successModify: () => void
}

export default function PasswordUpdate({ successModify }: propsType) {
  const dispatch = useAppDispatch();

  const adminPassword = useAppSelector(state => state.manager.panelData.adminPassword); // 관리자 정보 state
  const passwordState = useAppSelector(state => state.dialog.passwordState); // 비밀번호 변경 dialog state
  const updatePassword = useAppSelector(state => state.manager.updatePassword); // 변경할 비밀번호 state
  const [curPasswordErrorMsg, setCurPasswordErrorMsg] = useState('');
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState('');
  const [newPasswordCheckErrorMsg, setNewPasswordCheckErrorMsg] = useState('');

  const validate = () => {
    let isValid = true;
    if (updatePassword.curPassword === '' || updatePassword.curPassword !== adminPassword) {
      setCurPasswordErrorMsg('비밀번호를 정확히 입력해 주세요.');
      isValid = false;
    } else setCurPasswordErrorMsg('');
    if (updatePassword.newPassword === '') {
      setNewPasswordErrorMsg('새 비밀번호를 입력해 주세요.');
      isValid = false;
    } else setNewPasswordErrorMsg('');
    if (updatePassword.newPasswordCheck === '' || updatePassword.newPasswordCheck !== updatePassword.newPassword) {
      setNewPasswordCheckErrorMsg('비밀번호가 다릅니다.');
      isValid = false;
    } else setNewPasswordCheckErrorMsg('');
    return isValid;
  };

  // 관리자 비밀번호 변경
  const putUpdatePassword = (updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }) => {
    validate() &&
      adminApi.putUpdatePassword(updatePassword)
        .then(res => {
          successModify();
          dispatch(clickPasswordStateGoBack());
          dispatch(updateManagerPassword({ adminPassword: res.newPassword }));
        })
        .catch(error => console.log(error))
  };

  const onPutUpdatePasswordKeyUp = (event: any, updatePassword: { curPassword: string, newPassword: string, newPasswordCheck: string }) => {
    if (event.key === 'Enter') { putUpdatePassword(updatePassword) };
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
            placeholder={'현재 비밀번호'}
            error={curPasswordErrorMsg ? true : false}
            helperText={curPasswordErrorMsg} />

          <TextField
            type={'password'}
            onChange={event => dispatch(updateNewPassword({ newPassword: event?.target.value }))}
            placeholder={'새 비밀번호'}
            error={newPasswordErrorMsg ? true : false}
            helperText={newPasswordErrorMsg} />

          <TextField
            type={'password'}
            onChange={event => dispatch(updateNewPasswordCheck({ newPasswordCheck: event?.target.value }))}
            onKeyUp={event => onPutUpdatePasswordKeyUp(event, updatePassword)}
            placeholder={'새 비밀번호 확인'}
            error={newPasswordCheckErrorMsg ? true : false}
            helperText={newPasswordCheckErrorMsg} />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <EditButton name='변경' onClick={() => putUpdatePassword(updatePassword)} />
        <EditButton name='취소' onClick={() => dispatch(clickPasswordStateGoBack())} />
      </DialogActions>
    </Dialog>
  )
}

