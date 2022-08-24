import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categoryApi } from '../../network/category';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import { getArchiveCategory, updateCategoryName } from '../../app/reducers/categorySlice';
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
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function EditArchiveCategory() {
  const dispatch = useAppDispatch();

  const inputRef: any = useRef(); // 카테고리 input ref
  const categoryNameRef: any = useRef(); // 카테고리 이름 ref

  const archivesState = useAppSelector(state => state.dialog.archiveState); // dialog state
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록 state

  // 카테고리 목록 받아오기
  useEffect(() => {
    categoryApi.getAllCategories()
      .then(res => {
        dispatch(getArchiveCategory({ categories: res.categories }));
      })
  }, []);

  // 카테고리 목록에 추가
  const addCategory = () => {
    if (inputRef.current.value === '') {
      return;
    }
    categoryApi.createArchiveCategory({ categoryName: inputRef.current.value })
      .then(res => {
        inputRef.current.value = '';
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
  };

  // 카테고리 삭제
  const deleteArchiveCategory = (categoryId: number) => {
    console.log(categoryId)
    categoryApi.deleteArchiveCategory(categoryId)
      .then(res => {
        console.log(res);
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
      .catch(error => console.log(error))
  };

  // 카테고리 이름 수정
  const editArchiveCategory = (categoryId: number, categoryName: string) => {
    categoryApi.putUpdateArchiveCategory(categoryId, { categoryName: categoryName })
      .then(res => console.log(res))
      .catch(error => console.warn(error))
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
          {archiveCategory.map((item: { id: number, categoryName: string }) => (
            <Stack key={item.id} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <TextField
                defaultValue={item.categoryName}
                inputRef={categoryNameRef}
              />
              <ClearRoundedIcon
                fontSize='small'
                onClick={() => deleteArchiveCategory(item.id)}
                sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer' }} />
              <CheckCircleRoundedIcon
                fontSize='small'
                onClick={() => editArchiveCategory(item.id, categoryNameRef)}
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