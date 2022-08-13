import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickArchiveModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { copyDetailData, getDetailData, resetArchiveState } from '../../app/reducers/archiveSlice';
import {
  Container,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import ModifyForm from './modifyForm';

export default function ArchiveModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveModifyFormState = useAppSelector(state => state.dialog.archiveModifyFormState); // 글쓰기 취소 state
  const archiveContent = useAppSelector(state => state.archive.archiveContent); // 자료실 글쓰기 내용 state
  const detail = useAppSelector(state => state.archive.detail); // 자료실 상세 자료

  const putArchiveForm = () => {
    console.log(archiveContent); //보내기
    alert('변경되었습니다.');
    navigate('/archive');
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>자료실</Typography>

      <Spacing />

      {/* 공지사항 글쓰기 폼 */}
      <ModifyForm />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', putArchiveForm)}
        {EditButton('취소', () => dispatch(clickArchiveModifyFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={archiveModifyFormState}
        onClose={() => dispatch(clickArchiveModifyFormGoBack())}>
        <DialogTitle>
          변경 취소
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            변경중인 내용이 사라집니다.
          </DialogContentText>
          <DialogContentText>
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            resetArchiveState();
            dispatch(clickArchiveModifyFormGoBack());
            navigate(-1);
          }}>네</Button>
          <Button onClick={() => dispatch(clickArchiveModifyFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;