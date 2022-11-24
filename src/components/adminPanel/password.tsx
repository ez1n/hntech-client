import React, {useState} from 'react';
import {useAppSelector} from '../../app/hooks';
import {Stack, styled, TextField} from '@mui/material';
import EditButton from '../editButton';
import PasswordModifyModal from './passwordModifyModal';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function Password({successModify, errorToast}: propsType) {
  const [open, setOpen] = useState(false);

  const adminPassword = useAppSelector(state => state.manager.panelData.adminPassword); // 관리자 정보

  // 비밀번호 변경 dialog
  const changePassword = () => setOpen(prev => !prev);

  return (
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
        type='password'
        label='관리자 비밀번호'
        value={adminPassword}
        disabled
        autoComplete='off'
      />

      <EditButton name='변경' onClick={changePassword}/>

      <PasswordModifyModal open={open} onClose={changePassword} successModify={successModify}/>
    </ContentStack>
  );
}

const ContentStack = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center'
})) as typeof Stack;