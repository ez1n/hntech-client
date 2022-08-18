import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickArchiveModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { getDetailData, resetArchiveState } from '../../app/reducers/archiveSlice';
import {
  Container,
  styled,
  Typography
} from '@mui/material';
import EditButton from '../editButton';
import ModifyForm from './modifyForm';
import { api } from '../../network/network';
import CancelModal from '../cancelModal';

export default function ArchiveModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData(); // 자료실 첨부파일 => 이게 서버에서 파일을 어떻게 넘겨주는지 보고 수정

  const archiveModifyFormState = useAppSelector(state => state.dialog.archiveModifyFormState); // 글쓰기 취소 state
  const archiveContent = useAppSelector(state => state.archive.archiveContent); // 자료실 글쓰기 내용 state
  const archiveModifyContent = useAppSelector(state => state.archive.archiveModifyContent); // 자료실 글쓰기 수정 내용 state

  const putArchiveForm = (archiveId: number) => {
    api.postUploadAllFiles(archiveData)
      .then(res => {
        api.putUpdateArchive(archiveId, {
          categoryName: archiveModifyContent.categoryName,
          content: archiveModifyContent.content,
          files: res.files,
          notice: archiveModifyContent.notice,
          title: archiveModifyContent.title,
        })
          .then(res => {
            dispatch(getDetailData(res));
            console.log(archiveContent); //보내기
            alert('변경되었습니다.');
            navigate('/archive');
          })
          .catch(error => console.log(error))
      })
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
      <CancelModal
        openState={archiveModifyFormState}
        title={'변경 취소'}
        text1={'변경중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          resetArchiveState();
          dispatch(clickArchiveModifyFormGoBack());
          navigate(-1);
        }}
        closeAction={() => dispatch(clickArchiveModifyFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;