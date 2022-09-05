import React, { useEffect } from 'react';
import { adminApi } from '../../network/admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCompanyInfoImage, updateCompanyInfo } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';
import { api } from '../../network/network';

interface propsType {
  success: () => void
}

export default function CompanyInfo({ success }: propsType) {
  const dispatch = useAppDispatch();

  const ciForm = new FormData(); // CI 소개 (전송 데이터)

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const companyInfo = useAppSelector(state => state.companyModify.companyImage.compInfoImage); // CI 소개 state (받아온 데이터)

  // CI 받아오기
  useEffect(() => {
    adminApi.getCompanyInfo()
      .then(res => dispatch(getCompanyInfoImage({ companyInfoImage: res })))
      .catch(error => console.log(error))
  }, []);

  // CI 사진 업로드
  const updateCompanyInfoImage = (event: any) => {
    dispatch(updateCompanyInfo({ file: event.target.files[0], path: URL.createObjectURL(event.target.files[0]) }));
  };

  // CI 변경 요청
  const postCompanyInfo = () => {
    ciForm.append('file', companyInfo.file);
    ciForm.append('where', 'ci');
    adminApi.postCompanyInfo(ciForm)
      .then(res => {
        success();
        dispatch(getCompanyInfoImage({ companyInfoImage: res }));
      })
      .catch(error => console.log(error))
  };

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <TitleTypography variant='h5'>
          CI 소개
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {managerMode &&
          <>
            <label className='imageUploadButton' htmlFor='orgChartInput'>
              이미지 가져오기
              <input
                type='file'
                accept='image*'
                id='orgChartInput'
                onChange={updateCompanyInfoImage} />
            </label>
            {EditButton('수정', postCompanyInfo)}
          </>}
      </Spacing>

      {/* CI */}
      <Box sx={{ textAlign: 'center' }}>
        {managerMode ?
          <Container
            sx={{
              border: '2px solid lightgrey',
              borderRadius: 1,
              alignItems: 'center',
              minHeight: 300
            }}>
            <img src={companyInfo.path === '' ? `${api.baseUrl()}/files/admin/${companyInfo.serverFilename}` : companyInfo.path} alt='Company Info' width={'80%'} />
          </Container> :
          <img className='companyImage' src={`${api.baseUrl()}/files/admin/${companyInfo.serverFilename}`} alt='Company Info' />
        }
      </Box>
    </TotalBox>
  )
};

const Spacing = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: 20
  },
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;