import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {api} from '../../network/network';
import {productApi} from '../../network/product';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {onLoading} from '../../app/reducers/dialogSlice';
import {changeMode} from '../../app/reducers/adminSlice';
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
import {getMiddleProductCategory, setCurrentProductMiddleCategoryName} from "../../app/reducers/categorySlice";
import {categoryApi} from "../../network/category";

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function ProductModifyForm({successModify, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('id');
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  const [deleteDocId, setDeleteDocId] = useState<{ productId: number, fileId: number }[]>([]);

  // 제품, 규격 이미지 Ref
  const repPhotoInputRef: any = useRef();
  const photoInputRef: any = useRef();
  const standardInputRef: any = useRef();

  // state
  const productMiddleCategories = useAppSelector(state => state.category.productMiddleCategories); // 중분류 카테고리 목록 state
  const currentProductMiddleCategoryName = useAppSelector(state => state.category.currentProductMiddleCategoryName);
  const [cancelProductModify, setCancelProductModify] = useState(false); // 제품 수정 취소

  const [content, setContent] = useState({category: '', description: '', productName: ''});
  // 추가할 파일
  const [docFiles, setDocFiles] = useState<{ id: number, file: string, originalFilename: string, type: string }[]>([]);
  const [productImages, setProductImages] = useState<{ file: string, path: string }[]>([]);
  const [representativeImage, setRepresentativeImage] = useState({file: '', path: ''});
  const [standardImages, setStandardImages] = useState<{ file: string, path: string }[]>([]);
  const {category, description, productName} = content;
  // 기존 파일
  const [originData, setOriginData] = useState({
    id: 0,
    docFiles: [{
      id: 0,
      originalFilename: '',
      savedPath: '',
      serverFilename: '',
      type: ''
    }],
    productImages: [{
      id: 0,
      originalFilename: '',
      savedPath: '',
      serverFilename: ''
    }],
    representativeImage: {
      id: 0,
      originalFilename: '',
      savedPath: '',
      serverFilename: ''
    },
    standardImages: [{
      id: 0,
      originalFilename: '',
      savedPath: '',
      serverFilename: ''
    }]
  });

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목
  const [fileErrorMsg, setFileErrorMsg] = useState(''); // 다운로드 파일 버튼

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
    productId &&
    productApi.getProduct(parseInt(productId))
      .then(res => {
        setContent({
          category: res.category,
          description: res.description,
          productName: res.productName
        })
        setOriginData({
          id: res.id,
          docFiles: res.files.docFiles,
          productImages: res.files.productImages,
          representativeImage: res.files.representativeImage,
          standardImages: res.files.standardImages
        });
      })
      .catch(error => console.log(error))

    mainCategory &&
    categoryApi.getMiddleProductCategory(mainCategory)
      .then(res => dispatch(getMiddleProductCategory({category: res})))
      .catch(error => console.log(error))
  }, []);

  const validate = () => {
    let isValid = true;
    if (productName === '' || productName === null) {
      setTitleErrorMsg('제품 이름을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    docFiles.map(item => {
      if (item.type === '' || item.file === '') {
        setFileErrorMsg('파일 정보를 확인해 주세요');
        isValid = false;
      } else setFileErrorMsg('');
    })
    return isValid;
  };

  // 중분류 카테고리 선택
  const getMiddleCategory = (category: string) => dispatch(setCurrentProductMiddleCategoryName({category: category}));

  // 제품 수정 취소 modal - open
  const openCancelProductModify = () => setCancelProductModify(cancelProductModify => !cancelProductModify);

  // 제품 수정 취소 modal - close
  const closeCancelProductModify = () => setCancelProductModify(false);

  // input - button 연결(input 숨기기)
  const selectInput = (item: any) => item.current?.click();

  // 제품 이름
  const getProductName = (event: any) => setContent({...content, productName: event.target.value});

  // 제품 설명
  const getDescription = (event: any) => setContent({...content, description: event.target.value});

  // 대표 제품 이미지 변경
  const changeRepProductImage = (event: any) => {
    URL.revokeObjectURL(representativeImage.path);
    setRepresentativeImage({file: event.target.files[0], path: URL.createObjectURL(event.target.files[0])});
  };

  // 제품 이미지 추가
  const getProductImage = (event: any) => {
    let newProductImage = productImages;
    for (let i = 0; i < event.target.files.length; i++) {
      newProductImage = newProductImage.concat({
        file: event.target.files[i],
        path: URL.createObjectURL(event.target.files[i])
      })
    }
    setProductImages(newProductImage);
  };

  // 제품 이미지 삭제
  const deleteProductImage = (num: number) => {
    URL.revokeObjectURL(productImages[num].path);
    const newProductImage = productImages.filter((item, index: number) => index !== num);
    setProductImages(newProductImage);
  };

  // 규격 이미지 추가
  const getStandardImage = (event: any) => {
    let newStandardImage = standardImages;
    for (let i = 0; i < event.target.files.length; i++) {
      newStandardImage = newStandardImage.concat({
        file: event.target.files[i],
        path: URL.createObjectURL(event.target.files[i])
      })
    }
    setStandardImages(newStandardImage);
  };

  // 규격 이미지 삭제
  const deleteStandardImage = (num: number) => {
    URL.revokeObjectURL(standardImages[num].path);
    const newStandardImage = standardImages.filter((item, index: number) => index !== num);
    setStandardImages(newStandardImage);
  };

  // 첨부파일 버튼 추가
  const addProductDocUploadButton = () => {
    if (docFiles.length === 0) {
      setDocFiles([...docFiles, {id: 0, file: '', originalFilename: '', type: ''}]);
    } else {
      setDocFiles([
        ...docFiles,
        {id: docFiles[docFiles.length - 1].id + 1, file: '', originalFilename: '', type: ''}
      ]);
    }
  };

  // 첨부파일 버튼 삭제
  const deleteProductDocUploadButton = (num: number) => {
    const newDocFile = docFiles.filter((item, index) => index !== num);
    setDocFiles(newDocFile);
  };

  // 첨부파일 추가
  const getProductDoc = (id: number, event: any) => {
    const newDocFile = docFiles.map(item => (
      item.id === id ? {
        ...item,
        file: event.target.files[0],
        originalFilename: event.target.files[0].name
      } : item
    ))
    setDocFiles(newDocFile);
  };

  // 첨부파일 이름 변경
  const getProductDocType = (id: number, type: string) => {
    const newDocFile = docFiles.map(item => (
      item.id === id ? {...item, type: type} : item
    ));
    setDocFiles(newDocFile);
  };

  // 파일 삭제
  const deleteProductDoc = (id: number) => {
    const newDocFile = docFiles.map(item => (
      item.id === id ? {...item, originalFilename: '', file: ''} : item
    ));
    setDocFiles(newDocFile);
  };

  // 기존 첨부파일 버튼 삭제
  const deleteOriginDocFileButton = (num: number, productId: number, fileId: number) => {
    const newDocFile = originData.docFiles.filter((item, index) => index !== num);
    setOriginData({...originData, docFiles: newDocFile});
    setDeleteDocId([...deleteDocId, {productId: productId, fileId: fileId}]);
  };

  // 기존 제품 이미지 삭제
  const deleteOriginProductFile = (num: number, productId: number, fileId: number) => {
    const newProductImage = originData.productImages.filter((item, index) => index !== num);
    setOriginData({...originData, productImages: newProductImage});
    setDeleteDocId([...deleteDocId, {productId: productId, fileId: fileId}]);
  };

  // 기존 규격 이미지 삭제
  const deleteOriginStandardFile = (num: number, standardId: number, fileId: number) => {
    const newStandardImage = originData.standardImages.filter((item, index) => index !== num);
    setOriginData({...originData, standardImages: newStandardImage});
    setDeleteDocId([...deleteDocId, {productId: standardId, fileId: fileId}]);
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
        .then(() => {
          navigate(-1);
          if (index === docFiles.length - 1) successModify();
        })
        .catch(error => {
          errorToast(error.response.data.message);
        })
        .finally(() => dispatch(onLoading()))
    })
  };

  // 제품 정보 수정 
  const putProduct = (productId: number) => {
    const productForm = new FormData();
    productForm.append('categoryName', currentProductMiddleCategoryName);
    productForm.append('description', description);
    docFiles.map(item => productForm.append('docFiles', item.file));
    productImages.map(item => productForm.append('productImages', item.file));
    productForm.append('productName', productName);
    representativeImage.file === '' ?
      productForm.append('representativeImage', new Blob()) :
      productForm.append('representativeImage', representativeImage.file);
    standardImages.map(item => productForm.append('standardImages', item.file));

    deleteDocId.map((item: { productId: number, fileId: number }) => (
      productApi.deleteProductFile(item.productId, item.fileId)
        .then().catch(error => console.log(error))
    ));

    if (validate()) {
      dispatch(onLoading());
      productApi.putUpdateProduct(productId, productForm)
        .then(res => {
          if (docFiles.length === 0) {
            dispatch(onLoading());
            successModify();
            navigate(-1);
          } else {
            res.files.docFiles.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string,
              type: string
            }) => {
              putUpdateProductDocFiles(item, productId);
            })
          }
        })
        .catch(error => {
          dispatch(onLoading());
          console.log(error);
          if (error.response.status === 401) {
            errorToast('로그인이 필요합니다.');
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
          errorToast(error.response.data.message);
        })
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>제품 정보 수정</Title>

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
            value={productName}
            onChange={getProductName}
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            required={true}
            autoComplete={'off'}
            placeholder='제품명'
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
            <label
              ref={repPhotoInputRef}
              htmlFor='inputRepPhoto'
              onChange={(event) => changeRepProductImage(event)}
              onClick={(e: any) => e.target.value = null}>
              <input className='productInput' type='file' id='inputRepPhoto' accept='image/*'/>
            </label>

            <label
              ref={photoInputRef}
              htmlFor='inputPhoto'
              onChange={(event) => getProductImage(event)}
              onClick={(e: any) => e.target.value = null}>
              <input className='productInput' type='file' id='inputPhoto' multiple accept='image/*'/>
            </label>

            <label
              ref={standardInputRef}
              htmlFor='inputGrade'
              onChange={(event) => getStandardImage(event)}
              onClick={(e: any) => e.target.value = null}>
              <input className='productInput' type='file' id='inputGrade' multiple accept='image/*'/>
            </label>

            {/* 보여지는 button */}
            <EditButton name='대표 제품 이미지 추가' onClick={() => {
              selectInput(repPhotoInputRef);
              setDeleteDocId([...deleteDocId, {
                productId: originData.id,
                fileId: originData.representativeImage.id
              }]);
            }}/>
            <EditButton name='제품 이미지 추가' onClick={() => selectInput(photoInputRef)}/>
            <EditButton name='규격 이미지 추가' onClick={() => selectInput(standardInputRef)}/>
          </ButtonBox>

          <TotalBox>
            <List sx={{maxWidth: '100%'}}>
              <ListItem sx={{userSelect: 'none', color: 'darkgrey', width: '100%'}}>
                ※ 중분류 카테고리를 선택해 주세요.
              </ListItem>
            </List>

            {/* 중분류 카테고리 */}
            <Box sx={{flex: 1}}>
              <ProductCategorySelect
                category={productMiddleCategories}
                defaultCategory={middleCategory ? middleCategory : category}
                getCategory={getMiddleCategory}/>
            </Box>
          </TotalBox>
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
            value={description}
            autoComplete={'off'}
            onChange={getDescription}
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%', mb: 2}}
          />

          {/* 대표 제품 이미지 미리보기 */}
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
            <Box sx={{width: '23%', m: 1}}>
              {representativeImage.path ?
                <img src={representativeImage.path} alt={'대표 이미지'} width={'100%'}/> :
                <img src={`${api.baseUrl()}/files/product/${originData.representativeImage.serverFilename}`}
                     alt={originData.representativeImage.originalFilename} width='100%'/>
              }
            </Box>
          </Container>

          {/* 제품 이미지 미리보기 */}
          {originData.productImages.length + productImages.length > 0 &&
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
              {/* 기존 제품이미지 */}
              {originData.productImages.map((item, index) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteOriginProductFile(index, originData.id, item.id)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={`${api.baseUrl()}/files/product/${item.serverFilename}`} alt={item.originalFilename}
                       width='100%'/>
                </Box>
              ))}


              {/* 추가한 제품이미지 */}
              {productImages.map((item, index: number) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteProductImage(index)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={item.path} alt={'제품 이미지'} width='100%'/>
                </Box>
              ))}
            </Container>
          }

          {/* 규격 이미지 미리보기 */}
          {originData.standardImages.length + standardImages.length > 0 &&
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
              {/* 기존 규격 이미지 */}
              {originData.standardImages.map((item, index) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteOriginStandardFile(index, originData.id, item.id)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={`${api.baseUrl()}/files/product/${item.serverFilename}`} alt={item.originalFilename}
                       width='100%'/>
                </Box>
              ))}

              {/* 추가한 규격 이미지 */}
              {standardImages.map((item, index: number) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteStandardImage(index)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={item.path} alt={'규격 이미지'} width='100%'/>
                </Box>
              ))}
            </Container>
          }

          <FormControl error={!!fileErrorMsg} sx={{width: '100%'}}>
            {/* 파일 업로드 (다운로드 가능한 자료) */}
            <Stack direction='column' spacing={2}>
              {/* 기존 파일 */}
              {originData.docFiles.map((item: {
                id: number,
                originalFilename: string,
                savedPath: string,
                serverFilename: string,
                type: string
              }, index: number) => (
                <Stack key={item.id} direction='row' spacing={1} sx={{alignItems: 'center'}}>
                  <TextField
                    size='small'
                    defaultValue={item.type}
                    disabled
                    autoComplete={'off'}
                    placeholder='파일 이름'
                    inputProps={{style: {fontSize: 18}}}/>
                  <Typography sx={{
                    pl: 2,
                    width: '100%',
                    height: 40,
                    border: '1.8px solid lightgrey',
                    borderRadius: 1,
                    color: 'darkgrey',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {item.originalFilename}
                  </Typography>
                  <label
                    className='fileUploadButton'
                    htmlFor={`inputFile${item.id}`}
                    onChange={event => getProductDoc(item.id, event)}
                    onClick={(e: any) => e.target.value = null}>
                    업로드
                    <input className='productInput' type='file' id={`inputFile${item.id}`}/>
                  </label>

                  <Button onClick={() => deleteOriginDocFileButton(index, originData.id, item.id)}
                          sx={{color: 'darkgreen'}}>
                    <DeleteIcon/>
                  </Button>
                </Stack>
              ))}

              {/* 새로 추가한 파일 */}
              {docFiles.map((item: {
                file: string
                id: number,
                originalFilename: string,
                type: string
              }, index: number) => (
                <Stack key={item.id} direction='row' spacing={1} sx={{alignItems: 'center'}}>
                  <TextField
                    size='small'
                    placeholder='파일 이름'
                    autoComplete='off'
                    value={item.type}
                    onChange={event => getProductDocType(item.id, event.target.value)}
                    inputProps={{style: {fontSize: 16}}}/>
                  <Typography sx={{
                    pl: 2,
                    width: '100%',
                    height: 40,
                    border: '1.8px solid lightgrey',
                    borderRadius: 1,
                    color: 'darkgrey',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <>
                      {item.originalFilename}
                      {item.originalFilename ?
                        <ClearRoundedIcon
                          onClick={() => deleteProductDoc(item.id)}
                          fontSize='small'
                          sx={{ml: 1, cursor: 'pointer'}}/> :
                        '파일'}
                    </>
                  </Typography>
                  <label
                    className='fileUploadButton'
                    htmlFor={`inputFile${item.id}`}
                    onChange={event => getProductDoc(item.id, event)}
                    onClick={(e: any) => e.target.value = null}>
                    업로드
                    <input className='productInput' type='file' id={`inputFile${item.id}`}/>
                  </label>

                  <Button onClick={() => deleteProductDocUploadButton(index)} sx={{color: 'darkgreen'}}>
                    <DeleteIcon/>
                  </Button>
                </Stack>
              ))}
              <FormHelperText>{fileErrorMsg}</FormHelperText>


              <Button
                onClick={addProductDocUploadButton}
                sx={{
                  color: 'rgba(46, 125, 50, 0.5)',
                  '&: hover': {backgroundColor: 'rgba(46, 125, 50, 0.1)'}
                }}>
                파일 추가</Button>
            </Stack>
          </FormControl>
        </Box>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='수정' onClick={() => putProduct(originData.id)}/>
        <EditButton name='취소' onClick={openCancelProductModify}/>
      </Spacing>

      <Loading/>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={cancelProductModify}
        title='수정 취소'
        text1='수정중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          closeCancelProductModify();
          navigate(-1);
        }}
        closeAction={closeCancelProductModify}/>
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
  flex: 0.5
})) as typeof Box;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '40%'
  },
  display: 'flex',
  flexWrap: 'wrap',
  flex: 0.5,
  margin: 10
})) as typeof Box;