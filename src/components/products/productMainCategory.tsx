import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {categoryApi} from '../../network/category';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
  addProductCategoryImage,
  setCurrentProductCategoryName,
  updateProductCategoryImage
} from '../../app/reducers/categorySlice';
import {setAllProductCategories} from '../../app/reducers/categorySlice';
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ProductMainCategoryItem from "./productMainCategoryItem";

interface propsType {
  windowSize: number,
  successDelete: () => void
}

export default function ProductMainCategory({windowSize, successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록

  useEffect(() => {
    // 카테고리 이미지 초기화
    dispatch(addProductCategoryImage({image: undefined}));
    dispatch(updateProductCategoryImage({categoryImage: ''}));

    // 카테고리 목록 받아오기
    categoryApi.getMainProductCategory()
      .then(res => dispatch(setAllProductCategories({categories: res})))
      .catch(error => console.log(error))
  }, []);

  // 카테고리 선택
  const selectMainCategory = (categoryName: string) => {
    dispatch(setCurrentProductCategoryName({category: categoryName}));
    navigate(`/product/category?main=${categoryName}`);
  };

  // 카테고리 목록
  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize < 1200) categoryColumn = 3;
    if (windowSize < 900) categoryColumn = 2;
    if (windowSize < 600) categoryColumn = 1;

    return (
      <DndProvider backend={HTML5Backend}>
        <Grid container columns={categoryColumn} spacing={3}>
          {productCategories?.map((value: {
            categoryName: string,
            id: number,
            imageServerFilename: string,
            imageOriginalFilename: string,
            showInMain: string
          }, index: number) => (
            <ProductMainCategoryItem category={value} index={index} selectMainCategory={selectMainCategory}
                                     successDelete={successDelete}/>
          ))}
        </Grid>
      </DndProvider>
    )
  };

  return (
    <Box sx={{width: '100%'}}>
      {/* default */}
      {!mainCategory &&
        <>
          <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 5
          }}>
            <TitleTypography variant='h5'>
              제품 소개
            </TitleTypography>
          </Container>

          {/* 카테고리 목록 */}
          <CategoryGrid/>

          {/* 추가 버튼 */}
          {managerMode &&
            <AddButton onClick={() => navigate('/product/category/main/form')}>
              <AddRoundedIcon sx={{color: '#042709', fontSize: 100, opacity: 0.6}}/>
            </AddButton>
          }
        </>
      }

      {/* category selected */}
      {mainCategory &&
        <>
          <Container sx={{display: 'flex'}}>
            <SelectedTitleTypography variant='h5'>
              제품 소개
            </SelectedTitleTypography>
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
              onClick={() => navigate(`/product/category`)}
              sx={{
                color: '#0F0F0F',
                backgroundColor: 'rgba(166,166,166,0.25)',
                '&:hover': {
                  backgroundColor: 'rgba(166,166,166,0.25)'
                }
              }}>
              전체
            </MenuButton>
            {productCategories.map((value: {
              categoryName: string;
              id: number;
              imageServerFilename: string;
              imageOriginalFilename: string;
              showInMain: string;
            }) => (
              <MenuButton
                key={value.id}
                onClick={() => selectMainCategory(value.categoryName)}
                sx={{
                  color: mainCategory === value.categoryName ? '#F0F0F0' : '#0F0F0F',
                  backgroundColor: mainCategory === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
                  '&:hover': {
                    backgroundColor: mainCategory === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
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

const Spacing = styled(Box)(() => ({
  height: 60
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: 18
  },
  fontWeight: 'bold',
  userSelect: 'none',
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;

const SelectedTitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: 18
  },
  padding: 1,
  userSelect: 'none',
  fontWeight: 'bold'
})) as typeof Typography;

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

