import React, {useEffect} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from "@mui/material";
import ProductButton from "./productButton";
import {useAppDispatch} from "../../app/hooks";
import {useLocation, useNavigate} from "react-router-dom";
import {categoryApi} from "../../network/category";

interface propsType {
  windowSize: number
}

export default function ProductMiddleCategory({windowSize}: propsType) {
  // 임시데이터
  const productMiddleCategory = [
    {
      id: 1,
      categoryName: '중분류1',
      imageServerFilename: 'serverName1',
      imageOriginalFilename: '중분류 카테고리 1',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
    {
      id: 2,
      categoryName: '중분류2',
      imageServerFilename: 'serverName2',
      imageOriginalFilename: '중분류 카테고리 2',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
    {
      id: 3,
      categoryName: '중분류3',
      imageServerFilename: 'serverName3',
      imageOriginalFilename: '중분류 카테고리 3',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
    {
      id: 4,
      categoryName: '중분류4',
      imageServerFilename: 'serverName4',
      imageOriginalFilename: '중분류 카테고리 4',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
    {
      id: 5,
      categoryName: '중분류5',
      imageServerFilename: 'serverName5',
      imageOriginalFilename: '중분류 카테고리 5',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
    {
      id: 6,
      categoryName: '중분류6',
      imageServerFilename: 'serverName6',
      imageOriginalFilename: '중분류 카테고리 6',
      showInMain: 'false',
      parent: '대분류',
      children: []
    },
  ]
  const navigate = useNavigate();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  useEffect(() => {
    mainCategory &&
    categoryApi.getMiddleProductCategory(mainCategory)
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))
  }, [mainCategory])

  const selectMiddleCategory = (middleCategory: string) => {
    navigate(`/product/category?main=${mainCategory}&middle=${middleCategory}`)
  };

  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize < 1200) categoryColumn = 3;
    if (windowSize < 900) categoryColumn = 2;
    if (windowSize < 600) categoryColumn = 1;

    return (
      <Box sx={{width: '100%'}}>
        {!middleCategory &&
          <Grid container columns={categoryColumn} spacing={2}>
            {productMiddleCategory.length > 0 ?
              productMiddleCategory?.map((value) => (
                <Grid item xs={1} key={value.id} onClick={() => selectMiddleCategory(value.categoryName)}>
                  <ProductButton
                    imageServerFilename={value.imageServerFilename}
                    imageOriginalFilename={value.imageOriginalFilename}
                    categoryName={value.categoryName}
                  />
                </Grid>
              )) :
              <Typography>
                해당 카테고리에 제품이 존재하지 않습니다.
              </Typography>
            }
          </Grid>
        }

        {middleCategory &&
          <>
            <Container sx={{display: 'flex'}}>
              <Typography
                variant='h5'
                sx={{
                  p: 1,
                  userSelect: 'none',
                  fontWeight: 'bold'
                }}>
                제품 소개
              </Typography>
            </Container>
            <Box sx={{
              pt: 1,
              pb: 1,
              pl: 2,
              display: 'flex',
              flexDirection: 'column',
              width: 'max-content'
            }}>
              {productMiddleCategory.map((value) => (
                <MenuButton
                  key={value.id}
                  onClick={() => selectMiddleCategory(value.categoryName)}
                  sx={{
                    color: middleCategory === value.categoryName ? '#F0F0F0' : '#0F0F0F',
                    backgroundColor: middleCategory === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
                    '&:hover': {
                      backgroundColor: middleCategory === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
                    }
                  }}>
                  {value.categoryName}
                </MenuButton>
              ))}
            </Box>
          </>
        }
      </Box>
    )
  };

  return (
    <Grid item xs={1}>
      <ProductBox>
        {/* 카테고리 */}
        <CategoryGrid/>
      </ProductBox>
    </Grid>
  );
}

// 추가 버튼
const AddButton = styled(Button)(({theme}) => ({
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
  width: '23%',
  color: '#0F0F0F',
  backgroundColor: 'rgba(57, 150, 82, 0.1)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  }
})) as typeof Button;

const ProductBox = styled(Box)(() => ({
  margin: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
})) as typeof Box;

// Text 버튼
const MenuButton = styled(Button)(() => ({
  padding: 10,
  paddingLeft: 10,
  paddingRight: 20,
  marginLeft: 10,
  fontSize: 15,
  fontWeight: 'bold',
  marginBottom: 10,
  borderRadius: 5,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    transform: 'scale(1.02)'
  }
})) as typeof Button;