import React from 'react';
import {api} from "../../network/network";
import {Box, Button, styled, Typography} from "@mui/material";

interface propsType {
  imageServerFilename: string,
  imageOriginalFilename: string,
  categoryName: string,
  onClick: (name: string) => void
}

export default function ProductButton(props: propsType) {
  return (
      <CategoryButton onClick={() => props.onClick(props.categoryName)}>
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
    transform: 'scale(1.04)'
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