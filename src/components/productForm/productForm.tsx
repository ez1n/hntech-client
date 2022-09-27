import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {productApi} from '../../network/product';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {changeMode} from '../../app/reducers/managerModeSlice';
import {onLoading} from "../../app/reducers/dialogSlice";
import {
  addProductCategory,
  addProductDescription,
  addProductDoc,
  addProductDocType,
  addProductDocUploadButton,
  addProductImage,
  addProductName,
  addRepProductImage,
  addStandardImage,
  deleteProductDoc,
  deleteProductDocUploadButton,
  deleteProductImage,
  deleteStandardImage,
  resetProductForm
} from '../../app/reducers/productFormSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Button,
  Stack,
  TextField,
  List,
  ListItem,
  FormControl,
  FormHelperText
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ProductCategorySelect from '../productCategorySelect';
import Loading from '../loading';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function ProductForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 제품, 규격 이미지 Ref
  const repPhotoInputRef: any = useRef();
  const photoInputRef: any = useRef();
  const gradeInputRef: any = useRef();

  // 폼데이터
  const productForm = new FormData();

  // state
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리
  const {category, description, productName, files} = useAppSelector(state => state.productForm.productContent); // 제품 등록 내용
  const {docFiles, productImages, representativeImage, standardImages} = files; // 첨부파일, 제품이미지, 대표이미지, 규격이미지
  const [cancelProductForm, setCancelProductForm] = useState(false); // 제품 등록 취소

  // error message state
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목
  const [repImgErrorMsg, setRepImgErrorMsg] = useState(''); // 대표제품 이미지
  const [fileErrorMsg, setFileErrorMsg] = useState(''); // 다운로드 파일 버튼

  useEffect(() => {
    dispatch(resetProductForm());
    dispatch(addProductCategory({category: currentProductCategoryName}));
  }, []);

  const validate = () => {
    let isValid = true;
    if (productName === '') {
      setTitleErrorMsg('제품 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (representativeImage.file.length === 0) {
      setRepImgErrorMsg('대표사진을 등록해 주세요');
      isValid = false;
    } else setRepImgErrorMsg('');
    docFiles.map(item => {
      if (item.type === '' || item.file === '') {
        setFileErrorMsg('파일 정보를 확인해 주세요');
        isValid = false;
      } else setFileErrorMsg('');
    })
    return isValid;
  };

  // 제품 등록 취소 modal - open
  const openCancelProductForm = () => {
   setCancelProductForm(cancelProductForm => ! cancelProductForm);
  };

  // 제품 등록 취소 modal - close
  const closeCancelProductForm = () => {
    setCancelProductForm(false);
  };

  // input - button 연결(input 숨기기)
  const selectInput = (item: any) => {
    item.current?.click();
  };

  // 대표 제품 이미지 추가
  const selectRepProductImage = (event: any) => {
    dispatch(addRepProductImage({
      repProduct: {
        file: event.target.files[0],
        path: URL.createObjectURL(event.target.files[0])
      }
    }));
  };

  // 제품 이미지 추가
  const selectProductImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addProductImage({
        product: {file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])}
      }));
    }
  };

  // 규격 이미지 추가
  const selectStandardImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addStandardImage({
        standard: {
          file: event.target.files[i],
          path: URL.createObjectURL(event.target.files[i])
        }
      }))
    }
  };

  // 첨부파일 추가
  const selectProductDoc = (id: number, event: any) => {
    dispatch(addProductDoc({
      id: id,
      productDoc: {
        file: event.target.files[0],
        originalFilename: event.target.files[0].name
      }
    }));
  };

  // 파일 이름 추출
  const putUpdateProductDocFiles = (
    productData: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string,
      type: string
    },
    productId: number) => {
    docFiles.map((item: {
      id: number,
      file: string,
      originalFilename: string,
      type: string
    }, index: number) => {
      item.originalFilename === productData.originalFilename &&
      productApi.putUpdateProductDocFiles(productId, productData.id, {filename: item.type})
        .then(res => {
          navigate('/client-product');
          dispatch(onLoading());
          if (index === docFiles.length - 1) success();
        })
        .catch(error => errorToast(error.response.data.message))
    })
  };

  // 제품 등록
  const postProduct = () => {
    productForm.append('categoryName', category)
    productForm.append('description', description);
    docFiles.map(item => productForm.append('docFiles', item.file));
    productImages.map(item => productForm.append('productImages', item.file));
    productForm.append('productName', productName);
    productForm.append('representativeImage', representativeImage.file[0]);
    standardImages.map(item => productForm.append('standardImages', item.file));

    if (validate()) {
      dispatch(onLoading());
      productApi.postCreateProduct(productForm)
        .then(res => {
          if (docFiles.length === 0) {
            success();
            dispatch(onLoading());
            navigate('/client-product');
          } else {
            res.files.docFiles.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string,
              type: string
            }) => putUpdateProductDocFiles(item, res.id))
          }
        })
        .catch(error => {
          console.log(error);
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
      <Title variant='h5'>제품등록</Title>

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
            placeholder='제품명'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            onChange={event => dispatch(addProductName({productName: event?.target.value}))}
            inputProps={{style: {fontSize: 18}, maxLength: 20}}
            sx={{width: '100%'}}
          />
          <List>
            <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>※ 제품명은 최대 20글자까지 가능합니다.</ListItem>
          </List>
        </Box>

        {/* 이미지 추가, 카테고리 선택 */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          pr: 1,
          pl: 1
        }}>
          <ButtonBox>
            {/* 숨김 input */}
            <label ref={repPhotoInputRef} htmlFor='inputRepPhoto' onChange={selectRepProductImage}>
              <input className='productInput' type='file' id='inputRepPhoto' accept='image/*'/>
            </label>

            <label ref={photoInputRef} htmlFor='inputPhoto' onChange={selectProductImage}>
              <input className='productInput' type='file' id='inputPhoto' multiple accept='image/*'/>
            </label>

            <label ref={gradeInputRef} htmlFor='inputGrade' onChange={selectStandardImage}>
              <input className='productInput' type='file' id='inputGrade' multiple accept='image/*'/>
            </label>

            {/* 보여지는 button */}
            <EditButton name='대표 제품 이미지 추가' onClick={() => selectInput(repPhotoInputRef)}/>
            <EditButton name='제품 이미지 추가' onClick={() => selectInput(photoInputRef)}/>
            <EditButton name='규격 이미지 추가' onClick={() => selectInput(gradeInputRef)}/>
          </ButtonBox>

          {/* 카테고리 */}
          <ProductCategorySelect defaultCategory={currentProductCategoryName}/>
        </Box>
        <List>
          <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>※ 대표 이미지는 필수입니다.</ListItem>
        </List>

        {/* 미리보기 */}
        <Box sx={{p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)',}}>
          {/* 제품 설명 */}
          <TextField
            placeholder='제품 설명'
            multiline
            minRows={3}
            autoComplete={'off'}
            onChange={event => dispatch(addProductDescription({description: event.target.value}))}
            inputProps={{
              style: {
                fontSize: 18
              }
            }}
            sx={{width: '100%', mb: 2}}
          />

          {/* 대표 제품 이미지 미리보기 */}
          <FormControl error={!!repImgErrorMsg} sx={{width: '100%'}}>
            <FormHelperText>{repImgErrorMsg}</FormHelperText>
            <Container
              sx={{
                border: '1.8px solid lightgrey',
                borderRadius: 1,
                mb: 2,
                height: 250,
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'auto',
                alignItems: 'center'
              }}>
              {representativeImage.path === undefined ?
                <Typography sx={{color: 'lightgrey', fontSize: 18}}>
                  대표 제품 이미지 미리보기
                </Typography> :
                <Box sx={{width: '23%', m: 1}}>
                  <img src={representativeImage.path} alt='대표 제품 이미지' width='100%'/>
                </Box>
              }
            </Container>
          </FormControl>

          {/* 제품 이미지 미리보기 */}
          <Container
            sx={{
              border: '1.8px solid lightgrey',
              borderRadius: 1,
              mb: 2,
              height: 250,
              display: 'flex',
              flexWrap: 'wrap',
              overflow: 'auto',
              alignItems: 'center'
            }}>
            {productImages.length === 0 &&
                <Typography sx={{color: 'lightgrey', fontSize: 18}}>
                    제품 이미지 미리보기
                </Typography>
            }
            {productImages.map((item: { file: string, path: string }, index: number) => (
              <Box key={index} sx={{width: '23%', m: 1}}>
                <Box sx={{textAlign: 'end'}}>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteProductImage({index: index}))}
                    sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                </Box>
                <img src={item.path} alt='제품 이미지' width='100%'/>
              </Box>
            ))}
          </Container>

          {/* 규격 이미지 미리보기 */}
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
            {standardImages.length === 0 &&
                <Typography sx={{color: 'lightgrey', fontSize: 18}}>
                    규격 이미지 미리보기
                </Typography>
            }
            {standardImages.map((file: { file: string, path: string }, index) => (
              <Box key={index} sx={{width: '23%', m: 1}}>
                <Box sx={{textAlign: 'end'}}>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteStandardImage({index: index}))}
                    sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                </Box>
                <img src={file.path} alt='규격 이미지' width='100%'/>
              </Box>
            ))}
          </Container>

          <FormControl error={!!fileErrorMsg} sx={{width: '100%'}}>
            {/* 파일 업로드 (다운로드 가능한 자료) */}
            <Stack direction='column' spacing={2}>
              {docFiles.map((item: {
                id: number,
                file: string,
                originalFilename: string,
                type: string
              }, index) => (
                <Stack key={item.id} direction='row' spacing={1} sx={{alignItems: 'center'}}>
                  <TextField
                    size='small'
                    placeholder='파일 이름'
                    autoComplete={'off'}
                    onChange={event => dispatch(addProductDocType({id: item.id, type: event.target.value}))}
                    inputProps={{style: {fontSize: 16}}}/>
                  <Typography sx={{
                    pl: 2,
                    height: 40,
                    width: '100%',
                    border: '1.8px solid lightgrey',
                    borderRadius: 1,
                    color: 'darkgrey',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {item.originalFilename}
                    {item.originalFilename ?
                      <ClearRoundedIcon
                        onClick={() => dispatch(deleteProductDoc({id: item.id}))}
                        fontSize='small'
                        sx={{ml: 1, cursor: 'pointer'}}/> :
                      '파일'}
                  </Typography>
                  <label
                    className='fileUploadButton' htmlFor={`inputFile${item.id}`}
                    onChange={event => selectProductDoc(item.id, event)}>
                    업로드
                    <input className='productInput' type='file' id={`inputFile${item.id}`}/>
                  </label>

                  <Button
                    onClick={() => dispatch(deleteProductDocUploadButton({index: index}))}
                    sx={{color: 'darkgreen'}}>
                    <DeleteIcon/>
                  </Button>
                </Stack>
              ))}
              <FormHelperText>{fileErrorMsg}</FormHelperText>

              <Button
                onClick={() => dispatch(addProductDocUploadButton())}
                sx={{
                  color: 'rgba(46, 125, 50, 0.5)',
                  '&: hover': {backgroundColor: 'rgba(46, 125, 50, 0.1)'}
                }}>
                파일 추가
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='작성완료' onClick={postProduct}/>
        <EditButton name='취소' onClick={openCancelProductForm}/>
      </Spacing>

      <Loading/>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={cancelProductForm}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          closeCancelProductForm();
          navigate(-1);
        }}
        closeAction={closeCancelProductForm}/>
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

const ButtonBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column'
  },
})) as typeof Box;