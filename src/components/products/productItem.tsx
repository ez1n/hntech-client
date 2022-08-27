import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { productApi } from '../../network/product';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductItemGoBack } from '../../app/reducers/dialogSlice';
import { getCurrentProductData, getProductDetail, getProductList, setProductItems, setSomeDraggingFalse, setSomeDraggingTrue } from '../../app/reducers/productSlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelModal from '../cancelModal';

interface propsType {
  product: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    },
    productName: string
  },
  index: number
};

export default function ProductItem({ product, index }: propsType) {
  const { id, image, productName } = product;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productItemState = useAppSelector(state => state.dialog.productItemState); // 제품 삭제 dialog
  const currentProductData = useAppSelector(state => state.product.currentProductData); // 선택된 제품 정보
  const productItems = useAppSelector(state => state.product.productItems); // 제품 id 리스트 (dnd)
  const someDragging = useAppSelector(state => state.product.someDragging);

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({ detail: res }));
        navigate('/product-detail');
        console.log(res)
      })
  };

  // 수정 요청
  const modifyProduct = () => {
    navigate('/product-modify');
    // 뭐 보내야 정보 받아올거아냐
  };

  // 제품 삭제
  const deleteProduct = (productId: number) => {
    productApi.deleteProduct(productId)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  };

  // dnd
  const moveProductItem = (moveItem: number, index: number) => {
    const currentIndex = productItems.indexOf(moveItem);
    let newItems = [...productItems];
    newItems.splice(currentIndex, 1);
    newItems.splice(index, 0, moveItem);
    dispatch(setProductItems({ newProductItems: newItems }))
  };

  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: 'productItem',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: originId, index: originIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveProductItem(originId, originIndex);
      }
    },
  }),
    [id, index, moveProductItem]
  );

  const [, dropLeft] = useDrop(() => ({
    accept: 'productItem',
    canDrop: () => false,
    hover: (draggedItem, monitor) => {
      if (draggedItem.id !== id) {
        moveProductItem(draggedItem.id, index);
      }
    },
  }), [moveProductItem]);

  const [, dropRight] = useDrop(() => ({
    accept: 'productItem',
    canDrop: () => false,
    hover: (draggedItem, monitor) => {
      if (draggedItem.id !== id) {
        (draggedItem.index !== index + 1) && moveProductItem(draggedItem.id, index + 1);
      }
    },
  }), [moveProductItem]);

  useEffect(() => {
    isDragging ? dispatch(setSomeDraggingTrue()) : dispatch(setSomeDraggingFalse());
  }, [isDragging, someDragging]);

  return (
    <Box ref={previewRef}>
      <TotalBox ref={dragRef} sx={{ opacity: isDragging ? 0.3 : 1, cursor: 'move' }}>
        <ProductButton
          onClick={() => getProduct(id)}>
          <img className='productImage' src={`${api.baseUrl()}/files/product/${image.serverFilename}`} width='100%' alt='제품 이미지' />
          <Typography sx={{
            width: '100%',
            borderRadius: 1,
            backgroundColor: 'rgba(57, 150, 82, 0.2)'
          }}>
            {productName}
          </Typography>
        </ProductButton>

        {/* 수정 버튼 */}
        {managerMode &&
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                dispatch(getCurrentProductData({ productData: item }))
                dispatch(clickProductItemGoBack());
              }}
              sx={{ color: 'red', padding: 0 }}>
              <RemoveCircleRoundedIcon sx={{ fontSize: 25 }} />
            </Button>
            <Button
              onClick={modifyProduct}
              sx={{ color: 'green', padding: 0 }}>
              <CreateRoundedIcon sx={{ fontSize: 25 }} />
            </Button>
          </Box>
        }
      </TotalBox>

      {managerMode &&
        <AddButton onClick={() => navigate('/product-form')}>
          <AddRoundedIcon sx={{ color: '#042709', fontSize: 100, opacity: 0.6 }} />
        </AddButton>}

      {/* 위치 변경되는 공간 (left, right) */}
      <NoneDndContainer ref={dropLeft} sx={{ zIndex: someDragging ? 30 : 0, left: 0 }} />
      <NoneDndContainer ref={dropRight} sx={{ zIndex: someDragging ? 30 : 0, right: 0 }} />

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productItemState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProduct(currentProductData.id)}
        closeAction={() => dispatch(clickProductItemGoBack())} />
    </ Box>
  )
};

const TotalBox = styled(Box)(({ theme }) => ({
  // screen width - xs: 0px ~, sm: 600px ~, md: 960px ~, lg: 1280px ~, xl: 1920px ~
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90% !important'
  },
  width: '19%',
  margin: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})) as typeof Box;

// Item 버튼
const ProductButton = styled(Button)(() => ({
  margin: 10,
  width: '100%',
  color: '#0F0F0F',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(57, 150, 82, 0.2)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)',
    fontWeight: 'bold'
  }
})) as typeof Button;

// 추가 버튼
const AddButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90% !important'
  },
  margin: 10,
  width: '18%',
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
})) as typeof Button;

// dnd 적용 안되는 위치
const NoneDndContainer = styled(Container)(() => ({
  position: 'absolute',
  width: '10%'
})) as typeof Container;