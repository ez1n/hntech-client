import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {categoryApi} from '../../network/category';
import {api} from '../../network/network';
import {adminApi} from "../../network/admin";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {
  addProductCategoryImage,
  selectProductCategoryTrue,
  setCurrentProductCategoryName,
  updateProductCategoryImage
} from '../../app/reducers/categorySlice';
import {
  clickProductCategoryListGoBack
} from '../../app/reducers/dialogSlice';
import {setAllProductCategories, setCurrentProductCategory} from '../../app/reducers/categorySlice';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  TextField,
  Typography
} from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelModal from '../cancelModal';
import {changeMode, setPassword} from '../../app/reducers/managerModeSlice';
import EditButton from "../editButton";
import ProductCategoryList from "./productCategoryList";

interface propsType {
  successDelete: () => void
}

export default function ProductCategories({successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const password = useAppSelector(state => state.manager.password); // 관리자 비밀번호
  const productCategorySelected = useAppSelector(state => state.category.productCategorySelected); // 카테고리 선택
  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록
  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보
  const [onDeleteCategory, setOnDeleteCategory] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  useEffect(() => {
    // 카테고리 이미지 초기화
    dispatch(addProductCategoryImage({image: undefined}));
    dispatch(updateProductCategoryImage({categoryImage: ''}));

    // 카테고리 목록 받아오기
    categoryApi.getAllProductCategories()
      .then(res => dispatch(setAllProductCategories({categories: res.categories})))
      .catch(error => console.log(error))
  }, []);

  // 카테고리 삭제 modal - open
  const openDeleteCategory = () => {
    setOnDeleteCategory(onDeleteCategory => !onDeleteCategory);
  };

  // 카테고리 삭제 modal - close
  const closeDeleteCategory = () => {
    setOnDeleteCategory(false);
  };

  // 비밀번호 확인
  const postLogin = () => {
    adminApi.postLogin(password)
      .then(res => {
        setLoginErrorMsg('');
        setCheckPassword(false);
        openDeleteCategory();
      })
      .catch(error => {
        setLoginErrorMsg(error.response.data.message);
      })
  };

  const onLoginEnterKey = (event: any) => {
    if (event.key === 'Enter') {
      postLogin();
    }
  };

  // 카테고리 삭제
  const deleteProductCategory = (categoryId: number) => {
    categoryApi.deleteProductCategory(categoryId)
      .then(res => {
        successDelete();
        closeDeleteCategory();
        categoryApi.getAllProductCategories()
          .then(res => dispatch(setAllProductCategories({categories: res.categories})))
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
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

              <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {productCategories?.map((value: {
                  categoryName: string;
                  id: number;
                  imageServerFilename: string;
                  imageOriginalFilename: string;
                  showInMain: string;
                }) => (
                  <CategoryBox key={value.id} sx={{m: 1}}>
                    <CategoryButton onClick={() => {
                      dispatch(selectProductCategoryTrue());
                      dispatch(setCurrentProductCategoryName({category: value.categoryName}));
                    }}>
                      {/* 카테고리 목록 */}
                      <Box sx={{height: 150}}>
                        <img
                          className='categoryImage'
                          src={`${api.baseUrl()}/files/category/${value.imageServerFilename}`}
                          alt={value.imageOriginalFilename}
                          width='100%'
                          height='100%'/>
                      </Box>
                      <CategoryNameTypography>
                        {value.categoryName}
                      </CategoryNameTypography>
                    </CategoryButton>

                    {/* 수정 버튼 */}
                    {managerMode &&
                        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
                            <Button
                                onClick={() => {
                                  dispatch(setCurrentProductCategory({category: value}));
                                  setCheckPassword(checkPassword => !checkPassword);
                                }}
                                sx={{color: 'red'}}>
                                <RemoveCircleRoundedIcon sx={{fontSize: 30}}/>
                            </Button>
                            <Button
                                onClick={() => {
                                  dispatch(setCurrentProductCategory({category: value}));
                                  navigate('/productCategory-modify');
                                }}
                                sx={{color: 'darkgreen'}}>
                                <CreateRoundedIcon sx={{fontSize: 30}}/>
                            </Button>
                        </Box>
                    }
                  </CategoryBox>
                ))}
              </Box>

            {/* 추가 버튼 */}
            {managerMode &&
                <AddButton onClick={() => navigate('/productCategory-form')}>
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
                        userSelect: 'none'
                      }}>
                      제품 소개
                  </Typography>
              </Container>
              <Box sx={{
                pt: 1,
                pb: 1,
                pl: 2,
                display: 'flex',
                flexDirection: 'column'
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
                    }}>
                    <Typography sx={{m: 1, textAlign: 'center'}}>{value.categoryName}</Typography>
                  </MenuButton>
                ))}
              </Box>
          </>
      }

      {/* 카테고리 삭제 비밀번호 확인 Dialog */}
      < Dialog
        open={checkPassword}
        onClose={() => setCheckPassword(false)}>
        <DialogTitle>
          비밀번호 확인
        </DialogTitle>

        <DialogContent>
          <DialogContentText>비밀번호</DialogContentText>
          <TextField
            error={!!loginErrorMsg}
            helperText={loginErrorMsg}
            required
            autoFocus={true}
            autoComplete='off'
            type={'password'}
            onChange={event => dispatch(setPassword({password: event?.target.value}))}
            onKeyUp={onLoginEnterKey}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={postLogin}>
            확인
          </Button>
          <Button
            onClick={() => {
              setCheckPassword(false);
              setLoginErrorMsg('');
            }}>
            취소
          </Button>
        </DialogActions>
      </Dialog>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={onDeleteCategory}
        title='카테고리 삭제'
        text1='해당 카테고리가 삭제됩니다.'
        text2='삭제하시겠습니까?'
        yesAction={() => deleteProductCategory(productCurrentCategory.id)}
        closeAction={closeDeleteCategory}/>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const CategoryBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    width: '31% !important'
  },
  [theme.breakpoints.down('md')]: {
    width: '47% !important'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100% !important'
  },
  width: '23%',
  margin: 1,
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  userSelect: 'none',
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;

const CategoryNameTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 15
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13
  },
  width: '100%',
  paddingTop: 4,
  paddingBottom: 4,
  borderRadius: 1,
  backgroundColor: 'rgba(57, 150, 82, 0.2)'
})) as typeof Typography;

// Image 버튼
const CategoryButton = styled(Button)(() => ({
  width: '100%',
  overflow: 'hidden',
  height: 200,
  color: '#0F0F0F',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(57, 150, 82, 0.2)',
  borderRadius: 10,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)'
  }
})) as typeof Button;

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
  color: '#0F0F0F',
  fontSize: 15,
  marginBottom: 2,
  justifyContent: 'flex-start',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)'
  }
})) as typeof Button;
