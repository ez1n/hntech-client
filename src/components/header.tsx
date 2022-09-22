import React, {useState} from 'react';
import './style.css';
import {api} from '../network/network';
import {useNavigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../app/hooks';
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
  styled,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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

  const clickOpenMenu = () => {
    setOpenMenu(openMenu => !openMenu)
  };

  const clickCloseMenu = () => {
    setOpenMenu(false);
    dispatch(mouseLeaveArchive());
    dispatch(mouseLeaveCompany());
    dispatch(mouseLeaveProduct());
    dispatch(mouseLeaveService());
  };

  return (
    <HeaderToolbar sx={{backgroundColor: `${managerMode ? '#B5C3B3' : '#FCFCFC'}`}}>
      {/* 로고 */}
      <Button onClick={() => navigate('/')}>
        <Stack direction='column'>
          <Stack direction='row' sx={{alignItems: 'center'}}>
            <img className='logoImage' src={`${api.baseUrl()}/files/admin/${logo.serverFilename}`}
                 alt='HNTECH logo'/>
            <CompanyName>(주)에이치앤테크</CompanyName>
          </Stack>
          {/* 관리자 모드 */}
          {managerMode && <AdminMode>관리자 모드</AdminMode>}
        </Stack>
      </Button>

      {/* 메뉴 */}
      <HeaderStack direction='row'>
        {/* 회사소개 */}
        <Box
          onMouseOver={() => dispatch(mouseOverCompany())}
          onMouseLeave={() => dispatch(mouseLeaveCompany())}
          sx={{width: '180px', height: '50px', lineHeight: '50px'}}
        >
          <MainMenu
            onClick={() => {
              navigate('/company');
              dispatch(clickChangeIntroduce());
            }}
          >
            회사소개
          </MainMenu>
          <ListBox sx={{height: openCompany ? '200px' : '0px'}}>
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
          </ListBox>
        </Box>

        {/* 제품소개 */}
        <Box
          onMouseOver={() => dispatch(mouseOverProduct())}
          onMouseLeave={() => dispatch(mouseLeaveProduct())}
          sx={{width: '180px', height: '50px', lineHeight: '50px'}}>
          <MainMenu onClick={() => {
            navigate('/client-product');
            dispatch(selectProductCategoryFalse());
          }}>
            제품소개
          </MainMenu>
          <ListBox sx={{height: openProduct ? `${productCategories.length * 40}px` : '0px'}}>
            {productCategories.map((item: {
              categoryName: string,
              id: number,
              imageServerFilename: string,
              imageOriginalFilename: string,
              showInMain: string
            }) => (
              <DropdownMenu
                key={item.id}
                onClick={() => {
                  navigate('/client-product');
                  dispatch(selectProductCategoryTrue());
                  dispatch(setCurrentProductCategoryName({category: item.categoryName}));
                }}>
                {item.categoryName}
              </DropdownMenu>
            ))}
          </ListBox>
        </Box>

        {/* 자료실 */}
        <Box
          onMouseLeave={() => dispatch(mouseLeaveArchive())}
          onMouseOver={() => dispatch(mouseOverArchive())}
          sx={{width: '180px', height: '50px', lineHeight: '50px'}}
        >
          <MainMenu onClick={() => navigate('/client-archive')}>
            자료실
          </MainMenu>
          <ListBox sx={{height: openArchive ? '80px' : '0px'}}>
            <DropdownMenu onClick={() => navigate('/client-archive')}>고객 자료실</DropdownMenu>
            <DropdownMenu onClick={() => navigate('/document')}>카다록 및 자재승인서</DropdownMenu>
          </ListBox>
        </Box>

        {/* 고객지원 */}
        <Box
          onMouseLeave={() => dispatch(mouseLeaveService())}
          onMouseOver={() => dispatch(mouseOverService())}
          sx={{width: '180px', height: '50px', lineHeight: '50px'}}>
          <MainMenu onClick={() => navigate('/client-question')}>
            고객지원
          </MainMenu>
          <ListBox sx={{height: openService ? '40px' : '0px'}}>
            <DropdownMenu onClick={() => navigate('/client-question')}>고객문의</DropdownMenu>
          </ListBox>
        </Box>

        <Stack direction={'row'} spacing={2} sx={{alignItems: 'center'}}>
          {/*<a href={'https://www.kakaocorp.com/page/service/service/KakaoTalk'} target={'_blank'}>*/}
          <a>
            <img src='/images/kakaotalkIcon.png' alt='kakao talk'/>
          </a>

          {/*<a href={'https://www.youtube.com/'} target={'_blank'}>*/}
          <a>
            <img src='/images/youtubeIcon.png' alt='youtube'/>
          </a>
        </Stack>
      </HeaderStack>

      {/* 900px 이하 */}
      <MobileHeaderStack direction={'row'} spacing={2}>
        {/*<a href={'https://www.kakaocorp.com/page/service/service/KakaoTalk'} target={'_blank'}>*/}
        <a>
          <img src='/images/kakaotalkIcon.png' alt='kakao talk'/>
        </a>

        {/*<a href={'https://www.youtube.com/'} target={'_blank'}>*/}
        <a>
          <img src='/images/youtubeIcon.png' alt='youtube'/>
        </a>

        <HeaderToggleButton onClick={clickOpenMenu}>
          <MenuRoundedIcon fontSize='large'/>
        </HeaderToggleButton>
      </MobileHeaderStack>

      <HeaderMenuDrawer
        anchor='right'
        open={openMenu}
        onClose={clickCloseMenu}
        sx={{zIndex: 990}}>
        <MenuList>
          <ListItemButton
            onClick={openCompany ? () => dispatch(mouseLeaveCompany()) : () => dispatch(mouseOverCompany())}>
            <ListItemText primary='회사소개'/>
          </ListItemButton>
          <Collapse in={openCompany} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeIntroduce());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='인사말'/>
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeHistory());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='회사연혁'/>
              </ListItemButton>
              <ListItemButton>
                <DropdownMenuListItem primary='조직도'/>
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeOrgChart());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='CI 소개'/>
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/company');
                dispatch(clickChangeLocation());
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='찾아오시는 길'/>
              </ListItemButton>
            </List>
          </Collapse>

          <Divider/>

          <ListItemButton
            onClick={openProduct ? () => dispatch(mouseLeaveProduct()) : () => dispatch(mouseOverProduct())}>
            <ListItemText primary='제품소개'/>
          </ListItemButton>
          <Collapse in={openProduct} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {productCategories.map((item: {
                categoryName: string,
                id: number,
                imageServerFilename: string,
                imageOriginalFilename: string,
                showInMain: string
              }) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => {
                    navigate('/client-product');
                    dispatch(setCurrentProductCategoryName({category: item.categoryName}));
                    clickCloseMenu();
                  }}>
                  <DropdownMenuListItem primary={item.categoryName}/>
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <Divider/>

          <ListItemButton
            onClick={openArchive ? () => dispatch(mouseLeaveArchive()) : () => dispatch(mouseOverArchive())}>
            <ListItemText primary='자료실'/>
          </ListItemButton>
          <Collapse in={openArchive} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/client-archive');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='고객 자료실'/>
              </ListItemButton>
              <ListItemButton onClick={() => {
                navigate('/document');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='카다록 및 자재승인서'/>
              </ListItemButton>
            </List>
          </Collapse>

          <Divider/>

          <ListItemButton
            onClick={openService ? () => dispatch(mouseLeaveService()) : () => dispatch(mouseOverService())}
            sx={{pb: 0}}>
            <ListItemText primary='고객지원'/>
          </ListItemButton>
          <Collapse in={openService} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton onClick={() => {
                navigate('/client-question');
                clickCloseMenu();
              }}>
                <DropdownMenuListItem primary='고객 문의'/>
              </ListItemButton>
            </List>
          </Collapse>
        </MenuList>
      </HeaderMenuDrawer>

    </HeaderToolbar>
  )
};

const HeaderToolbar = styled(Toolbar)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between'
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
    paddingBottom: 0
  },
  justifyContent: 'space-around',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  paddingTop: 10,
  paddingBottom: 10
})) as typeof Toolbar;

const CompanyName = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '1.4em'
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  display: 'flex',
  alignItems: 'center',
  marginLeft: 20,
  fontSize: '1.8em',
  fontWeight: 'bold',
  color: '#0F0F0F'
})) as typeof Typography;

const AdminMode = styled(Typography)(({theme}) => ({
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

const HeaderStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  },
  width: '70%',
  justifyContent: 'space-around',
  alignItems: 'center'
})) as typeof Stack;

const MobileHeaderStack = styled(Stack)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex'
  },
  display: 'none',
  alignItems: 'center'
})) as typeof Stack;

const HeaderToggleButton = styled(IconButton)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center'
  },
  color: 'darkgreen',
  display: 'none'
})) as typeof Button;

const HeaderMenuDrawer = styled(Drawer)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    display: 'block'
  },
  display: 'none'
})) as typeof Drawer;

const MenuList = styled(List)(({theme}) => ({
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

const ListBox = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  transition: 'height ease-out 0.3s 0s',
  overflow: 'hidden',
  backgroundColor: 'rgb(126,162,126)',
  padding: 0
})) as typeof List;

// 상위 메뉴 버튼
const MainMenu = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.1em',
  },
  width: '100%',
  height: '100%',
  fontSize: '1.3em',
  fontWeight: 'bold',
  color: '#21381c',
  transition: '0.5s',
  '&:hover': {
    backgroundColor: 'rgba(57, 150, 82, 0.1)',
    transform: 'scale(1.02)'
  }
})) as typeof Button;

// 하위 메뉴 버튼
const DropdownMenu = styled(ListItem)(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    fontSize: 10,
  },
  justifyContent: 'center',
  fontSize: 15,
  color: '#FCFCFC',
  height: '40px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.11)',
    color: '0F0F0F'
  }
}));