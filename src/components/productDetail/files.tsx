import React from 'react';
import { Button, styled } from '@mui/material';

export default function Files() {
  const data = [
    { name: '형식승인서' },
    { name: '도면' },
  ]
  return (
    <>
      {data.map((item, index) =>
        <FileButton key={index}>
          {item.name}
        </FileButton>)}
    </>
  )
};

// 버튼 스타일
const FileButton = styled(Button)(() => ({
  color: '#FCFCFC',
  backgroundColor: 'green',
  marginLeft: 5,
  marginRight: 5,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 10,
  fontSize: 15,
  transition: '0.5s',
  '&: hover': {
    transform: 'scale(1.02)',
    backgroundColor: 'rgb(66, 183, 72)'
  }
}));