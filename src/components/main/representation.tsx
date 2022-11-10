import React, {useCallback, useEffect, useState} from 'react';
import {api} from '../../network/network';
import {categoryApi} from '../../network/category';
import {fileApi} from "../../network/file";
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  setCurrentProductCategoryName,
  setMainCategories
} from '../../app/reducers/categorySlice';
import {
  Box,
  ButtonBase,
  Container,
  Typography,
  styled,
  Button,
  Stack,
  Grid
} from '@mui/material';

export default function Representation() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const productMainCategories = useAppSelector(state => state.category.productMainCategories); // 메인 카테고리 목록
  const documentFile = useAppSelector(state => state.manager.document); // 카다록, 자재승인서, 시국세 정보
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  window.addEventListener("resize", handleWindowResize);
  useEffect(() => {
    categoryApi.getRepCategories()
      .then(res => dispatch(setMainCategories({categories: res})))
  }, []);

  // 제품 버튼 클릭 이벤트 (페이지 이동)
  const onClickButton = (categoryName: string) => {
    dispatch(setCurrentProductCategoryName({category: categoryName}));
    navigate(`/product/category?main=${categoryName}`); // 페이지 이동
  };

  // 파일 다운로드
  const downloadFile = (serverFilename: string, originalFilename: string) => {
    fileApi.downloadFile(serverFilename)
      .then(res => {
        return res;
      })
      .then(file => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalFilename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(error => console.log(error))
  };

  // 카테고리 목록
  const MainCategoryGrid = () => {
    let categoryColumn = productMainCategories.length;
    if (productMainCategories.length > 2) {
      if (windowSize < 1200) categoryColumn = 3;
      if (windowSize < 900) categoryColumn = 2;
    }
    if (windowSize < 600) categoryColumn = 1;

    return (
      <Grid container columns={categoryColumn} spacing={3}>
        {productMainCategories?.map((item: { categoryName: string, id: number, imageServerFilename: string }) => (
          <Grid item xs={1} key={item.id}>
            <CategoryButton onClick={() => onClickButton(item.categoryName)}>
              {/* 카테고리 */}
              <Box sx={{height: 150, minWidth: 214}}>
                <img
                  className='categoryImage'
                  src={`${api.baseUrl()}/files/category/${item.imageServerFilename}`}
                  alt={item.categoryName}
                  width='100%'
                  height='100%'/>
              </Box>

              <CategoryNameTypography>
                {item.categoryName}
              </CategoryNameTypography>
            </CategoryButton>
          </Grid>
        ))}
      </Grid>
    )
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Box sx={{
        p: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}>
        <DocumentStack direction={'row'} spacing={2}>
          <SideButton
            onClick={() => downloadFile(documentFile.catalogServerFilename, documentFile.catalogOriginalFilename)}>
            카다록
          </SideButton>
          <SideButton
            onClick={() => downloadFile(documentFile.materialServerFilename, documentFile.materialOriginalFilename)}>
            자재 승인서
          </SideButton>
          <SideButton onClick={() => downloadFile(documentFile.taxServerFilename, documentFile.taxOriginalFilename)}>
            시국세
          </SideButton>
        </DocumentStack>

        {/* 메인 카테고리 */}
        <MainCategoryGrid />
      </Box>
    </Box>
  )
};

// 메인 버튼
const RepProductionButton = styled(ButtonBase)(() => ({
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
  }
})) as typeof ButtonBase;

const DocumentStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block'
  },
  display: 'none',
  marginTop: 15,
  marginBottom: 15,
  textAlign: 'center',
  width: '100%'
})) as typeof Stack;

// 문서 다운로드 버튼
const SideButton = styled(Button)(() => ({
  fontSize: 13,
  borderRadius: 10,
  backgroundColor: 'rgb(48,103,51)',
  color: '#FCFCFC',
  '&: focus': {
    backgroundColor: 'rgb(62,147,67)'
  },
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgb(62,147,67)'
  }
})) as typeof Button;

const CategoryNameTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 15
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13
  },
  fontWeight: 'bold',
  width: '100%',
  paddingTop: 4,
  paddingBottom: 4,
  borderRadius: '8px',
  backgroundColor: 'rgba(79,79,79,0.78)'
})) as typeof Typography;

// Image 버튼
const CategoryButton = styled(Button)(() => ({
  width: '100%',
  overflow: 'hidden',
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