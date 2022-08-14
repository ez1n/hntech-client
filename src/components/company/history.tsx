import React, { useEffect } from 'react';
import { api } from '../../network/network';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { previewHistory, updateHistory } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';

export default function History() {
  const dispatch = useAppDispatch();

  const historyForm = new FormData(); // 회사 연혁 (전송 데이터)

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const history = useAppSelector(state => state.companyModify.history); // 회사 연혁 state (받아온 데이터)
  const historyPreview = useAppSelector(state => state.companyModify.historyPreview); // 회사 연혁 미리보기 state

  // 임시
  const image = '/images/organizationChart.png';

  // 조직도 받아오기
  useEffect(() => {
    dispatch(updateHistory({ history: image }));
    dispatch(previewHistory({ path: history.updatedServerFilename }));
  }, []);

  // 회사 연혁 사진 업로드 -> 됐는지 확인해야함
  const updateHistoryImage = (event: any) => {
    dispatch(previewHistory({ path: URL.createObjectURL(event.target.files[0]) }));
    historyForm.append('file', event?.target.files[0]);
    historyForm.append('where', 'orgChart');
  };

  // 조직도 변경 요청
  const putHistory = () => {
    api.putHistory(historyForm)
      .then(res => console.log(res));
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
          회사 연혁
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {managerMode &&
          <>
            <label className='imageUploadButton' htmlFor='historyInput'>
              이미지 가져오기
              <input
                type='file'
                accept='image*'
                id='historyInput'
                onChange={event => updateHistoryImage(event)} />
            </label>
            {EditButton('수정', putHistory)}
          </>}
      </Spacing>

      {/* 회사 연혁 => 수정할때 스크롤로 보이게 할지 아니면 그냥 높이 자체가 늘어나게 할지? */}
      <Box sx={{ textAlign: 'center' }}>
        {managerMode ?
          <Container
            sx={{
              border: '2px solid lightgrey',
              borderRadius: 1,
              alignItems: 'center',
              minHeight: 500
            }}>
            <img src={historyPreview} alt='조직도' width={'80%'} />
          </Container> :
          <img className='companyImage' src={history.updatedServerFilename} alt='조직도' />
        }
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;
