import React, {useEffect, useState} from 'react';
import {categoryApi} from '../../network/category';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {changeMode} from '../../app/reducers/adminSlice';
import {onLoading} from '../../app/reducers/dialogSlice';
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
import Loading from '../loading';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function ProductMainCategoryForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [content, setContent] = useState({
    categoryName: '',
    image: {file: '', path: '', name: ''},
    showInMain: 'false'
  });
  const [open, setOpen] = useState(false);
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [imageErrorMsg, setImageErrorMsg] = useState('');

  const preventReset = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventReset);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventReset);
    };
  }, []);

  const validate = () => {
    let isValid = true;
    if (content.categoryName === '') {
      setTitleErrorMsg('카테고리 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (content.image.file === '') {
      setImageErrorMsg('사진을 등록해 주세요');
      isValid = false;
    } else setImageErrorMsg('');
    return isValid;
  };

  // 카테고리 이름
  const getCategoryName = (event: any) => {
    setContent({...content, categoryName: event.target.value});
  };

  // 카테고리 사진
  const selectCategoryImage = (event: any) => {
    URL.revokeObjectURL(content.image.path);
    setContent({
      ...content, image: {
        file: event.target.files[0],
        path: URL.createObjectURL(event.target.files[0]),
        name: event.target.files[0].name
      }
    })
  };

  // 메인 카테고리 등록
  const getShowInMain = (event: any) => {
    setContent({...content, showInMain: event.target.checked.toString()});
  };

  // 카테고리 등록
  const postProductCategory = () => {
    const productCategoryForm = new FormData();
    productCategoryForm.append('image', content.image.file);
    productCategoryForm.append('categoryName', content.categoryName);
    productCategoryForm.append('showInMain', content.showInMain);
    productCategoryForm.append('type', 'product');
    productCategoryForm.append('role', 'parent');

    if (validate()) {
      dispatch(onLoading());
      categoryApi.postCreateCategory(productCategoryForm)
        .then(() => {
          success();
          navigate('/product/category');
        })
        .catch(error => {
          if (error.response.status === 401) {
            errorToast('로그인이 필요합니다.');
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
          errorToast(error.response.data.message);
        })
        .finally(() => dispatch(onLoading()))
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>대분류 카테고리 등록</Title>

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
            name='categoryName'
            required
            autoFocus
            placeholder='카테고리명'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            onChange={getCategoryName}
            inputProps={{style: {fontSize: 18}}}
            sx={{
              width: '100%'
            }}
          />
        </Box>

        <Stack direction='row' sx={{mt: 2, alignItems: 'center'}}>
          {/* 사진 추가 */}
          <Box sx={{pl: 1}}>
            <label className='categoryUploadButton' htmlFor='productCategoryInput' onChange={selectCategoryImage}
                   onClick={(e: any) => e.target.value = null}>
              사진 추가
              <input type='file' id='productCategoryInput' accept='image/*'/>
            </label>
          </Box>

          <FormControlLabel
            control={<Checkbox
              onChange={getShowInMain}
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
              {!content.image.path ?
                <Typography sx={{color: 'lightgrey', fontSize: 18}}>카테고리 이미지</Typography> :
                <Box sx={{width: '23%', m: 1}}>
                  <img src={content.image.path} alt={content.image.name} width='100%'/>
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
        <EditButton name='취소' onClick={() => setOpen(true)}/>
      </Spacing>

      <Loading/>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={open}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          setOpen(false);
          navigate('/product/category');
        }}
        closeAction={() => setOpen(false)}/>
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
})) as typeof Typography