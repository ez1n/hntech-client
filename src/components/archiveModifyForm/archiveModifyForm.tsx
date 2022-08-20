import React from 'react';
import { fileApi } from '../../network/file';
import { api } from '../../network/network';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickArchiveModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { getDetailData, resetArchiveState } from '../../app/reducers/archiveSlice';
import { resetArchiveFileData } from '../../app/reducers/archiveFileSlice';
import { Container, styled, Typography } from '@mui/material';
import EditButton from '../editButton';
import ModifyForm from './modifyForm';
import CancelModal from '../cancelModal';

export default function ArchiveModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData(); // 자료실 첨부파일 => 이게 서버에서 파일을 어떻게 넘겨주는지 보고 수정

  const archiveModifyFormState = useAppSelector(state => state.dialog.archiveModifyFormState); // 글쓰기 취소 state
  const archiveModifyContent = useAppSelector(state => state.archive.archiveModifyContent); // 자료실 글쓰기 수정 내용 state
  const fileData = useAppSelector(state => state.archiveFile.file.data); // 첨부파일 이름 목록 state

  let serverFileNameList: string[] = [];

  // 자료실 글 변경
  const putArchiveForm = (archiveId: number) => {
    fileData.map(item => archiveData.append('files', item));
    // 기존 파일 리스트 생성
    archiveModifyContent.files.map(item => (
      serverFileNameList.push(item.serverFilename)
    ))
    console.log(serverFileNameList);

    fileApi.postUploadAllFiles(archiveData)
      .then(res => {
        // serverFilename 리스트에 추가
        res.uploadedFiles.map((item: {
          id: number,
          originalFilename: string,
          serverFilename: string,
          savedPath: string
        }) => (serverFileNameList.push(item.serverFilename)));

        api.putUpdateArchive(archiveId, {
          categoryName: archiveModifyContent.categoryName,
          content: archiveModifyContent.content,
          files: serverFileNameList,
          notice: archiveModifyContent.notice,
          title: archiveModifyContent.title,
        })
          .then(res => {
            dispatch(getDetailData(res));
            dispatch(resetArchiveFileData());
            navigate('/archive');
            serverFileNameList = [];
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
          dispatch(resetArchiveState());
          dispatch(resetArchiveFileData());
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