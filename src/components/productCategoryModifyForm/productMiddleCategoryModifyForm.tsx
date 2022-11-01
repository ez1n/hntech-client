import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {clickProductCategoryFormGoBack, onLoading} from "../../app/reducers/dialogSlice";
import {categoryApi} from "../../network/category";
import {changeMode} from "../../app/reducers/managerModeSlice";
import {
  Box,
  Container,
  Stack, styled,
  TextField,
  Typography
} from "@mui/material";
import EditButton from "../editButton";
import Loading from "../loading";
import CancelModal from "../cancelModal";
import ProductCategorySelect from "../productCategorySelect";

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function ProductMiddleCategoryModifyForm({successModify, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리
  const currentProductMiddleCategory = useAppSelector(state => state.category.currentProductMiddleCategory); // 선택된 중분류 카테고리 state
  const productCategoryFormState = useAppSelector(state => state.dialog.productCategoryFormState); // 카테고리 등록 취소 dialog
  const [middleCategory, setMiddleCategory] = useState({
    id: 0,
    categoryName: '',
    imageServerFilename: '',
    imageOriginalFilename: '',
    showInMain: 'false',
    parent: '',
    children: []
  });
  const [newImage, setNewImage] = useState({file: '', path: '', name: ''});
  const {id, categoryName, imageServerFilename, imageOriginalFilename, parent} = middleCategory;

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  useEffect(() => {
    setMiddleCategory(currentProductMiddleCategory);
  }, []);

  const validate = () => {
    let isValid = true;
    if (categoryName === '') {
      setTitleErrorMsg('카테고리 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 카테고리 선택
  const getCategory = (category: string) => setMiddleCategory({...middleCategory, parent: category});

  // 카테고리 이름
  const changeCategoryName = (e: any) => setMiddleCategory({...middleCategory, categoryName: e.target.value});

  // 이미지 업로드
  const selectCategoryImage = (e: any) => {
    URL.revokeObjectURL(newImage.path);
    setNewImage({
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
      name: e.target.files[0].name
    })
  };

  // 카테고리 수정
  const putMiddleCategory = () => {
    const middleCategoryForm = new FormData();
    newImage.file === '' ?
      middleCategoryForm.append('image', new Blob()) :
      middleCategoryForm.append('image', newImage.file);
    middleCategoryForm.append('categoryName', categoryName);
    middleCategoryForm.append('showInMain', 'false');
    middleCategoryForm.append('type', 'product');
    middleCategoryForm.append('parentName', parent);

    if (validate()) {
      dispatch(onLoading());
      categoryApi.putUpdateProductCategory(id, middleCategoryForm)
        .then(() => {
          successModify();
          navigate(-1);
        })
        .catch(error => {
          errorToast(error.response.data.message);
          if (error.response.status === 401) {
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
        .finally(() => dispatch(onLoading()))
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>중분류 카테고리 등록</Title>

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
            required
            autoFocus
            placeholder='카테고리명'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            value={categoryName}
            onChange={changeCategoryName}
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%'}}
          />
        </Box>

        {/* 사진 추가 */}
        <Stack direction='row' sx={{mt: 2, alignItems: 'center'}}>
          {/* 사진 추가 */}
          <Box sx={{pl: 1}}>
            <label className='categoryUploadButton' htmlFor='middleCategoryInput' onChange={selectCategoryImage}
                   onClick={(e: any) => e.target.value = null}>
              사진 추가
              <input type='file' id='middleCategoryInput' accept='image/*'/>
            </label>
          </Box>

          {/* 카테고리 */}
          <ProductCategorySelect
            category={productCategories}
            defaultCategory={currentProductCategoryName}
            getCategory={getCategory}/>
        </Stack>

        {/* 제품 사진 미리보기 */}
        <Box sx={{width: '100%', p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)'}}>
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
            <Box sx={{width: '23%', m: 1}}>
              {newImage.path === '' ?
                <img src={imageServerFilename} alt={imageOriginalFilename} width='100%'/> :
                <img src={newImage.path} alt={newImage.name} width='100%'/>
              }
            </Box>
          </Container>
        </Box>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='수정' onClick={putMiddleCategory}/>
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
          navigate(-1);
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