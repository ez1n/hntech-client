import React, { useState } from 'react';
import './style.css';
import { api } from '../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  mouseOverCompany,
  mouseOverProduct,
  mouseOverArchive,
  mouseOverService,
  mouseLeaveCompany,
  mouseLeaveProduct,
  mouseLeaveArchive,
  mouseLeaveService
} from '../app/reducers/menuSlice';
import {
  clickChangeIntroduce,
  clickChangeHistory,
  clickChangeOrgChart,
  clickChangeInfo,
  clickChangeLocation
} from '../app/reducers/companySlice';
import {
  selectProductCategoryTrue,
  selectProductCategoryFalse,
  setCurrentProductCategoryName
} from '../app/reducers/categorySlice';
import {
  Toolbar,
  Typography,
  Button, Stack,
  Box,
  Paper,
  styled,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const openCompany = useAppSelector(state => state.menu.company); // 회사소개 state
  const openProduct = useAppSelector(state => state.menu.product); // 제품소개 state
  const openArchive = useAppSelector(state => state.menu.archive); // 고객지원 state
  const openService = useAppSelector(state => state.menu.service); // 고객지원 state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const productCategories = useAppSelector(state => state.category.productCategories); // 제품 카테고리 state
  const logo = useAppSelector(state => state.manager.logo); // 회사 로고 

  const clickOpenMenu = () => { setOpenMenu(openMenu => !openMenu) };
  const clickCloseMenu = () => {
    setOpenMenu(false);
    dispatch(mouseLeaveArchive());
    dispatch(mouseLeaveCompany());
    dispatch(mouseLeaveProduct());
    dispatch(mouseLeaveService());
  };

  return (
    <HeaderToolbar sx={{ backgroundColor: `${managerMode ? '#B5C3B3' : '#FCFCFC'}` }}>
      {/* 로고 */}
      <Button sx={{ pr: 5 }} onClick={() => navigate('/')}>
        <Stack direction='column'>
          <Stack direction='row' sx={{ alignItems: 'center' }}>
            <img className='logoImage' src={`${api.baseUrl()}/files/admin/${logo.serverFilename}`} alt='HNTECH logo' />
            <CompanyName>HNTECH</CompanyName>
          </Stack>
          {/* 관리자 모드 */}
          {managerMode && <AdminMode>관리자 모드</AdminMode>}
        </Stack>
      </Button>

      {/* 메뉴 */}
      <HeaderStack direction='row'>
        {/* 회사소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveCompany())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverCompany())}
            onClick={() => {
              navigate('/company');
              dispatch(clickChangeIntroduce());
            }}
          >
            회사소개
          </MainMenu>
          {openCompany &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute'
              }}>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeIntroduce())
                }}>
                인사말
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeHistory())
                }}>
                회사 연혁
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeOrgChart())
                }}>
                조직도
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeInfo())
                }}>
                CI 소개
              </DropdownMenu>
              <DropdownMenu
                onClick={() => {
                  navigate('/company')
                  dispatch(clickChangeLocation())
                }}>
                찾아오시는 길
              </DropdownMenu>
            </Paper>
          }
        </Box>

        {/* 제품소개 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveProduct())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverProduct())}
            onClick={() => {
              navigate('/product');
              dispatch(selectProductCategoryFalse());
            }}
          >
            제품소개
          </MainMenu>
          {openProduct &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              {productCategories.map((item) => (
                <DropdownMenu
                  key={item.id}
                  onClick={() => {
                    navigate('/product');
                    dispatch(selectProductCategoryTrue());
                    dispatch(setCurrentProductCategoryName({ category: item.categoryName }));
                  }}>
                  {item.categoryName}
                </DropdownMenu>
              ))}
            </Paper>
          }
        </Box>

        {/* 자료실 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveArchive())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverArchive())}
            onClick={() => navigate('/archive')}
          >
            자료실
          </MainMenu>
          {openArchive &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu onClick={() => navigate('/archive')}>고객 자료실</DropdownMenu>
              <DropdownMenu onClick={() => navigate('/data')}>카다록 및 자재승인서</DropdownMenu>
            </Paper>
          }
        </Box>

        {/* 고객지원 */}
        <Box onMouseLeave={() => dispatch(mouseLeaveService())}>
          <MainMenu
            onMouseOver={() => dispatch(mouseOverService())}
            onClick={() => navigate('/question')}
          >
            고객지원
          </MainMenu>
          {openService &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu onClick={() => navigate('/question')}>고객문의</DropdownMenu>
            </Paper>
          }
        </Box>
      </HeaderStack>

      {/* 900px 이하 */}
      <HeaderToggleButton onClick={clickOpenMenu}>
        <MenuIcon />
      </HeaderToggleButton>

      <HeaderMenuDrawer
        anchor='right'
        open={openMenu}
        onClose={clickCloseMenu}
        sx={{ zIndex: 990 }}>
        <MenuList>
          <ListItemButton onClick={openCompany ? () => dispatch(mouseLeaveCompany()) : () => dispatch(mouseOverCompany())}>
            <ListItemText primary='회사소개' />
          </ListItemButton>
          <Collapse in={openCompany} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeIntroduce());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='인사말' />
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeHistory());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='회사연혁' />
              </ListItemButton>
              <ListItemButton>
                <DropdownMenuListItem primary='조직도' />
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeOrgChart());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='CI 소개' />
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeLocation());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='찾아오시는 길' />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider />

          <ListItemButton onClick={openProduct ? () => dispatch(mouseLeaveProduct()) : () => dispatch(mouseOverProduct())}>
            <ListItemText primary='제품소개' />
          </ListItemButton>
          <Collapse in={openProduct} timeout='auto' unmountOnExit>
            <ListItemButton>
              <List component='div' disablePadding>
                {productCategories.map((item) => (
                  <ListItemButton
                    key={item.id}
                    onClick={() => {
                      navigate('/product');
                      dispatch(setCurrentProductCategoryName({ category: item.categoryName }));
                      clickCloseMenu();
                    }}>
                    <DropdownMenuListItem primary={item.categoryName} />
                  </ListItemButton>
                ))}
              </List>
            </ListItemButton>
          </Collapse>

          <Divider />

          <ListItemButton onClick={openArchive ? () => dispatch(mouseLeaveArchive()) : () => dispatch(mouseOverArchive())}>
            <ListItemText primary='자료실' />
          </ListItemButton>
          <Collapse in={openArchive} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/archive');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='고객 자료실' />
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/data');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='카다록 및 자재승인서' />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider />

          <ListItemButton onClick={openService ? () => dispatch(mouseLeaveService()) : () => dispatch(mouseOverService())} sx={{ pb: 0 }}>
            <ListItemText primary='고객지원' />
          </ListItemButton>
          <Collapse in={openService} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/question');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='고객 문의' />
              </ListItemButton>
            </List>
          </Collapse>
        </MenuList>
      </HeaderMenuDrawer>

    </HeaderToolbar >
  )
};

const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between'
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
    paddingBottom: 0
  },
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  paddingTop: 10,
  paddingBottom: 10
})) as typeof Toolbar;

const MenuIcon = styled(MenuRoundedIcon)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 'medium'
  },
  fontsize: 'large'
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '2em'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  display: 'flex',
  alignItems: 'center',
  marginLeft: 20,
  fontSize: '2.5em',
  fontWeight: 'bold',
  color: '#0F0F0F'
})) as typeof Typography;

const AdminMode = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    top: '3.5em',
    fontSize: '1em'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  position: 'absolute',
  top: '3em',
  left: '7.5em',
  color: '#0F0F0F',
  fontWeight: 'bold',
  width: 'max-content'
})) as typeof Typography;

const HeaderStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  width: '100%',
  justifyContent: 'space-around'
})) as typeof Stack;

const HeaderToggleButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center'
  },
  color: 'darkgreen',
  display: 'none'
})) as typeof Button;

const HeaderMenuDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block'
  },
  display: 'none'
})) as typeof Drawer;

const MenuList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    paddingTop: '60px',
    width: 250
  },
  paddingTop: '84px',
  width: 400
})) as typeof List;

const DropdownMenuListItem = styled(ListItemText)(() => ({
  paddingLeft: 20
})) as typeof ListItemText;

// 상위 메뉴 버튼
const MainMenu = styled(Button)(() => ({
  width: '150px',
  fontSize: '1.3em',
  color: '#0F0F0F',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)'
  }
})) as typeof Button;

// 하위 메뉴 버튼
const DropdownMenu = styled(Button)(() => ({
  justifyContent: 'center',
  fontSize: 13,
  color: '#0F0F0F',
  width: '150px',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.2)',
  },
})) as typeof Button;