import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { archiveDetailGoBack } from '../app/reducers/dialogSlice';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, styled, Typography } from '@mui/material';
import EditButton from './editButton';
import { copyDetailData } from '../app/reducers/archiveSlice';
import CancelModal from './cancelModal';

export default function ArchiveDetail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const archiveDetailState = useAppSelector(state => state.dialog.archiveDetailState); // 게시글 삭제 취소 state
  const detail = useAppSelector(state => state.archive.detail); // 게시글 상세정보

  useEffect(() => {
    dispatch(copyDetailData({ detail: detail })); // 수정 정보 만들기
    // 정보 받아오기 (detail.id 이용)
  }, []);

  // 게시글 삭제
  const deleteArchive = (id: number) => {
    // 삭제 요청
    dispatch(archiveDetailGoBack());
    navigate('/archive');
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography
        variant='h5'
        sx={{
          p: 1,
          width: 'max-content',
          borderBottom: '3px solid #2E7D32',
        }}>
        자료실
      </Typography>

      <Spacing>
        {!managerMode &&
          <Box sx={{ textAlign: 'end' }}>
            {EditButton('수정', () => navigate('/archive-modify'))}
            {EditButton('삭제', () => dispatch(archiveDetailGoBack()))}
          </Box>
        }
      </Spacing>

      <Box sx={{
        borderTop: '3px solid #2E7D32',
        borderBottom: '3px solid #2E7D32',
      }}>
        {/* 제목 */}
        <Box sx={{ borderBottom: '1px solid #3B6C46', p: 2 }}>
          <Typography sx={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {detail.title}
          </Typography>
        </Box>

        {/* 작성일 */}
        <Box
          sx={{
            p: 2,
            color: 'darkgrey',
            borderBottom: '1px solid #3B6C46'
          }}>
          <Typography sx={{ fontSize: 18, textAlign: 'end' }}>작성일 {detail.createDate}</Typography>
        </Box>

        {/* 동영상 */}
        <Box sx={{ p: 3 }}>
          동영상
        </Box>

        {/* 자료 부가 설명 */}
        <Box sx={{ p: 3, minHeight: 200, borderBottom: '1px solid #3B6C46' }}>
          {detail.content.split('\n').map((value, index) => (
            <Typography key={index} sx={{ fontSize: 18 }}>
              {value}
            </Typography>
          ))}
        </Box>

        {/* 첨부파일 */}
        <Stack direction='row' spacing={1} sx={{ p: 2, color: 'darkgrey' }}>
          <Typography>첨부파일</Typography>
          <Typography>|</Typography>
        </Stack>
      </Box>

      {/* 목록 버튼 */}
      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size='small'
          onClick={() => navigate('/archive')}
          sx={{
            color: 'white',
            backgroundColor: '#2E7D32',
            fontWeight: 'bold'
          }}>
          목록
        </Button>
      </Box>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={archiveDetailState}
        title={'게시글 삭제'}
        text1={'삭제된 게시글은 복구할 수 없습니다'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteArchive(detail.id)}
        closeAction={() => dispatch(archiveDetailGoBack())} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;