import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Box, Button, styled } from '@mui/material';
import { fileApi } from '../../network/file';

export default function Files() {
  const productDetail = useAppSelector(state => state.product.productDetail); // 제품 정보

  // 파일 다운로드
  const downloadFile = (serverFilename: string, originalFilename: string) => {
    fileApi.downloadFile(serverFilename)
      .then(res => {
        return res;
      })
      .then(file => {
        const url = window.URL.createObjectURL(file);
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

  return (
    <Box>
      {productDetail.files.map((item: {
        id: number,
        originalFilename: string,
        savedPath: string,
        serverFilename: string
      }) =>
        <FileButton
          key={item.id}
          onClick={() => downloadFile(item.serverFilename, item.originalFilename)}>
          {item.originalFilename}
        </FileButton>)}
    </Box>
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
})) as typeof Button;