import React, {useState} from 'react';
import {adminApi} from '../../network/admin';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {updateManagerPassword} from '../../app/reducers/adminSlice';
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
  open: boolean,
  onClose: () => void,
  successModify: () => void
}

export default function PasswordUpdate({open, onClose, successModify}: propsType) {
  const dispatch = useAppDispatch();

  const adminPassword = useAppSelector(state => state.manager.panelData.adminPassword); // 관리자 정보 state
  const [password, setPassword] = useState({curPassword: '', newPassword: '', newPasswordCheck: ''});
  const [errorMessage, setErrorMessage] = useState({current: '', new: '', checked: ''});

  const validate = () => {
    let isValid = true;
    if (password.curPassword === '' || password.curPassword !== adminPassword) {
      setErrorMessage(prev => ({...prev, current: '비밀번호를 정확히 입력해 주세요.'}));
      isValid = false;
    } else setErrorMessage(prev => ({...prev, current: ''}));
    if (password.newPassword === '') {
      setErrorMessage(prev => ({...prev, new: '새 비밀번호를 입력해 주세요.'}));
      isValid = false;
    } else setErrorMessage(prev => ({...prev, new: ''}));
    if (password.newPasswordCheck === '' || password.newPassword !== password.newPasswordCheck) {
      setErrorMessage(prev => ({...prev, checked: '비밀번호가 다릅니다.'}));
      isValid = false;
    } else setErrorMessage(prev => ({...prev, checked: ''}));
    return isValid;
  };

  const changeValue = (e: any) => {
    const {name, value} = e.target;
    setPassword({...password, [name]: value});
  };

  // 관리자 비밀번호 변경
  const putUpdatePassword = () => {
    validate() &&
    adminApi.putUpdatePassword(password)
      .then(res => {
        successModify();
        onClose();
        dispatch(updateManagerPassword({adminPassword: res}));
      })
      .catch(error => console.log(error))
  };

  const onPutUpdatePasswordKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      putUpdatePassword();
    }
  };

  // 다이얼로그 닫기
  const closeDialog = () => {
    setErrorMessage({current: '', new: '', checked: ''});
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle sx={{textAlign: 'center'}}>
        비밀번호 변경
      </DialogTitle>

      <DialogContent>
        <Stack spacing={1}>
          <TextField
            type={'password'}
            name={'curPassword'}
            onChange={changeValue}
            placeholder={'현재 비밀번호'}
            error={!!errorMessage.current}
            helperText={errorMessage.current}/>

          <TextField
            type={'password'}
            name={'newPassword'}
            onChange={changeValue}
            placeholder={'새 비밀번호'}
            error={!!errorMessage.new}
            helperText={errorMessage.new}/>

          <TextField
            type={'password'}
            name={'newPasswordCheck'}
            onChange={changeValue}
            onKeyUp={onPutUpdatePasswordKeyUp}
            placeholder={'새 비밀번호 확인'}
            error={!!errorMessage.checked}
            helperText={errorMessage.checked}/>
        </Stack>
      </DialogContent>

      <DialogActions sx={{justifyContent: 'center'}}>
        <EditButton name='변경' onClick={putUpdatePassword}/>
        <EditButton name='취소' onClick={closeDialog}/>
      </DialogActions>
    </Dialog>
  )
}

