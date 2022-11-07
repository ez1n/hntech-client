import React from 'react';
import {api} from '../../network/network';
import {productApi} from '../../network/product';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clickProductItemGoBack} from '../../app/reducers/dialogSlice';
import {getCurrentProductData, getProductDetail, getProductList} from '../../app/reducers/productSlice';
import {Box, Button, styled, Typography, Grid} from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import {useDrag, useDrop} from "react-dnd";

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
}

export default function ProductItem({product, index}: propsType) {
  const {id, image, productName} = product;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName); // 현재 선택된 카테고리 state


  // 제품 정보 받아오기
  const getProduct = (productId: number) => {
    productApi.getProduct(productId)
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        navigate(`/product?main=${mainCategory}&middle=${middleCategory}&id=${res.id}`);
      })
      .catch(error => console.log(error))
  };

  //제품 수정
  const putProduct = () => {
    productApi.getProduct(id)
      .then(res => {
        dispatch(getProductDetail({detail: res}));
        navigate('/product/modify');
      })
      .catch(error => console.log(error))
  };

  // 순서변경
  const putUpdateCategorySequence = (draggedId: number, targetId: number) => {
    productApi.putUpdateProductSequence({currentProductId: draggedId, targetProductId: targetId})
      .then(() => {
        middleCategory &&
        productApi.getAllProducts(middleCategory)
          .then(res => dispatch(getProductList({productList: res})))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  /* 드래그 앤 드롭 */

  // drag
  const [{isDragging}, dragRef] = useDrag(() => ({
      type: 'productCategory',
      item: {id, index},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {id: originId, index: originIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          putUpdateCategorySequence(originId, 0);
        }
      },
    }),
    [id, index]
  );

  // drop
  const [{isOver}, dropRef] = useDrop(() => ({
      accept: 'productCategory',
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
      drop: (item: { id: number, index: number }) => {
        const {id: draggedId, index: originIndex} = item;
        if (draggedId !== id) {
          putUpdateCategorySequence(draggedId, id);
        }
      }
    })
  );

  return (
    <Grid item xs={1} ref={dropRef}>
      <ProductBox ref={dragRef} sx={{boxShadow: isOver ? '3px 3px 3px 3px lightgrey' : 'none'}}>
        {/* 제품 */}
        <ProductButton onClick={() => getProduct(id)}>
          <Box sx={{height: 150, overflow: 'hidden'}}>
            {image.serverFilename !== null ?
              <img
                className='productImage'
                src={`${api.baseUrl()}/files/product/${image.serverFilename}`}
                width='100%'
                height='100%'
                alt={image.originalFilename}/> :
              <Typography>no Image</Typography>
            }
          </Box>
          <ProductNameTypography>
            {productName}
          </ProductNameTypography>
        </ProductButton>

        {/* 수정 버튼 */}
        {managerMode &&
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <Button
              onClick={() => {
                dispatch(getCurrentProductData({productData: product}));
                dispatch(clickProductItemGoBack());
              }}
              sx={{color: 'red'}}>
              <RemoveCircleRoundedIcon sx={{fontSize: 25}}/>
            </Button>
            <Button onClick={putProduct} sx={{color: 'green', padding: 0}}>
              <CreateRoundedIcon sx={{fontSize: 25}}/>
            </Button>
          </Box>
        }
      </ProductBox>
    </Grid>
  )
};

const ProductBox = styled(Box)(() => ({
  margin: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
})) as typeof Box;

// Item 버튼
const ProductButton = styled(Button)(() => ({
  width: '100%',
  height: 200,
  color: '#F0F0F0',
  display: 'flex',
  flexDirection: 'column',
  border: '3px solid rgba(79,79,79,0.78)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)'
  }
})) as typeof Button;

const ProductNameTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 13
  },
  fontSize: 15,
  fontWeight: 'bold',
  width: '100%',
  padding: 4,
  borderRadius: 8,
  backgroundColor: 'rgba(79,79,79,0.78)'
})) as typeof Typography;