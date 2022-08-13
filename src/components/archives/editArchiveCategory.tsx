import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import {
  getArchiveCategory,
  addArchiveCategory,
  deleteArchiveCategory
} from '../../app/reducers/archiveCategorySlice';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function EditArchiveCategory() {
  const dispatch = useAppDispatch();

  const inputRef: any = useRef(); // 카테고리 input ref

  const archivesState = useAppSelector(state => state.dialog.archivesState); // dialog state
  const category = useAppSelector(state => state.archiveCategory.category); // 카테고리 목록 state

  // 임시데이터
  const data = ['전체', '일반자료', '승인서', '스프링클러', '소방용밸브']


  // 카테고리 목록 받아오기
  useEffect(() => {
    dispatch(getArchiveCategory({ categories: data })); // 통신으로 받아오기
  }, []);

  // 카테고리 목록에 추가
  const addCategory = () => {
    if (inputRef.current.value === '') {
      return;
    }
    dispatch(addArchiveCategory({ item: inputRef.current.value }));
    inputRef.current.value = '';
  };

  // 카테고리 목록 업데이트
  const putArchiveCategory = () => {
    alert('수정되었습니다.');
    dispatch(clickArchivesGoBack());
  };

  return (
    <Dialog
      open={archivesState}
      onClose={() => dispatch(clickArchivesGoBack())}>
      <DialogTitle fontSize={30} sx={{ textAlign: 'center' }}>
        카테고리 수정
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{
          pb: 2,
          mb: 3,
          fontSize: 22,
          borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
        }}>
          카테고리 목록
        </DialogContentText>

        {/* 카테고리 목록 */}
        <Stack
          direction='column'
          sx={{
            pl: 2,
            height: 150,
            overflow: 'auto',
          }}>
          {category.map((item: string, index: number) => (
            <Stack key={index} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <Typography>{item}</Typography>
              <ClearRoundedIcon
                fontSize='small'
                onClick={() => dispatch(deleteArchiveCategory({ index: index }))}
                sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer' }} />
            </Stack>
          ))}
        </Stack>

        {/* 카테고리 추가 input */}
        <Box
          sx={{
            pb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
          }}>
          <TextField
            inputRef={inputRef}
            size='small'
            autoComplete='off' />
          {EditButton('추가', addCategory)}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        {/* 수정된 카테고리 보내기 */}
        {EditButton('수정', putArchiveCategory)}
        {EditButton('취소', () => dispatch(clickArchivesGoBack()))}
      </DialogActions>
    </Dialog >
  )
}