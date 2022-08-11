import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickNoticeFormGoBack } from '../../app/reducers/dialogSlice';
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
import Form from './form';

export default function NoticeForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const noticeFormState = useAppSelector(state => state.dialog.noticeFormState); // 글쓰기 취소 state
  const noticeContent = useAppSelector(state => state.formContent.noticeContent); // 공지사항 글쓰기 내용 state


  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>공지사항</Typography>

      <Spacing />

      {/* 공지사항 글쓰기 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', () => {
          console.log(noticeContent); // 보내면됨
          navigate('/question');
        })}
        {EditButton('취소', () => dispatch(clickNoticeFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <Dialog
        open={noticeFormState}
        onClose={() => dispatch(clickNoticeFormGoBack())}>
        <DialogTitle>
          {'작성 취소'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            작성중인 내용이 사라집니다.
          </DialogContentText>
          <DialogContentText>
            취소하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            dispatch(clickNoticeFormGoBack());
            navigate('/question');
          }}
          >
            네
          </Button>
          <Button onClick={() => dispatch(clickNoticeFormGoBack())}>아니오</Button>
        </DialogActions>
      </Dialog>
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;