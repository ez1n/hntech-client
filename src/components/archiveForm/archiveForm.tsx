import React from 'react';
import { fileApi } from '../../network/file';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { archiveFormGoBack } from '../../app/reducers/dialogSlice';
import { resetArchiveState } from '../../app/reducers/archiveSlice';
import { resetArchiveFileData } from '../../app/reducers/archiveFileSlice';
import { Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import Form from './form';
import CancelModal from '../cancelModal';

export default function ArchiveForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData(); // 자료실 첨부파일

  const archiveFormState = useAppSelector(state => state.dialog.archiveFormState); // 글쓰기 취소 state
  const archiveContent = useAppSelector(state => state.archive.archiveContent); // 자료실 글쓰기 내용 state
  const fileData = useAppSelector(state => state.archiveFile.file.data); // 첨부파일 이름 목록 state

  // 자료실 글쓰기
  const postArchiveForm = () => {
    fileData.map(item => archiveData.append('files', item));

    // 첨부파일 보내기
    fileApi.postUploadAllFiles(archiveData)
      .then(res => { // 파일이 존재하는 경우
        console.log('postUploadAllFiles', res.uploadedFiles);
        // 게시글 내용 보내기
        api.postCreateArchive({
          categoryName: archiveContent.categoryName,
          content: archiveContent.content,
          files: res.uploadedFiles.map((item: {
            id: number,
            originalFilename: string,
            serverFilename: string,
            savedPath: string
          }) => {
            return item.serverFilename
          }),
          notice: archiveContent.notice,
          title: archiveContent.title,
        })
          .then(res => {
            console.log('postCreateArchive', res);
            dispatch(resetArchiveState());
            dispatch(resetArchiveFileData());
            navigate('/archive');
          })
          .catch(error => console.log('postCreateArchive', error.config.data))
      })
      .catch(error => { // 파일이 존재하지 않는 경우
        if (error.response.data.message.includes('specified as non-null is null')) {
          // 게시글 내용 보내기
          api.postCreateArchive({
            categoryName: archiveContent.categoryName,
            content: archiveContent.content,
            files: [],
            notice: archiveContent.notice,
            title: archiveContent.title,
          })
            .then(res => {
              dispatch(resetArchiveState());
              dispatch(resetArchiveFileData());
              navigate('/archive');
            })
            .catch(error => console.log('postCreateArchive', error))
        } else { // 첨부파일 보내기 오류
          console.log('postUploadAllFiles', error);
        }
      })
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>자료실</Typography>

      <Spacing />

      {/* 자료실 글쓰기 폼 */}
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
          navigate('/archive');
          dispatch(archiveFormGoBack());
        }}
        closeAction={() => dispatch(archiveFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;