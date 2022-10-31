import React from 'react';
import {Breadcrumbs, Button, Dialog, DialogContent, DialogTitle, Grid, styled, Typography} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ProductButton from "./productButton";
import {useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";

interface propsType {
  windowSize: number,
  open: boolean,
  onClose: () => void
}

export default function ProductMiddleCategory({windowSize, open, onClose}: propsType) {
  // 임시데이터
  const productMiddleCategories = [
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

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드

  const CategoryGrid = () => {
    let categoryColumn = 4;
    if (windowSize < 1200) categoryColumn = 3;
    if (windowSize < 900) categoryColumn = 2;
    if (windowSize < 600) categoryColumn = 1;

    return (
      <Grid container columns={categoryColumn} spacing={3}>
        {productMiddleCategories?.map((value) => (
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
    <Dialog fullWidth maxWidth='lg' open={open} onClose={onClose}>
      <DialogTitle>카테고리 선택</DialogTitle>

      <DialogContent>
        <Breadcrumbs separator={<NavigateNextIcon fontSize='small'/>}>
          {[
            <Typography sx={{fontSize: 'large'}}>대분류 카테고리</Typography>,
            <Typography sx={{fontSize: 'large', fontWeight: 'bold'}}>중분류 카테고리</Typography>
          ]}
        </Breadcrumbs>
      </DialogContent>

      <DialogContent>
        <CategoryGrid/>

        {/* 추가 버튼 */}
        {managerMode &&
          <AddButton onClick={() => navigate('/middleCategory/form')}>
            <AddRoundedIcon sx={{color: '#042709', fontSize: 100, opacity: 0.6}}/>
          </AddButton>
        }
      </DialogContent>
    </Dialog>
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