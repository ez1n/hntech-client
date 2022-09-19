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
  Typography,
  styled
} from '@mui/material';
import EditButton from '../editButton';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import CancelModal from '../cancelModal';
import { changeMode } from '../../app/reducers/managerModeSlice';

interface propsType {
  errorToast: (message: string) => void
}

export default function EditArchiveCategory({ errorToast }: propsType) {
  const dispatch = useAppDispatch();

  const categoryForm = new FormData();

  const inputRef: any = useRef(); // 카테고리 input ref
  const categoryNameRef: any = useRef(); // 카테고리 이름 ref

  const archivesState = useAppSelector(state => state.dialog.archiveState); // dialog state
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록 state
  const selectedArchiveCategoryId = useAppSelector(state => state.category.selectedArchiveCategoryId); // 선택한 카테고리 id
  const editArchiveCategoryState = useAppSelector(state => state.dialog.editArchiveCategoryState); // 자료실 카테고리 삭제 state

  // 카테고리 목록 받아오기
  useEffect(() => {
    categoryApi.getAllCategories()
      .then(res => dispatch(getArchiveCategory({ categories: res.categories })))
  }, []);

  // 카테고리 목록에 추가
  const addCategory = () => {
    if (inputRef.current.value === '') {
      return;
    };

    categoryForm.append('categoryName', inputRef.current.value);
    [].map(item => categoryForm.append('image', item));
    categoryForm.append('showInMain', 'false');

    categoryApi.createArchiveCategory(categoryForm)
      .then(res => {
        inputRef.current.value = '';
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
          })
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({ login: isLogin }));
        };
      })
  };

  const onAddCategoryKeyUp = (event: any) => {
    if (event.key === 'Enter') { addCategory() };
  };

  // 카테고리 삭제
  const deleteArchiveCategory = (categoryId: number) => {
    categoryApi.deleteArchiveCategory(categoryId)
      .then(res => {
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({ categories: res.categories }));
            dispatch(setSelectedArchiveCategoryId({ id: undefined }));
          })
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({ login: isLogin }));
        };
      })
  };

  // 카테고리 이름 수정
  const editArchiveCategory = (categoryId: number, categoryName: string, showInMain: string) => {
    categoryForm.append('categoryName', categoryName);
    [].map(item => categoryForm.append('image', item));
    categoryForm.append('showInMain', showInMain);
    categoryApi.putUpdateArchiveCategory(categoryId, categoryForm)
      .then(res => {
        dispatch(setSelectedArchiveCategoryId({ id: undefined }));

        categoryApi.getAllCategories()
          .then(res => dispatch(getArchiveCategory({ categories: res.categories })))
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({ login: isLogin }));
        };
      })
  };

  return (
    <Dialog
      open={archivesState}
      onClose={() => {
        dispatch(clickArchivesGoBack());
        dispatch(setSelectedArchiveCategoryId({ id: undefined }))
      }}>
      <Title>카테고리 수정</Title>

      <DialogContent>
        <ContentText>카테고리 목록</ContentText>

        {/* 카테고리 목록 */}
        <Stack
          direction='column'
          spacing={1}
          sx={{
            height: 150,
            overflow: 'auto',
          }}>
          {archiveCategory.map((item: { id: number, categoryName: string, showInMain: string }) => (
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
                  autoFocus={true}
                  sx={{ flex: 0.7 }}
                /> :
                <Typography sx={{ flex: 0.7 }}>{item.categoryName}</Typography>
              }
              {selectedArchiveCategoryId === item.id ?
                // 카테고리 수정 중
                <CheckCircleRoundedIcon
                  fontSize='small'
                  onClick={() => editArchiveCategory(item.id, categoryNameRef.current.value, item.showInMain)}
                  sx={{ color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15 }} /> :
                // 카테고리 수정 전
                <BorderColorRoundedIcon
                  fontSize='small'
                  onClick={() => dispatch(setSelectedArchiveCategoryId({ id: item.id }))}
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
            onKeyUp={onAddCategoryKeyUp}
            inputRef={inputRef}
            size='small'
            autoComplete='off'
            autoFocus={true} />
          <EditButton name='추가' onClick={addCategory} />
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <EditButton name='나가기' onClick={() => {
          dispatch(setSelectedArchiveCategoryId({ id: undefined }));
          dispatch(clickArchivesGoBack());
        }} />
      </DialogActions>

      <CancelModal
        openState={editArchiveCategoryState}
        title='카테고리 삭제'
        text1='해당 카테고리의 제품 및 게시글이 모두 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => {
          { selectedArchiveCategoryId && deleteArchiveCategory(selectedArchiveCategoryId) };
          dispatch(clickArchiveCategoryGoBack());
        }}
        closeAction={() => dispatch(clickArchiveCategoryGoBack())}
      />
    </Dialog >
  )
};

const Title = styled(DialogTitle)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 25,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
  fontSize: 30,
  textAlign: 'center',
  marginRight: 10,
  marginLeft: 10
})) as typeof DialogTitle;

const ContentText = styled(DialogContentText)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 19,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  paddingBottom: 15,
  marginBottom: 25,
  fontSize: 22,
  borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
})) as typeof DialogContentText;