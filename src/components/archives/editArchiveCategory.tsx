import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { api } from '../../network/network';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import {
  getArchiveCategory
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

  const archivesState = useAppSelector(state => state.dialog.archiveState); // dialog state
  const category = useAppSelector(state => state.archiveCategory.category); // 카테고리 목록 state

  // 카테고리 목록 받아오기
  useEffect(() => {
    api.getAllCategories()
      .then(res => {
        dispatch(getArchiveCategory({ categories: res.categories }));
      })
  }, []);

  // 카테고리 목록에 추가
  const addCategory = () => {
    if (inputRef.current.value === '') {
      return;
    }
    api.createArchiveCategory({ categoryName: inputRef.current.value })
      .then(res => {
        inputRef.current.value = '';
        api.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
  };

  // 카테고리 삭제
  const deleteArchiveCategory = (categoryId: number) => {
    console.log(categoryId)
    api.deleteArchiveCategory(categoryId)
      .then(res => {
        console.log(res);
        api.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
      .catch(error => console.log(error))
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
          {category.map((item: { id: number, categoryName: string }, index: number) => (
            <Stack key={item.id} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <Typography>{item.categoryName}</Typography>
              <ClearRoundedIcon
                fontSize='small'
                onClick={() => deleteArchiveCategory(item.id)}
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
        {EditButton('취소', () => dispatch(clickArchivesGoBack()))}
      </DialogActions>
    </Dialog >
  )
}