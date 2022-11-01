import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {categoryApi} from "../../network/category";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getMiddleProductCategory,
  setCurrentProductMiddleCategory, setCurrentProductMiddleCategoryName
} from "../../app/reducers/categorySlice";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from "@mui/material";
import ProductButton from "./productButton";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ProductDeleteModal from "./productDeleteModal";

interface propsType {
  windowSize: number,
  successDelete: () => void
}

export default function ProductMiddleCategory({windowSize, successDelete}: propsType) {
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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');
  const middleCategory = new URLSearchParams(location.search).get('middle');

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const productMiddleCategories = useAppSelector(state => state.category.productMiddleCategories); // 중분류 카테고리 목록 state
  const currentProductMiddleCategory = useAppSelector(state => state.category.currentProductMiddleCategory); // 선택된 중분류 카테고리 state
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    dispatch(getMiddleProductCategory({category: productMiddleCategory}));

    mainCategory &&
    categoryApi.getMiddleProductCategory(mainCategory)
      .then(res => {
        console.log(res)
        dispatch(getMiddleProductCategory({category: res.data}));
      })
      .catch(error => console.log(error))
  }, [mainCategory])

  const selectMiddleCategory = (middleCategory: string) => {
    dispatch(setCurrentProductMiddleCategoryName({category: middleCategory}));
    navigate(`/product/category?main=${mainCategory}&middle=${middleCategory}`);
  };

  // 카테고리 삭제 확인 modal - open
  const openDeleteMessage = (category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string,
    parent: string,
    children: string[]
  }) => {
    dispatch(setCurrentProductMiddleCategory({category: category}));
    setOpenDelete(openDelete => !openDelete);
  };

  // 카테고리 삭제 확인 modal - close
  const closeDeleteMessage = () => setOpenDelete(false);

  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize < 1200) categoryColumn = 3;
    if (windowSize < 900) categoryColumn = 2;
    if (windowSize < 600) categoryColumn = 1;

    return (
      <Box sx={{width: '100%'}}>
        {!middleCategory &&
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
              }) => (
                <Grid item xs={1} key={value.id}>
                  <ProductButton
                    imageServerFilename={value.imageServerFilename}
                    imageOriginalFilename={value.imageOriginalFilename}
                    categoryName={value.categoryName}
                    onClick={selectMiddleCategory}
                  />

                  {/* 수정 버튼 */}
                  {managerMode &&
                    <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                      <Button
                        onClick={() => openDeleteMessage(value)}
                        sx={{color: 'red'}}>
                        <RemoveCircleRoundedIcon sx={{fontSize: 30}}/>
                      </Button>
                      <Button
                        onClick={() => {
                          dispatch(setCurrentProductMiddleCategory({category: value}));
                          navigate('/product/category/middle/modify');
                        }}
                        sx={{color: 'darkgreen'}}>
                        <CreateRoundedIcon sx={{fontSize: 30}}/>
                      </Button>
                    </Box>
                  }
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
    )
  };

  return (
    <>
      <Grid item xs={1}>
        <ProductBox>
          {/* 카테고리 */}
          <CategoryGrid/>
        </ProductBox>
      </Grid>

      {/* 카테고리 삭제 경고 메시지 */}
      <ProductDeleteModal
        open={openDelete}
        category={currentProductMiddleCategory}
        successDelete={successDelete}
        onClose={closeDeleteMessage}
      />
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