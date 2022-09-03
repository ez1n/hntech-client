import React, { useEffect } from 'react';
import { adminApi } from '../../network/admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getHistoryImage, updateHistory } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import { Box, Container, Typography } from '@mui/material';
import EditButton from '../editButton';
import { api } from '../../network/network';

export default function History() {
  const dispatch = useAppDispatch();

  const historyForm = new FormData(); // 회사 연혁 (전송 데이터)

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const history = useAppSelector(state => state.companyModify.companyImage.historyImage); // 회사 연혁 state (받아온 데이터)

  // 회사 연혁 받아오기
  useEffect(() => {
    adminApi.getHistory()
      .then(res => dispatch(getHistoryImage({ historyImage: res })))
      .catch(error => console.log(error))
  }, []);

  // 회사 연혁 사진 업로드
  const updateHistoryImage = (event: any) => {
    dispatch(updateHistory({ file: event.target.files[0], path: URL.createObjectURL(event.target.files[0]) }))
  };

  // 회사연혁 변경 요청
  const postHistory = () => {
    historyForm.append('file', history.file);
    historyForm.append('where', 'companyHistory');
    adminApi.postHistory(historyForm)
      .then(res => dispatch(getHistoryImage({ historyImage: res })))
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
                onChange={updateHistoryImage} />
            </label>
            {EditButton('수정', postHistory)}
          </>}
      </Spacing>

      {/* 회사 연혁 */}
      <Box sx={{ textAlign: 'center' }}>
        {managerMode ?
          <Container
            sx={{
              border: '2px solid lightgrey',
              borderRadius: 1,
              alignItems: 'center',
              minHeight: 500,
              overflow: 'scroll'
            }}>
            <img src={history.path === '' ? `${api.baseUrl()}/files/admin/${history.serverFilename}` : history.path} alt='회사 연혁' width={'80%'} />
          </Container> :
          <img className='companyImage' src={`${api.baseUrl()}/files/admin/${history.serverFilename}`} alt='회사 연혁' />
        }
      </Box>
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;
