import React, {useEffect, useState} from 'react';
import {categoryApi} from '../../network/category';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clickProductCategoryFormGoBack, onLoading} from '../../app/reducers/dialogSlice';
import {updateProductCategoryImage, updateProductCategoryShowInMain} from '../../app/reducers/categorySlice';
import {addProductCategoryImage, updateProductCategoryName} from '../../app/reducers/categorySlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Stack,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox
} from '@mui/material';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import {changeMode} from '../../app/reducers/managerModeSlice';
import Loading from '../loading';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function ProductCategoryForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 등록 취소 dialog
  const productCategoryName = useAppSelector(state => state.category.productCategoryName); // 카테고리 이름 state
  const productCategoryImage = useAppSelector(state => state.category.productCategoryImage); // 카테고리 이미지 state
  const productCategoryImagePath = useAppSelector(state => state.category.productCategoryImagePath); // 카테고리 이미지 미리보기 state
  const productCategoryShowInMain = useAppSelector(state => state.category.productCategoryShowInMain); // 메인 카테고리 설정 state
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [imageErrorMsg, setImageErrorMsg] = useState('');

  useEffect(() => {
    dispatch(updateProductCategoryName({categoryName: ''}));
    dispatch(updateProductCategoryImage({categoryImage: ''}));
    dispatch(updateProductCategoryShowInMain({showInMain: false}));
  }, []);

  const validate = () => {
    let isValid = true;
    if (productCategoryName === '') {
      setTitleErrorMsg('카테고리 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (productCategoryImage === '') {
      setImageErrorMsg('사진을 등록해 주세요');
      isValid = false;
    } else setImageErrorMsg('');
    return isValid;
  };

  // 제품 사진
  const selectCategoryImage = (event: any) => {
    dispatch(addProductCategoryImage({image: URL.createObjectURL(event.target.files[0])}));
    dispatch(updateProductCategoryImage({categoryImage: event.target.files[0]}));
  };

  // 카테고리 등록
  const postProductCategory = () => {
    const productCategoryForm = new FormData();
    productCategoryForm.append('image', productCategoryImage);
    productCategoryForm.append('categoryName', productCategoryName);
    productCategoryForm.append('showInMain', productCategoryShowInMain);
    productCategoryForm.append('type', 'product');

    if (validate()) {
      dispatch(onLoading());
      categoryApi.postCreateCategory(productCategoryForm)
        .then(res => {
          success();
          dispatch(addProductCategoryImage({image: undefined}));
          dispatch(onLoading());
          navigate('/product/category');
        })
        .catch(error => {
          dispatch(onLoading());
          errorToast(error.response.data.message);
          if (error.response.status === 401) {
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>카테고리 등록</Title>

      <Spacing/>

      {/* 제품 등록 폼 */}
      <Box sx={{
        borderTop: '3px solid #2E7D32',
        borderBottom: '3px solid #2E7D32',
      }}>

        {/* 제목 */}
        <Box sx={{
          textAlign: 'center',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 2
        }}>
          <TextField
            type='text'
            required={true}
            autoFocus={true}
            placeholder='카테고리명'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            onChange={event => dispatch(updateProductCategoryName({categoryName: event?.target.value}))}
            inputProps={{style: {fontSize: 18}}}
            sx={{
              width: '100%'
            }}
          />
        </Box>

        <Stack direction='row' sx={{mt: 2, alignItems: 'center'}}>
          {/* 사진 추가 */}
          <Box sx={{pl: 1}}>
            <label className='categoryUploadButton' htmlFor='productCategoryInput' onChange={selectCategoryImage} onClick={(e: any) => e.target.value = null}>
              사진 추가
              <input type='file' id='productCategoryInput' accept='image/*'/>
            </label>
          </Box>

          <FormControlLabel
            control={<Checkbox
              onChange={event => dispatch(updateProductCategoryShowInMain({showInMain: event?.target.checked}))}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }}/>}
            label='메인 카테고리'
            labelPlacement='start'
            sx={{color: 'darkgrey'}}/>
        </Stack>

        {/* 제품 사진 미리보기 */}
        <FormControl error={!!imageErrorMsg} sx={{width: '100%'}}>
          <Box sx={{p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)'}}>
            <FormHelperText>{imageErrorMsg}</FormHelperText>
            <Container
              sx={{
                border: '1.8px solid lightgrey',
                borderRadius: 1,
                mb: 2,
                height: 300,
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'auto',
                alignItems: 'center'
              }}>
              {!productCategoryImagePath ?
                <Typography sx={{color: 'lightgrey', fontSize: 18}}>제품 사진 미리보기</Typography> :
                <Box sx={{width: '23%', m: 1}}>
                  <img src={productCategoryImagePath} alt='제품 사진' width='100%'/>
                </Box>
              }
            </Container>
          </Box>
        </FormControl>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='등록완료' onClick={postProductCategory}/>
        <EditButton name='취소' onClick={() => dispatch(clickProductCategoryFormGoBack())}/>
      </Spacing>

      <Loading/>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productCategoryFormState}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          dispatch(clickProductCategoryFormGoBack());
          navigate('/product/category');
        }}
        closeAction={() => dispatch(clickProductCategoryFormGoBack())}/>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;

const Title = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;