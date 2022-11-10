import React, {useEffect} from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useLocation, useNavigate} from "react-router-dom";
import {categoryApi} from "../../network/category";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getMiddleProductCategory,
  setCurrentProductMiddleCategoryName
} from "../../app/reducers/categorySlice";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from "@mui/material";
import ProductMiddleCategoryItem from "./productMiddleCategoryItem";

interface propsType {
  windowSize: number,
  successDelete: () => void
}

export default function ProductMiddleCategory({windowSize, successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  const productMiddleCategories = useAppSelector(state => state.category.productMiddleCategories); // 중분류 카테고리 목록 state

  useEffect(() => {
    mainCategory &&
    categoryApi.getMiddleProductCategory(mainCategory)
      .then(res => dispatch(getMiddleProductCategory({category: res.categories})))
      .catch(error => console.log(error))
  }, [mainCategory]);

  const selectMiddleCategory = (categoryName: string) => {
    dispatch(setCurrentProductMiddleCategoryName({category: categoryName}));
    navigate(`/product/category?main=${mainCategory}&middle=${categoryName}`);
  };

  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize < 1200) categoryColumn = 3;
    if (windowSize < 900) categoryColumn = 2;
    if (windowSize < 600) categoryColumn = 1;

    return (
      <DndProvider backend={HTML5Backend}>
        <Grid container columns={categoryColumn} spacing={2}>
          {productMiddleCategories.length > 0 ?
            productMiddleCategories?.map((value: {
              id: number,
              categoryName: string,
              imageServerFilename: string,
              imageOriginalFilename: string,
              showInMain: string,
              parent: string,
              children: string[]
            }, index: number) => (
              <ProductMiddleCategoryItem key={value.id} category={value} index={index}
                                         selectMiddleCategory={selectMiddleCategory}
                                         successDelete={successDelete}/>
            )) :
            <Typography>
              해당 카테고리에 제품이 존재하지 않습니다.
            </Typography>
          }
        </Grid>
      </DndProvider>
    )
  };

  return (
    <>
      <Grid item xs={1}>
        <ProductBox>
          <Box sx={{width: '100%'}}>
            {!middleCategory &&
              <CategoryGrid/>
            }

            {middleCategory &&
              <>
                <Container sx={{display: 'flex'}}>
                  <TitleTypography variant='h5'>
                    제품 소개
                  </TitleTypography>
                </Container>
                <Box sx={{
                  pt: 1,
                  pb: 1,
                  pl: 2,
                  pr: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'max-content'
                }}>
                  <MenuButton
                    onClick={() => navigate(`/product/category?main=${mainCategory}`)}
                    sx={{
                      color: '#0F0F0F',
                      backgroundColor: 'rgba(166,166,166,0.25)',
                      '&:hover': {
                        backgroundColor: 'rgba(166,166,166,0.25)'
                      }
                    }}>
                    전체
                  </MenuButton>
                  {productMiddleCategories.map((value: {
                    id: number,
                    categoryName: string,
                    imageServerFilename: string,
                    imageOriginalFilename: string,
                    showInMain: string,
                    parent: string,
                    children: string[]
                  }) => (
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
        </ProductBox>
      </Grid>
    </>
  );
}

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

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: 18
  },
  padding: 1,
  userSelect: 'none',
  fontWeight: 'bold'
})) as typeof Typography;
