import React, { useEffect, useState } from 'react';
import { api } from '../../network/network';
import { productApi } from '../../network/product';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickProductItemGoBack } from '../../app/reducers/dialogSlice';
import { getCurrentProductData, getProductDetail, getProductList, setSomeDraggingFalse, setSomeDraggingTrue } from '../../app/reducers/productSlice';
import { Box, Button, styled, Typography } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelModal from '../cancelModal';
import { getProductContent } from '../../app/reducers/productFormSlice';

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

  const [productId, setProductId] = useState({ targetProductId: 0, draggedProductId: 0 });
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productItemState = useAppSelector(state => state.dialog.productItemState); // 제품 삭제 dialog
  const currentProductData = useAppSelector(state => state.product.currentProductData); // 선택된 제품 정보
  const someDragging = useAppSelector(state => state.product.someDragging);
  const productList = useAppSelector(state => state.product.productList); // 제품 목록
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state

  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({ detail: res }));
        dispatch(getProductContent({ detail: res }));
        navigate('/product-detail');
      })
  };

  // toast
  const success = () => toast.success('삭제되었습니다.');

  // 제품 삭제
  const deleteProduct = (productId: number) => {
    productApi.deleteProduct(productId)
      .then(res => {
        productApi.getAllProducts(currentProductCategoryName)
          .then(res => {
            success();
            dispatch(getProductList({ productList: res }));
          })
          .catch(error => console.log(error))
        dispatch(clickProductItemGoBack());
      })
      .catch(error => console.log(error))
  };

  // 제품 순서변경
  const patchUpdateCategorySequence = (productId: number, targetProductId: number) => {
    productApi.patchUpdateCategorySequence(productId, targetProductId)
      .then(res => {
        console.log(res);
        dispatch(getProductList(res));
      })
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
      console.log(productId)
      // productApi.patchUpdateCategorySequence(draggedProduct.id, id);
    },
  }),
    [id, index, moveProductItem]
  );

  // drop
  const [, dropRef] = useDrop(() => ({
    accept: 'productItem',
    isDragging: () => {
      setProductId({ ...productId, draggedProductId: id });
      console.log('dragging')
    },
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
      const { product: draggedProduct, index: originIndex } = item; // id : target id, draggedProduct.id : 이동 제품 id
      if (draggedProduct.id !== id) {
        moveProductItem(draggedProduct, index);
        setProductId({ ...productId, targetProductId: id });
      }
    }
  }));

  useEffect(() => {
    isDragging ? dispatch(setSomeDraggingTrue()) : dispatch(setSomeDraggingFalse());
  }, [isDragging, someDragging]);

  return (
    <TotalBox>
      <ProductBox ref={dropRef}>
        {/* 제품 */}
        <ProductButton
          onClick={() => getProduct(id)}
          sx={{
            opacity: isDragging ? 0.5 : 1,
            '&:focus': { cursor: managerMode ? 'grab' : 'pointer' }
          }}>
          <img className='productImage' src={`${api.baseUrl()}/files/product/${image.serverFilename}`} width='100%' height='100%' alt={image.originalFilename} />
          <Typography
            ref={dragRef}
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
              onClick={() => {
                productApi.getProduct(product.id)
                  .then(res => {
                    dispatch(getProductDetail({ detail: res }));
                    dispatch(getProductContent({ detail: res }));
                    navigate('/product-modify');
                  })
              }}
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
        yesAction={() => deleteProduct(currentProductData.id)}
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
  height: 200,
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