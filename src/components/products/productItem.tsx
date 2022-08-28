import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { productApi } from '../../network/product';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductItemGoBack } from '../../app/reducers/dialogSlice';
import { getCurrentProductData, getProductDetail, getProductList, setProductItems, setSomeDraggingFalse, setSomeDraggingTrue, updateProductItems } from '../../app/reducers/productSlice';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
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
  const productList = useAppSelector(state => state.product.productList); // 제품 목록

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

  // 제품 순서변경
  const patchUpdateCategorySequence = (productId: number, targetProductId: number) => {
    productApi.patchUpdateCategorySequence(productId, targetProductId)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  };


  /* 드래그 앤 드롭 */

  // 제품 순서 변경 보여주기
  const moveProductItem = (moveItem: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string,
    },
    productName: string
  }, index: number) => {
    const currentIndex = productList.indexOf(moveItem);
    let newItems = [...productList];
    newItems.splice(currentIndex, 1);
    newItems.splice(index, 0, moveItem);
    dispatch(getProductList({ productList: newItems }));
  };

  // drag
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'productItem',
    item: { product, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { product: originProduct, index: originIndex } = item;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveProductItem(originProduct, originIndex);
      }
    },
  }),
    [id, index, moveProductItem]
  );

  // drop
  const [, leftDrop] = useDrop(() => ({
    accept: 'productItem',
    canDrop: () => true,
    hover: (item: {
      product: {
        id: number,
        image: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string,
        },
        productName: string
      }, index: number
    }) => {
      const { product: draggedProduct, index: originIndex } = item;
      if (draggedProduct.id !== id) {
        moveProductItem(draggedProduct, index);
      }
    },
    drop: (item: {
      product: {
        id: number,
        image: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string,
        },
        productName: string
      }, index: number
    }) => {
      const { product: draggedProduct, index: originIndex } = item;
      // productApi.patchUpdateCategorySequence(draggedProduct.id, id);
      console.log(index, originIndex); // 어떻게 하징..
    }
  }));

  const [, rightDrop] = useDrop(() => ({
    accept: 'productItem',
    canDrop: () => true,
    hover: (item: {
      product: {
        id: number,
        image: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string,
        },
        productName: string
      }, index: number
    }) => {
      const { product: draggedProduct, index: originIndex } = item;
      if (draggedProduct.id !== id) {
        originIndex !== index && moveProductItem(draggedProduct, index + 1);
      }
    },
    drop: (item: {
      product: {
        id: number,
        image: {
          id: number,
          originalFilename: string,
          savedPath: string,
          serverFilename: string,
        },
        productName: string
      }, index: number
    }) => {
      const { product: draggedProduct, index: originIndex } = item;
      if (draggedProduct.id !== id) {
        // productApi.patchUpdateCategorySequence(draggedProduct.id, productList[index + 1].id);
        console.log(draggedProduct.productName, productName);
      }
    }
  }));

  useEffect(() => {
    isDragging ? dispatch(setSomeDraggingTrue()) : dispatch(setSomeDraggingFalse());
  }, [isDragging, someDragging]);

  return (
    <TotalBox>
      <ProductBox ref={leftDrop}>
        {/* 제품 */}
        <ProductButton ref={dragRef} onClick={() => getProduct(id)} sx={{ opacity: isDragging ? 0.5 : 1, '&:focus': { cursor: managerMode ? 'grab' : 'pointer' } }}>
          <img className='productImage' src={`${api.baseUrl()}/files/product/${image.serverFilename}`} width='100%' alt={image.originalFilename} />
          <Typography
            sx={{
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
                dispatch(getCurrentProductData({ productData: product }))
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
      </ProductBox>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={productItemState}
        title='제품 삭제'
        text1='해당 제품이 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => {
          deleteProduct(currentProductData.id);
          dispatch(clickProductItemGoBack());
        }}
        closeAction={() => dispatch(clickProductItemGoBack())} />
    </TotalBox>
  )
};

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    width: '30% !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '100% !important'
  },
  width: '20%'
}))

const ProductBox = styled(Box)(() => ({
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