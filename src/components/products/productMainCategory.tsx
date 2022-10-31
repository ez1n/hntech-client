import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {categoryApi} from '../../network/category';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
  addProductCategoryImage,
  selectProductCategoryTrue,
  setCurrentProductCategoryName,
  updateProductCategoryImage
} from '../../app/reducers/categorySlice';
import {clickProductCategoryListGoBack} from '../../app/reducers/dialogSlice';
import {setAllProductCategories, setCurrentProductCategory} from '../../app/reducers/categorySlice';
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditButton from "../editButton";
import ProductCategoryList from "./productCategoryList";
import ProductDeleteModal from "./productDeleteModal";
import ProductButton from "./productButton";

interface propsType {
  windowSize?: number,
  successDelete: () => void,
  openMiddleCategory?: () => void
}

export default function ProductMainCategory({windowSize, successDelete, openMiddleCategory}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택
  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록
  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보
  const currentProductCategoryName = useAppSelector(state => state.category.currentProductCategoryName)
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    // 카테고리 이미지 초기화
    dispatch(addProductCategoryImage({image: undefined}));
    dispatch(updateProductCategoryImage({categoryImage: ''}));

    // 카테고리 목록 받아오기
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({categories: res.categories})))
      .catch(error => console.log(error))
  }, []);

  // 카테고리 삭제 확인 modal - open
  const openDeleteMessage = (category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  }) => {
    dispatch(setCurrentProductCategory({category: category}));
    setOpenDelete(openDelete => !openDelete);
  };

  // 카테고리 삭제 확인 modal - close
  const closeDeleteMessage = () => setOpenDelete(false);

  // 카테고리 선택
  const selectProductCategory = (categoryName: string) => {
    dispatch(selectProductCategoryTrue());
    dispatch(setCurrentProductCategoryName({category: categoryName}));
  }

  // 카테고리 목록
  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize) {
      if (windowSize < 1200) categoryColumn = 3;
      if (windowSize < 900) categoryColumn = 2;
      if (windowSize < 600) categoryColumn = 1;
    }

    return (
      <Grid container columns={categoryColumn} spacing={3}>
        {productCategories?.map((value: {
          categoryName: string,
          id: number,
          imageServerFilename: string,
          imageOriginalFilename: string,
          showInMain: string
        }) => (
          <ProductButton
            id={value.id}
            imageServerFilename={value.imageServerFilename}
            imageOriginalFilename={value.imageOriginalFilename}
            categoryName={value.categoryName}
          />
        ))}
      </Grid>
    )
  };

  return (
    <Box sx={{width: '100%'}}>
      {/* default */}
      {!productCategorySelected &&
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
          {managerMode &&
            <Spacing sx={{textAlign: 'end'}}>
              <EditButton name={'카테고리 목록'} onClick={() => dispatch(clickProductCategoryListGoBack())}/>

              <DndProvider backend={HTML5Backend}>
                <ProductCategoryList/>
              </DndProvider>
            </Spacing>
          }

          {/* 카테고리 목록 */}
          <CategoryGrid/>

          {/* 추가 버튼 */}
          {managerMode &&
            <AddButton onClick={() => navigate('/productCategory/form')}>
              <AddRoundedIcon sx={{color: '#042709', fontSize: 100, opacity: 0.6}}/>
            </AddButton>
          }
        </>
      }

      {/* category selected */}
      {productCategorySelected &&
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
            {productCategories.map((value: {
              categoryName: string;
              id: number;
              imageServerFilename: string;
              imageOriginalFilename: string;
              showInMain: string;
            }) => (
              <MenuButton
                key={value.id}
                onClick={() => {
                  dispatch(selectProductCategoryTrue());
                  dispatch(setCurrentProductCategoryName({category: value.categoryName}));
                }}
                sx={{
                  color: currentProductCategoryName === value.categoryName ? '#F0F0F0' : '#0F0F0F',
                  backgroundColor: currentProductCategoryName === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)',
                  '&:hover': {
                    backgroundColor: currentProductCategoryName === value.categoryName ? 'rgb(81,131,94)' : 'rgba(166,166,166,0.25)'
                  }
                }}>
                {value.categoryName}
              </MenuButton>
            ))}
          </Box>
        </>
      }

      {/* 카테고리 삭제 경고 메시지 */}
      <ProductDeleteModal
        open={openDelete}
        category={productCurrentCategory}
        successDelete={successDelete}
        onClose={closeDeleteMessage}
      />
    </Box>
  )
};

const Spacing = styled(Box)(() => ({
  height: 60
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  fontWeight: 'bold',
  userSelect: 'none',
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
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
