import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { nextImage, prevImage } from '../../app/reducers/productInfoSlice';
import { clickProductInfoGoBack } from '../../app/reducers/dialogSlice';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MobileStepper,
  styled,
  Typography
} from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import EditButton from '../editButton';

export default function ProductInfo() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 임시데이터
  const images = [
    {
      url: '/images/mainButtons/알람밸브조립.jpg'
    },
    {
      url: '/images/mainButtons/건식퓨지블링크.jpg'
    },
    {
      url: '/images/mainButtons/유리벌브.jpg'
    }
  ];

  // 임시 데이터
  const data = { name: '플러쉬', info: '아파트와 같은 주거공간의 발코니에 설치되는 제품' };

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productInfoState = useAppSelector(state => state.dialog.productInfoState); // 제품 삭제 dialog state
  const activeStep = useAppSelector(state => state.product.activeStep); // 제품 이미지 step state
  const maxSteps = images.length; // 이미지 갯수

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
        {data.name}
      </Typography>

      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode &&
          <>
            {EditButton('수정', () => navigate('/product-modify'))}
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
          <img src={images[activeStep].url} alt={data.name} width={300} />
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
        {data.info}
      </Typography>

      {/* 삭제 버튼 Dialog */}
      <Dialog
        open={productInfoState}
        onClose={() => dispatch(clickProductInfoGoBack())}>
        <DialogTitle>
          제품 삭제
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 제품이 삭제됩니다.
          </DialogContentText>
          <DialogContentText>
            삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickProductInfoGoBack());
            navigate('/product');
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickProductInfoGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;