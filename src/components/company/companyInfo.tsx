import React, { useEffect } from 'react';
import { adminApi } from '../../network/admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { previewCompanyInfo, updateCompanyData, updateCompanyInfo } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function CompanyInfo() {
  const dispatch = useAppDispatch();

  const ciForm = new FormData(); // CI 소개 (전송 데이터)

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const ci = useAppSelector(state => state.companyModify.ci); // CI 소개 state (받아온 데이터)
  const ciPreview = useAppSelector(state => state.companyModify.ciPreview); // CI 소개 미리보기 state
  const newData = useAppSelector(state => state.companyModify.newData); // 업로드한 데이터

  // 임시
  const image = '/images/organizationChart.png';

  // CI 받아오기
  useEffect(() => {
    dispatch(updateCompanyInfo({ ci: image }));
    dispatch(previewCompanyInfo({ path: ci.updatedServerFilename }));
  }, []);

  // CI 사진 업로드 -> 됐는지 확인해야함
  const updateCompanyInfoImage = (event: any) => {
    dispatch(previewCompanyInfo({ path: URL.createObjectURL(event.target.files[0]) }));
    dispatch(updateCompanyData({ data: event.target.files[0] }))
  };

  // CI 변경 요청
  const putCompanyInfo = () => {
    ciForm.append('file', newData);
    ciForm.append('where', 'ci');
    adminApi.putCompanyInfo(ciForm)
      .then(res => {
        console.log(res); // get 요청 어떻게 하는지?
        alert('등록되었습니다.');
      })
  };

  return (
    <Box p={5}>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
          }}>
          CI 소개
        </Typography>
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
                onChange={event => updateCompanyInfoImage(event)} />
            </label>
            {EditButton('수정', putCompanyInfo)}
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
            <img src={ciPreview} alt='조직도' width={'80%'} />
          </Container> :
          <img className='companyImage' src={ci.updatedServerFilename} alt='조직도' />
        }
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;