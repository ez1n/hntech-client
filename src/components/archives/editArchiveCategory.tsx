import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { categoryApi } from '../../network/category';
import { clickArchiveCategoryGoBack, clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import { getArchiveCategory, setSelectedArchiveCategoryId } from '../../app/reducers/categorySlice';
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
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CancelModal from '../cancelModal';

export default function EditArchiveCategory() {
  const dispatch = useAppDispatch();

  const inputRef: any = useRef(); // 카테고리 input ref
  const categoryNameRef: any = useRef(); // 카테고리 이름 ref

  const archivesState = useAppSelector(state => state.dialog.archiveState); // dialog state
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록 state
  const selectedArchiveCategoryId = useAppSelector(state => state.category.selectedArchiveCategoryId); // 선택한 카테고리 id
  const editArchiveCategoryState = useAppSelector(state => state.dialog.editArchiveCategoryState); // 자료실 카테고리 삭제 state

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
            dispatch(setSelectedArchiveCategoryId({ id: undefined }));
          })
      })
      .catch(error => console.log(error))
  };

  // 카테고리 이름 수정
  const editArchiveCategory = (categoryId: number, categoryName: string) => {
    categoryApi.putUpdateArchiveCategory(categoryId, {
      categoryName: categoryName,
      imageServerFilename: null,
      showInMain: 'false'
    })
      .then(res => {
        console.log(res);
        dispatch(setSelectedArchiveCategoryId({ id: undefined }));
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
      .catch(error => console.warn(error))
  };

  return (
    <Dialog
      open={archivesState}
      onClose={() => {
        dispatch(clickArchivesGoBack());
        dispatch(setSelectedArchiveCategoryId({ id: undefined }))
      }}>
      <DialogTitle fontSize={30} sx={{ textAlign: 'center', mr: 10, ml: 10 }}>
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
          spacing={1}
          sx={{
            height: 150,
            overflow: 'auto',
          }}>
          {archiveCategory.map((item: { id: number, categoryName: string }) => (
            <Stack
              key={item.id}
              direction='row'
              spacing={2}
              sx={{ alignItems: 'center', pl: 2, pr: 2 }}>

              {/* 카테고리 수정폼 */}
              {selectedArchiveCategoryId === item.id ?
                <TextField
                  defaultValue={item.categoryName}
                  inputRef={categoryNameRef}
                  size='small'
                  autoComplete='off'
                  sx={{ flex: 0.7 }}
                /> :
                <Typography sx={{ flex: 0.7 }}>{item.categoryName}</Typography>
              }
              {selectedArchiveCategoryId === undefined ?
                // 카테고리 수정 전
                <BorderColorRoundedIcon
                  fontSize='small'
                  onClick={() => dispatch(setSelectedArchiveCategoryId({ id: item.id }))}
                  sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15 }} /> :

                // 카테고리 수정 중
                <CheckCircleRoundedIcon
                  fontSize='small'
                  onClick={() => editArchiveCategory(item.id, categoryNameRef.current.value)}
                  sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15 }} />
              }

              <CancelRoundedIcon
                fontSize='small'
                onClick={() => {
                  dispatch(setSelectedArchiveCategoryId({ id: item.id }));
                  dispatch(clickArchiveCategoryGoBack());
                }}
                sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15 }} />
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
        {EditButton('취소', () => {
          dispatch(setSelectedArchiveCategoryId({ id: undefined }));
          dispatch(clickArchivesGoBack());
        })}
      </DialogActions>

      <CancelModal
        openState={editArchiveCategoryState}
        title='카테고리 삭제'
        text1='해당 카테고리의 제품이 모두 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => {
          { selectedArchiveCategoryId && deleteArchiveCategory(selectedArchiveCategoryId) };
          dispatch(clickArchiveCategoryGoBack());
        }}
        closeAction={() => dispatch(clickArchiveCategoryGoBack())}
      />
    </Dialog >
  )
}