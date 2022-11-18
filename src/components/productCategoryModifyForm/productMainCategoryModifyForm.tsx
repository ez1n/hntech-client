import React, {useEffect, useState} from 'react';
import {api} from '../../network/network';
import {categoryApi} from '../../network/category';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {changeMode} from '../../app/reducers/adminSlice';
import {onLoading} from '../../app/reducers/dialogSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function ProductMainCategoryModifyForm({successModify, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get('name');

  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보 state
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({
    categoryName: '',
    id: 0,
    imageServerFilename: '',
    imageOriginalFilename: '',
    showInMain: ''
  });
  const [image, setImage] = useState({file: '', path: ''});
  const {categoryName, id, imageServerFilename, imageOriginalFilename, showInMain} = content;

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

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
  useEffect(() => {
    categoryApi.getMainProductCategory()
      .then(res => {
        console.log(res)
        res.map((item: {
          categoryName: string,
          children: string[],
          id: number,
          imageOriginalFilename: string,
          imageServerFilename: string,
          parent: string,
          showInMain: string
        }) => (
          item.categoryName === category &&
          setContent({
            categoryName: item.categoryName,
            id: item.id,
            imageServerFilename: item.imageServerFilename,
            imageOriginalFilename: item.imageOriginalFilename,
            showInMain: item.showInMain
          })
        ))
      })
      .catch(error => console.log(error))
  }, []);

  const validate = () => {
    let isValid = true;
    if (!categoryName) {
      setTitleErrorMsg('카테고리 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 제품 사진
  const selectCategoryImage = (event: any) => {
    setImage({file: event.target.files[0], path: URL.createObjectURL(event.target.files[0])});
  };

  const updateProductMainCategoryName = (event: any) => {
    setContent({...content, categoryName: event.target.value});
  };

  // 메인 카테고리 설정
  const updateShowInMain = (event: any) => {
    setContent({...content, showInMain: String(event.target.checked)});
  };

  // 카테고리 수정
  const putProductCategory = (categoryId: number) => {
    dispatch(onLoading());

    const productCategoryForm = new FormData();
    image.file === '' ?
      [].map(item => productCategoryForm.append('image', item)) :
      productCategoryForm.append('image', image.file);
    productCategoryForm.append('categoryName', categoryName);
    productCategoryForm.append('showInMain', showInMain);

    validate() &&
    categoryApi.putUpdateProductCategory(categoryId, productCategoryForm)
      .then(() => {
        successModify();
        navigate(-1);
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
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>카테고리 변경</Title>

      <Spacing/>

      {/* 제품 등록 폼 */}
      <Box sx={{borderTop: '3px solid #2E7D32', borderBottom: '3px solid #2E7D32'}}>
        {/* 제목 */}
        <Box sx={{textAlign: 'center', borderBottom: '1px solid rgba(46, 125, 50, 0.5)', p: 2}}>
          <TextField
            type='text'
            required
            value={categoryName}
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            placeholder='카테고리명'
            onChange={updateProductMainCategoryName}
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%'}}
          />
        </Box>

        <Stack direction='row' sx={{mt: 2, alignItems: 'center'}}>
          {/* 사진 변경 */}
          <Box sx={{pl: 1}}>
            <label className='categoryUploadButton' htmlFor='productCategoryInput'
                   onChange={selectCategoryImage} onClick={(e: any) => e.target.value = null}>
              사진 변경
              <input type='file' id='productCategoryInput' accept='image/*'/>
            </label>
          </Box>

          {/* 메인 카테고리 */}
          <FormControlLabel
            control={<Checkbox
              defaultChecked={!!productCurrentCategory.showInMain ? productCurrentCategory.showInMain === 'true' : showInMain === 'true' }
              onChange={updateShowInMain}
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
        <Box sx={{p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)',}}>
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
            {image.file !== '' ?
              <Box sx={{width: '23%', m: 1}}>
                {/* 수정 */}
                <img src={image.path} alt='추가한제품 사진' width='100%'/>
              </Box> :
              <Box sx={{width: '23%', m: 1}}>
                <img src={`${api.baseUrl()}/files/category/${imageServerFilename}`} alt={imageOriginalFilename}
                     width='100%'/>
              </Box>
            }
          </Container>
        </Box>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='변경완료' onClick={() => putProductCategory(id)}/>
        <EditButton name='변경취소' onClick={() => setOpen(true)}/>
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={open}
        title='변경 취소'
        text1='변경중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          setOpen(false);
          navigate(-1);
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