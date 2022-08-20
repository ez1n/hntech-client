import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProductDetail, nextImage, prevImage } from '../../app/reducers/productSlice';
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

export default function ProductInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 임시 데이터
  const productData = {
    image: [
      '/images/mainButtons/알람밸브조립.jpg',
      '/images/mainButtons/건식퓨지블링크.jpg',
      '/images/mainButtons/유리벌브.jpg'
    ],
    data: { name: '플러쉬', info: '아파트와 같은 주거공간의 발코니에 설치되는 제품', category: '스프링클러' }
  };

  // 제품 정보 받아오기
  useEffect(() => {
    dispatch(getProductDetail({ detail: productData }));
    console.log(productDetail)
  }, []);

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productInfoState = useAppSelector(state => state.dialog.productInfoState); // 제품 삭제 dialog state
  const productDetail = useAppSelector(state => state.product.productDetail); // 제품 정보
  const activeStep = useAppSelector(state => state.product.activeStep); // 제품 이미지 step state
  const maxSteps = productDetail.image.length; // 이미지 개수

  // 제품 삭제
  const deleteProduct = () => {
    dispatch(clickProductInfoGoBack());
    navigate('/product');
  };

  // 수정 요청
  const modifyProduct = () => {
    navigate('/product-modify');
    // 뭐 보내야 정보 받아올거아냐
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      {/* 제품 이름 */}
      <Typography
        variant='h5'
        sx={{
          p: 1,
          width: 'max-content',
          borderBottom: '3px solid #2E7D32',
          textAlign: 'start'
        }}>
        {productDetail.data.name}
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
          <img src={productDetail.image[activeStep]} alt={productDetail.data.name} width={300} />
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
        {productDetail.data.info}
      </Typography>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productInfoState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProduct()}
        closeAction={() => dispatch(clickProductInfoGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;