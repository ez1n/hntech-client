import React, {useEffect} from 'react';
import {api} from '../../network/network';
import {categoryApi} from '../../network/category';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectProductCategoryTrue,
  setCurrentProductCategoryName,
  setMainCategories
} from '../../app/reducers/categorySlice';
import {
  Box,
  ButtonBase,
  Container,
  Typography,
  styled
} from '@mui/material';

export default function Representation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productMainCategories = useAppSelector(state => state.category.productMainCategories); // 메인 카테고리 목록

  useEffect(() => {
    categoryApi.getMainCategories()
      .then(res => dispatch(setMainCategories({categories: res})))
  }, []);

  // 제품 버튼 클릭 이벤트 (페이지 이동)
  const onClickButton = (categoryName: string) => {
    dispatch(selectProductCategoryTrue());
    dispatch(setCurrentProductCategoryName({category: categoryName}));
    navigate('/product'); // 페이지 이동
  };

  return (
    <Container sx={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{
        p: 2,
        width: '80vw',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <MainTypographyContainer>
          <MainTypography>인간존중의 기업</MainTypography>
          <MainTypography>(주)에이치엔테크</MainTypography>
        </MainTypographyContainer>

        {/* 메인 카테고리 */}
        {productMainCategories?.map((item: { categoryName: string, id: number, imageServerFilename: string }) => (
          <RepProductionButton
            onClick={() => onClickButton(item.categoryName)}
            key={item.id}>
            {/* 카테고리 이미지 */}
            <Container
              style={{backgroundImage: `url(${api.baseUrl()}/files/category/${item.imageServerFilename})`}}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}/>
            <ImageBackdrop className='MuiImageBackdrop-root'/>

            {/* 카테고리 이름 */}
            <Container sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FCFCFC'
            }}>
              <Typography sx={{
                p: 2,
                position: 'relative',
                fontSize: 18,
                fontWeight: 'bold',
                display: 'none'
              }}>
                {item.categoryName}
              </Typography>
            </Container>
          </RepProductionButton>
        ))}
      </Box>
    </Container>
  )
};

const MainTypographyContainer = styled(Container)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    display: 'flex',
    margin: 30
  },
  [theme.breakpoints.down('sm')]: {
    margin: 10
  },
  width: '30%',
  textAlign: 'center',
  userSelect: 'none'
})) as typeof Container;

const MainTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 22,
    margin: 0,
    marginRight: 10
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 15
  },
  fontSize: 25,
  margin: 5,
  fontWeight: 'bold',
  color: 'darkgreen'
})) as typeof Typography;

// 메인 버튼
const RepProductionButton = styled(ButtonBase)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '45% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '80% !important'
  },
  width: '30%',
  margin: 5,
  height: 200,
  '&:hover': {
    '& .MuiImageBackdrop-root': {
      opacity: 0.3
    },
    '& .MuiTypography-root': {
      border: '5px solid #FCFCFC',
      borderRadius: 10,
      display: 'block'
    },
  },
})) as typeof ButtonBase;

// 이미지 커버(배경)
const ImageBackdrop = styled(Container)(({theme}) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#0F0F0F',
  opacity: 0,
  borderRadius: 10,
  transition: theme.transitions.create('opacity')
})) as typeof Container;