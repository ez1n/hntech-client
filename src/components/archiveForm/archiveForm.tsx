import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { archiveFormGoBack } from '../../app/reducers/dialogSlice';
import { resetArchiveState } from '../../app/reducers/archiveSlice';
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
import { api } from '../../network/network';
import CancelModal from '../cancelModal';

export default function ArchiveForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData();

  const archiveFormState = useAppSelector(state => state.dialog.archiveFormState); // 글쓰기 취소 state
  const archiveContent = useAppSelector(state => state.archive.archiveContent); // 자료실 글쓰기 내용 state
  const fileData = useAppSelector(state => state.archiveFile.file.data); // 첨부파일 이름 목록 state

  // 자료실 글쓰기
  const postArchiveForm = () => {
    fileData.map(item => archiveData.append('file', item));
    api.postUploadAllFiles(archiveData)
      .then(res => {
        console.log('postUploadAllFiles', res);
        api.postCreateArchive({
          categoryName: archiveContent.categoryName,
          content: archiveContent.content,
          files: res.files,
          notice: archiveContent.notice,
          title: archiveContent.title,
        })
          .then(res => {
            console.log('postCreateArchive', res);
            dispatch(resetArchiveState());
            navigate('/archive');
          })
          .catch(error => console.log('postCreateArchive', error))
      })
      .catch(error => console.log('postArchiveForm', error))
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>자료실</Typography>

      <Spacing />

      {/* 공지사항 글쓰기 폼 */}
      <Form />

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', postArchiveForm)}
        {EditButton('취소', () => dispatch(archiveFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={archiveFormState}
        title={'작성취소'}
        text1={'작성중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          navigate(-1);
          dispatch(archiveFormGoBack());
        }}
        closeAction={() => dispatch(archiveFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;