import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, Button, Container, Stack, styled, Typography, Grid } from '@mui/material';
import { fileApi } from '../network/file';
import { useAppSelector } from '../app/hooks';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MainData() {
  const [catalogPDF, setCatalogPDF] = useState<string>('');
  const [approvalPDF, setApprovalPDF] = useState<string>('');
  const [taxPDF, setTaxPDF] = useState<string>('');
  const documentFile = useAppSelector(state => state.manager.document); // 카다록, 자재승인서 정보

  useEffect(() => {
    fileApi.downloadFile(documentFile.catalogServerFilename)
      .then(res => setCatalogPDF(URL.createObjectURL(res)))
      .catch(error => console.log(error))

    fileApi.downloadFile(documentFile.materialServerFilename)
      .then(res => setApprovalPDF(URL.createObjectURL(res)))
      .catch(error => console.log(error))

    fileApi.downloadFile(documentFile.taxServerFilename)
      .then(res => setTaxPDF(URL.createObjectURL(res)))
      .catch(error => console.log(error))
  }, [documentFile]);

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

  return (
    <Stack spacing={5} sx={{ pt: 10, alignItems: 'center' }}>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
            userSelect: 'none'
          }}>
          카다록 및 자재 승인서
        </Typography>
      </Container>

      <ContentContainer container columns={7}>
        <Grid item xs={2} wrap={'wrap'} sx={{minWidth: '300px',textAlign: 'center'}}>
          <FileBox>
            <Document file={catalogPDF}>
              <Page pageNumber={1} height={450} />
            </Document>
          </FileBox>

          <FileButton onClick={() => downloadFile(documentFile.catalogServerFilename, documentFile.catalogOriginalFilename)}>
            카다록 다운로드
          </FileButton>
        </Grid>

        <Grid item xs={2} sx={{minWidth: '300px',textAlign: 'center'}}>
          <FileBox>
            <Document file={approvalPDF}>
              <Page pageNumber={1} height={450} />
            </Document>
          </FileBox>

          <FileButton onClick={() => downloadFile(documentFile.materialServerFilename, documentFile.materialOriginalFilename)}>
            자재 승인서 다운로드
          </FileButton>
        </Grid>

        <Grid item xs={2} sx={{minWidth: '300px',textAlign: 'center'}}>
          <FileBox>
            <Document file={taxPDF}>
              <Page pageNumber={1} height={450} />
            </Document>
          </FileBox>

          <FileButton onClick={() => downloadFile(documentFile.taxServerFilename, documentFile.taxOriginalFilename)}>
            시국세 다운로드
          </FileButton>
        </Grid>
      </ContentContainer>
    </Stack>
  )
};

const ContentContainer = styled(Grid)(({ theme }) => ({
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
})) as typeof Grid;

// 미리보기 스타일
const FileBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
  },
  [theme.breakpoints.down('sm')]: {
    height: 350,
  },
  margin: 10,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid green',
  borderRadius: 8,
  overflow: 'hidden'
})) as typeof Box;

// 버튼 스타일
const FileButton = styled(Button)(() => ({
  color: '#FCFCFC',
  backgroundColor: 'green',
  marginTop: 25,
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