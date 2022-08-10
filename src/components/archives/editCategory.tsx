import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickGoBack } from '../../app/reducers/dialogSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import EditButton from '../editButton';

export default function EditCategory() {
  const dispatch = useAppDispatch();

  const cancel = useAppSelector(state => state.dialog.cancel);

  // 임시데이터
  const data = ['전체', '일반자료', '승인서', '스프링클러', '소방용밸브']

  return (
    <Dialog open={cancel} onClose={() => dispatch(clickGoBack())}>
      <DialogTitle fontSize={30}>
        카테고리 수정
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ fontSize: 18 }}>카테고리 목록</DialogContentText>

        <Stack direction='column' sx={{
          height: 200,
          overflow: 'auto'
        }}>
          {data.map((item, index) => (
            <Box key={index}>{item}</Box>
          ))}
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField size='small' />
          {EditButton('추가', () => console.log('추가'))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        {EditButton('수정', () => console.log('수정'))}
        {EditButton('취소', () => dispatch(clickGoBack()))}
      </DialogActions>
    </Dialog >
  )
}