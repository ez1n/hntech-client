import React from 'react';
import {useAppSelector} from "../../app/hooks";
import {api} from "../../network/network";
import {Box, Button, Grid, styled, Typography} from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";

interface propsType {
  imageServerFilename: string,
  imageOriginalFilename: string,
  categoryName: string,
}

export default function ProductButton(props: propsType) {
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드

  return (
   <>
      <CategoryButton onClick={() => console.log('카테고리 선택')}>
        {/* 카테고리 */}
        <Box sx={{height: 150}}>
          <img
            className='categoryImage'
            src={`${api.baseUrl()}/files/category/${props.imageServerFilename}`}
            alt={props.imageOriginalFilename}
            width='100%'
            height='100%'/>
        </Box>
        <CategoryNameTypography>
          {props.categoryName}
        </CategoryNameTypography>
      </CategoryButton>

      {/* 수정 버튼 */}
      {managerMode &&
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
          <Button
            onClick={() => console.log('삭제')}
            sx={{color: 'red'}}>
            <RemoveCircleRoundedIcon sx={{fontSize: 30}}/>
          </Button>
          <Button
            onClick={() => console.log('수정')}
            sx={{color: 'darkgreen'}}>
            <CreateRoundedIcon sx={{fontSize: 30}}/>
          </Button>
        </Box>
      }
    </>
  );
}

// Image 버튼
const CategoryButton = styled(Button)(() => ({
  width: '100%',
  overflow: 'hidden',
  height: 200,
  color: '#F0F0F0',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 10,
  border: '3px solid rgba(79,79,79,0.78)',
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.04)',
    border: '3px solid rgba(79,79,79,0.78)',
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
  borderRadius: 8,
  backgroundColor: 'rgba(79,79,79,0.78)'
})) as typeof Typography;