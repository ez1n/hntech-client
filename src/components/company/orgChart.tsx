import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateOrgChart, previewOrgChart, updateCompanyData } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function OrgChart() {
  const dispatch = useAppDispatch();

  const orgChartForm = new FormData(); // 조직도 (전송 데이터)

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const orgChart = useAppSelector(state => state.companyModify.orgChart); // 조직도 state (받아온 데이터)
  const orgChartPreview = useAppSelector(state => state.companyModify.orgChartPreview); // 조직도 미리보기 state
  const newData = useAppSelector(state => state.companyModify.newData); // 업로드한 데이터

  // 임시
  const image = '/images/organizationChart.png';

  // 조직도 받아오기
  useEffect(() => {
    dispatch(updateOrgChart({ orgChart: image }));
    dispatch(previewOrgChart({ path: orgChart.updatedServerFilename }));
  }, []);

  // 조직도 사진 업로드 -> 됐는지 확인해야함
  const updateOrgChartImage = (event: any) => {
    dispatch(previewOrgChart({ path: URL.createObjectURL(event.target.files[0]) }));
    dispatch(updateCompanyData({ data: event.target.files[0] }))
  };

  // 조직도 변경 요청
  const putOrgChart = () => {
    orgChartForm.append('file', newData);
    orgChartForm.append('where', 'orgChart');
    api.putOrgChart(orgChartForm)
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
          조직도
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {managerMode &&
          <>
            <label className='imageUploadButton' htmlFor='orgChartInput' onChange={event => updateOrgChartImage(event)}>
              이미지 가져오기
              <input
                type='file'
                accept='image*'
                id='orgChartInput' />
            </label>
            {EditButton('수정', putOrgChart)}
          </>}
      </Spacing>

      {/* 조직도 */}
      <Box sx={{ textAlign: 'center' }}>
        {managerMode ?
          <Container
            sx={{
              border: '2px solid lightgrey',
              borderRadius: 1,
              alignItems: 'center',
              minHeight: 300
            }}>
            <img src={orgChartPreview} alt='조직도' width={'80%'} />
          </Container> :
          <img className='companyImage' src={orgChart.updatedServerFilename} alt='조직도' />
        }
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;