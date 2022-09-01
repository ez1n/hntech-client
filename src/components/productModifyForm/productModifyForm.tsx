import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickProductModifyFormGoBack } from '../../app/reducers/dialogSlice';
import {
  addProductDescription,
  addProductDoc,
  addProductDocUploadButton,
  addProductImage,
  addProductName,
  addRepProductImage,
  addStandardImage,
  deleteProductDoc,
  deleteProductDocUploadButton,
  deleteProductImage,
  deleteStandardImage
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
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ProductCategorySelect from '../productCategorySelect';
import { api } from '../../network/network';
import { productApi } from '../../network/product';
import { deleteOriginalProductFile, deleteOriginalStandardFile, getProductDetail } from '../../app/reducers/productSlice';

export default function ProductModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteProductId, setDeleteProductId] = useState<{ productId: number, fileId: number }[]>([]);

  // 제품, 규격 이미지 Ref
  const repPhotoInputRef: any = useRef();
  const photoInputRef: any = useRef();
  const standardInputRef: any = useRef();

  const productForm = new FormData();

  const productModifyFormState = useAppSelector(state => state.dialog.productModifyFormState); // 글쓰기 취소 state
  const productDetail = useAppSelector(state => state.product.productDetail); // 제품 정보
  const { category, description, productName, files } = useAppSelector(state => state.productForm.productContent); // 추가한 제품 내용
  const { docFiles, productImages, representativeImage, standardImages } = files;

  // input - button 연결(input 숨기기)
  const selectInput = (item: any) => { item.current?.click() };

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
        product: { file: event.target.files[i], path: URL.createObjectURL(event.target.files[i]) }
      }));
    };
  };

  // 규격 이미지 추가
  const selectGradeImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addStandardImage({ standard: { file: event.target.files[i], path: URL.createObjectURL(event.target.files[i]) } }));
    };
  };

  // 첨부파일 추가
  const selectFile = (id: number, event: any) => {
    dispatch(addProductDoc({
      id: id,
      productDoc: {
        file: event.target.files[0],
        originalFilename: event.target.files[0].name
      }
    }));
  };

  // 첨부파일 버튼 삭제
  const deleteButton = (index: number, productId: number, fileId: number) => {
    setDeleteProductId([...deleteProductId, { productId: productId, fileId: fileId }])
  };

  // 기존 제품 이미지 삭제
  const deleteOriginProductFile = (index: number, productId: number, fileId: number) => {
    dispatch(deleteOriginalProductFile({ index: index }));
    setDeleteProductId([...deleteProductId, { productId: productId, fileId: fileId }])
  };

  // 기존 규격 이미지 삭제
  const deleteOriginStandardFile = (index: number, productId: number, fileId: number) => {
    dispatch(deleteOriginalStandardFile({ index: index }));
    setDeleteProductId([...deleteProductId, { productId: productId, fileId: fileId }])
  };

  // 제품 정보 수정 
  const putProduct = () => {
    productForm.append('categoryName', category);
    productForm.append('description', description);
    docFiles.map(item => productForm.append('docFiles', item.file));
    productImages.map(item => productForm.append('productImages', item.file));
    productForm.append('productName', productName);
    productForm.append('representativeImage', representativeImage.file);
    standardImages.map(item => productForm.append('standardImages', item.file));

    deleteProductId.map((item: { productId: number, fileId: number }) => (
      productApi.deleteProductFile(item.productId, item.fileId)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    ))

    productApi.putUpdateProduct(productDetail.id, productForm)
      .then(res => {
        dispatch(getProductDetail({ detail: res }));
        navigate(-1);
      })
      .catch(error => console.log(error))
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>제품 정보 수정</Typography>

      <Spacing />

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
            onChange={event => dispatch(addProductName({ productName: event?.target.value }))}
            required={true}
            placeholder='제품명'
            inputProps={{
              style: { fontSize: 20 }
            }}
            sx={{ width: '100%' }}
          />
        </Box>

        {/* 이미지 추가, 카테고리 선택 */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          pr: 1,
          pl: 1
        }}>
          <Box>
            {/* 숨김 input */}
            <label ref={repPhotoInputRef} htmlFor='inputRepPhoto' onChange={(event) => selectRepProductImage(event)}>
              <input className='productInput' type='file' id='inputRepPhoto' accept='image/*' />
            </label>

            <label ref={photoInputRef} htmlFor='inputPhoto' onChange={(event) => selectProductImage(event)}>
              <input className='productInput' type='file' id='inputPhoto' multiple accept='image/*' />
            </label>

            <label ref={standardInputRef} htmlFor='inputGrade' onChange={(event) => selectGradeImage(event)}>
              <input className='productInput' type='file' id='inputGrade' multiple accept='image/*' />
            </label>

            {/* 보여지는 button */}
            {EditButton('대표 제품 이미지 추가', () => {
              selectInput(repPhotoInputRef);
              setDeleteProductId([...deleteProductId, { productId: productDetail.id, fileId: productDetail.files.representativeImage.id }]);
            })}
            {EditButton('제품 이미지 추가', () => selectInput(photoInputRef))}
            {EditButton('규격 이미지 추가', () => selectInput(standardInputRef))}
          </Box>

          {/* 카테고리 */}
          <ProductCategorySelect defaultCategory={category} />
        </Box>

        <List>
          <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 대표 이미지는 필수입니다.</ListItem>
          <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 제품 및 규격 이미지는 한 장 이상 필요합니다.</ListItem>
        </List>

        {/* 미리보기 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
          {/* 제품 설명 */}
          <TextField
            placeholder='제품 설명'
            multiline
            minRows={3}
            value={description}
            onChange={event => dispatch(addProductDescription({ description: event.target.value }))}
            inputProps={{
              style: {
                fontSize: 18
              }
            }}
            sx={{ width: '100%', mb: 2 }}
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
            <Box sx={{ width: '23%', m: 1 }}>
              {representativeImage.path ?
                <img src={representativeImage.path} alt={'대표 이미지'} width={'100%'} /> :
                <img src={`${api.baseUrl()}/files/image/${productDetail.files.representativeImage.serverFilename}`} alt={productDetail.files.representativeImage.originalFilename} width='100%' />
              }
            </Box>
          </Container>

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
            {productDetail.files.productImages.length + productImages.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>제품 이미지 미리보기</Typography>}
            {/* 기존 제품이미지 */}
            {productDetail.files.productImages.map((item, index) => (
              <Box key={index} sx={{ width: '23%', m: 1 }}>
                <Box sx={{ textAlign: 'end' }}>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginProductFile(index, productDetail.id, item.id)}
                    sx={{ color: 'darkgreen', cursor: 'pointer' }} />
                </Box>
                <img src={`${api.baseUrl()}/files/image/${item.serverFilename}`} alt={item.originalFilename} width='100%' />
              </Box>
            ))}

            {/* 추가한 제품이미지 */}
            {productImages.map((item, index) => (
              <Box key={index} sx={{ width: '23%', m: 1 }}>
                <Box sx={{ textAlign: 'end' }}>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteProductImage({ index: index }))}
                    sx={{ color: 'darkgreen', cursor: 'pointer' }} />
                </Box>
                <img src={item.path} alt={'제품 이미지'} width='100%' />
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
            {productDetail.files.standardImages.length + standardImages.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>규격 이미지 미리보기</Typography>}
            {/* 기존 규격 이미지 */}
            {productDetail.files.standardImages.map((item, index) => (
              <Box key={index} sx={{ width: '23%', m: 1 }}>
                <Box sx={{ textAlign: 'end' }}>
                  <ClearRoundedIcon
                    onClick={() => setDeleteProductId([...deleteProductId, { productId: productDetail.id, fileId: item.id }])}
                    sx={{ color: 'darkgreen', cursor: 'pointer' }} />
                </Box>
                <img src={`${api.baseUrl()}/files/image/${item.serverFilename}`} alt={item.originalFilename} width='100%' />
              </Box>
            ))}

            {/* 추가한 규격 이미지 */}
            {standardImages.map((item, index) => (
              <Box key={index} sx={{ width: '23%', m: 1 }}>
                <Box sx={{ textAlign: 'end' }}>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteStandardImage({ index: index }))}
                    sx={{ color: 'darkgreen', cursor: 'pointer' }} />
                </Box>
                <img src={item.path} alt={'규격 이미지'} width='100%' />
              </Box>
            ))}
          </Container>

          {/* 파일 업로드 (다운로드 가능한 자료) */}
          <Stack direction='column' spacing={2}>
            {/* 기존 파일 */}
            {productDetail.files.docFiles.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string,
              type: string
            }, index: number) => (
              <Stack key={index} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                <TextField
                  size='small'
                  defaultValue={item.type}
                  placeholder='파일 이름'
                  inputProps={{
                    style: {
                      fontSize: 18
                    }
                  }} />
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
                        onClick={() => deleteOriginStandardFile(index, productDetail.id, item.id)}
                        fontSize='small'
                        sx={{ ml: 1, cursor: 'pointer' }} /> :
                      '파일'}
                  </>
                </Typography>
                <label className='fileUploadButton' htmlFor={`inputFile${item.id}`} onChange={(event) => { selectFile(item.id, event) }}>
                  업로드
                  <input className='productInput' type='file' id={`inputFile${item.id}`} />
                </label>
                {productDetail.files.docFiles.length + docFiles.length === 1 ?
                  <Button disabled>
                    <DeleteIcon />
                  </Button> :
                  <Button onClick={() => {
                    dispatch(deleteProductDoc({ id: item.id }));

                  }} sx={{ color: 'darkgreen' }}>
                    <DeleteIcon />
                  </Button>
                }
              </Stack>
            ))}

            {/* 새로 추가한 파일 */}
            {docFiles.map((item: {
              file: string
              id: number,
              originalFilename: string,
              type: string
            }, index: number) => (
              <Stack key={index} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                <TextField
                  size='small'
                  defaultValue={item.type}
                  placeholder='파일 이름'
                  inputProps={{
                    style: {
                      fontSize: 18
                    }
                  }} />
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
                        onClick={() => dispatch(deleteProductDoc({ id: item.id }))}
                        fontSize='small'
                        sx={{ ml: 1, cursor: 'pointer' }} /> :
                      '파일'}
                  </>
                </Typography>
                <label className='fileUploadButton' htmlFor={`inputFile${item.id}`} onChange={(event) => { selectFile(item.id, event) }}>
                  업로드
                  <input className='productInput' type='file' id={`inputFile${item.id}`} />
                </label>

                <Button onClick={() => {
                  deleteButton(index, productDetail.id, item.id);
                  dispatch(deleteProductDocUploadButton({ index: index }));
                }} sx={{ color: 'darkgreen' }}>
                  <DeleteIcon />
                </Button>
              </Stack>
            ))}

            <Button onClick={() => dispatch(addProductDocUploadButton())} sx={{ color: 'rgba(46, 125, 50, 0.5)', '&: hover': { backgroundColor: 'rgba(46, 125, 50, 0.1)' } }}>파일 추가</Button>
          </Stack>
        </Box>
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('수정', putProduct)}
        {EditButton('취소', () => dispatch(clickProductModifyFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productModifyFormState}
        title='수정 취소'
        text1='수정중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          dispatch(clickProductModifyFormGoBack());
          navigate(-1);
        }}
        closeAction={() => dispatch(clickProductModifyFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;