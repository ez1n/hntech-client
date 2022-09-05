import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProductDetail, getProductList, nextImage, prevImage } from '../../app/reducers/productSlice';
import { clickProductInfoGoBack } from '../../app/reducers/dialogSlice';
import {
  Box,
  Button,
  Container,
  MobileStepper,
  styled,
  Typography
} from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import { productApi } from '../../network/product';
import { api } from '../../network/network';
import { getProductContent } from '../../app/reducers/productFormSlice';

interface propsType {
  successDelete: () => void
}

export default function ProductInfo({ successDelete }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productInfoState = useAppSelector(state => state.dialog.productInfoState); // 제품 삭제 dialog state
  const activeStep = useAppSelector(state => state.product.activeStep); // 제품 이미지 step state
  const { category, description, files, id, productName } = useAppSelector(state => state.product.productDetail); // 제품 정보
  const { docFiles, productImages, representativeImage, standardImages } = files; // 파일
  const maxSteps = productImages.length; // 이미지 개수

  // 제품 삭제
  const deleteProduct = (productId: number) => {
    productApi.deleteProduct(productId)
      .then(res => {
        productApi.getAllProducts(category)
          .then(res => {
            successDelete();
            dispatch(getProductList({ productList: res }));
            dispatch(clickProductInfoGoBack());
            navigate('/product');
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  // 수정 요청
  const modifyProduct = () => {
    productApi.getProduct(id)
      .then(res => {
        dispatch(getProductContent({ detail: res }));
        navigate('/product-modify');
      })
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      { }
      <Typography
        variant='h5'
        sx={{
          p: 1,
          width: 'max-content',
          borderBottom: '3px solid #2E7D32',
          textAlign: 'start'
        }}>
        {productName}
      </Typography>

      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode &&
          <>
            {EditButton('수정', modifyProduct)}
            {EditButton('삭제', () => dispatch(clickProductInfoGoBack()))}
          </>
        }
      </Spacing>

      {/* 제품 사진 */}
      <Box>
        <Box
          sx={{
            width: 300,
            height: 250,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {productImages.length !== 0 &&
            <img
              src={`${api.baseUrl()}/files/product/${productImages[activeStep].serverFilename}`}
              alt={productImages[activeStep].originalFilename}
              width={300} />
          }
        </Box>
        <MobileStepper
          steps={maxSteps}
          position='static'
          activeStep={activeStep}
          nextButton={
            <Button
              onClick={() => dispatch(nextImage())}
              disabled={activeStep === maxSteps - 1}>
              <NavigateNextRoundedIcon />
            </Button>
          }
          backButton={
            <Button
              onClick={() => dispatch(prevImage())}
              disabled={activeStep === 0}>
              <NavigateBeforeRoundedIcon />
            </Button>
          } />
      </Box>

      <Spacing />

      {/* 부가 설명 */}
      <Typography sx={{ fontSize: 20 }}>
        {description}
      </Typography>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productInfoState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProduct(id)}
        closeAction={() => dispatch(clickProductInfoGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;