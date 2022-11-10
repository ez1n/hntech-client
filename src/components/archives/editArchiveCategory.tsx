import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {categoryApi} from '../../network/category';
import {clickArchivesGoBack} from '../../app/reducers/dialogSlice';
import {getArchiveCategory} from '../../app/reducers/categorySlice';
import {changeMode} from '../../app/reducers/managerModeSlice';
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

interface propsType {
  errorToast: (message: string) => void
}

export default function EditArchiveCategory({errorToast}: propsType) {
  const dispatch = useAppDispatch();

  const categoryForm = new FormData();

  const inputRef: any = useRef(); // 카테고리 input ref
  const categoryNameRef: any = useRef(); // 카테고리 이름 ref

  // state
  const archivesState = useAppSelector(state => state.dialog.archiveState); // dialog
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록
  const [deleteCategory, setDeleteCategory] = useState(false); // 자료실 카테고리 삭제
  const [selectedCategory, setSelectedCategory] = useState({name: '', id: 0});

  // 카테고리 목록 받아오기
  useEffect(() => {
    categoryApi.getAllCategories()
      .then(res => dispatch(getArchiveCategory({categories: res.categories})))
  }, []);

  // 자료실 카테고리 삭제 modal - open
  const openDeleteArchiveCategory = () => {
    setDeleteCategory(prev => !prev);
  };

  // 자료실 카테고리 삭제 modal - close
  const closeDeleteArchiveCategory = () => {
    setDeleteCategory(false);
  };

  // 카테고리 목록에 추가
  const addCategory = () => {
    if (inputRef.current.value === '') return;

    categoryForm.append('categoryName', inputRef.current.value);
    [].map(item => categoryForm.append('image', item));
    categoryForm.append('showInMain', 'false');

    categoryApi.createArchiveCategory(categoryForm)
      .then(() => {
        inputRef.current.value = '';
        categoryApi.getAllCategories()
          .then(res => {
            dispatch(getArchiveCategory({categories: res.categories}));
          })
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  const onAddCategoryKeyUp = (event: any) => {
    if (event.key === 'Enter') {
      addCategory()
    }
  };

  // 카테고리 삭제
  const deleteArchiveCategory = (categoryId: number, categoryName: string) => {
    categoryApi.deleteArchiveCategory(categoryId, categoryName)
      .then(() => {
        categoryApi.getAllCategories()
          .then(res => dispatch(getArchiveCategory({categories: res.categories})))
      })
      .catch(error => {
        errorToast(error.response.data.message);
        console.log(error);

        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  // 카테고리 이름 수정
  const editArchiveCategory = (categoryId: number, categoryName: string) => {
    categoryForm.append('categoryName', categoryName);
    [].map(item => categoryForm.append('image', item));
    categoryForm.append('showInMain', 'false');
    categoryApi.putUpdateArchiveCategory(categoryId, categoryForm)
      .then(() => {
        categoryApi.getAllCategories()
          .then(res => dispatch(getArchiveCategory({categories: res.categories})))
      })
      .catch(error => {
        errorToast(error.response.data.message);
        console.log(error);

        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  return (
    <Dialog
      open={archivesState}
      onClose={() => {
        dispatch(clickArchivesGoBack());
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
          {archiveCategory.map((item: { id: number, categoryName: string, isArchiveCategory: boolean }) => (
            item.isArchiveCategory &&
            <Stack
              key={item.id}
              direction='row'
              spacing={2}
              sx={{alignItems: 'center', pl: 2, pr: 2}}>

              {/* 카테고리 수정폼 */}
              {selectedCategory.id === item.id ?
                <>
                  <TextField
                    defaultValue={item.categoryName}
                    inputRef={categoryNameRef}
                    size='small'
                    autoComplete='off'
                    autoFocus={true}
                    sx={{flex: 0.7}}
                  />
                  <CheckCircleRoundedIcon
                    fontSize='small'
                    onClick={() => editArchiveCategory(item.id, categoryNameRef.current.value)}
                    sx={{color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15}}/>
                </> :
                <>
                  <Typography sx={{flex: 0.7}}>{item.categoryName}</Typography>
                  <BorderColorRoundedIcon
                    fontSize='small'
                    onClick={() => setSelectedCategory({name: item.categoryName, id: item.id})}
                    sx={{color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15}}/>
                </>
              }

              <CancelRoundedIcon
                fontSize='small'
                onClick={() => {
                  setSelectedCategory({name: item.categoryName, id: item.id});
                  openDeleteArchiveCategory();
                }}
                sx={{color: 'rgba(46, 125, 50, 0.5)', cursor: 'pointer', flex: 0.15}}/>
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
            autoFocus={true}/>
          <EditButton name='추가' onClick={addCategory}/>
        </Box>
      </DialogContent>

      <DialogActions sx={{justifyContent: 'center'}}>
        <EditButton name='나가기' onClick={() => dispatch(clickArchivesGoBack())}/>
      </DialogActions>

      <CancelModal
        openState={deleteCategory}
        title='카테고리 삭제'
        text1='해당 카테고리의 제품 및 게시글이 모두 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => {
          deleteArchiveCategory(selectedCategory.id, selectedCategory.name)
          closeDeleteArchiveCategory();
        }}
        closeAction={closeDeleteArchiveCategory}
      />
    </Dialog>
  )
};

const Title = styled(DialogTitle)(({theme}) => ({
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

const ContentText = styled(DialogContentText)(({theme}) => ({
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