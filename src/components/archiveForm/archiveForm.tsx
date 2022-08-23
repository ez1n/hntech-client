import React from 'react';
import '../style.css';
import { fileApi } from '../../network/file';
import { useNavigate } from 'react-router-dom';
import { archiveApi } from '../../network/archive';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { archiveFormGoBack } from '../../app/reducers/dialogSlice';
import {
  updateArchiveTitle,
  updateArchiveContent,
  updateArchiveNoticeChecked,
  resetArchiveState
} from '../../app/reducers/archiveSlice';
import {
  addArchiveFile,
  deleteArchiveFile,
  updateArchiveFileData,
  deleteArchiveFileData,
  resetArchiveFileData,
  resetArchiveFileName
} from '../../app/reducers/archiveFileSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ArchiveCategorySelect from '../archiveCategorySelect';

export default function ArchiveForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData(); // 자료실 첨부파일

  const archiveFormState = useAppSelector(state => state.dialog.archiveFormState); // 글쓰기 취소 state
  const archiveContent = useAppSelector(state => state.archive.archiveContent); // 자료실 글쓰기 내용 state
  const fileData = useAppSelector(state => state.archiveFile.file.data); // 첨부파일 이름 목록 state
  const fileName = useAppSelector(state => state.archiveFile.file.name); // 첨부파일 이름 목록 state

  // 파일 선택 이벤트
  const selectFile = (event: any) => {
    // 파일 이름 미리보기
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addArchiveFile({ item: event.target.files[i].name }))
    };

    // 전송할 파일 데이터
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(updateArchiveFileData({ file: event.target.files[i] }))
    };
  };

  // 파일 선택 취소
  const deleteFile = (index: number) => {
    dispatch(deleteArchiveFile({ num: index }));
    dispatch(deleteArchiveFileData({ num: index }));
  };

  // 자료실 글쓰기
  const postArchiveForm = () => {
    fileData.map(item => archiveData.append('files', item));

    // 첨부파일 보내기
    fileApi.postUploadAllFiles(archiveData, 'archive')
      .then(res => { // 파일이 존재하는 경우
        console.log('postUploadAllFiles', res.uploadedFiles);
        // 게시글 내용 보내기
        archiveApi.postCreateArchive({
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
            dispatch(resetArchiveFileName());
            navigate('/archive');
          })
          .catch(error => console.log('postCreateArchive', error.config.data))
      })
      .catch(error => { // 파일이 존재하지 않는 경우
        if (error.response.data.message.includes('specified as non-null is null')) {
          // 게시글 내용 보내기
          archiveApi.postCreateArchive({
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
      <Box sx={{
        borderTop: '3px solid #2E7D32',
        borderBottom: '3px solid #2E7D32',
      }}>

        {/* 제목 */}
        <Box sx={{
          textAlign: 'center',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 2
        }}>
          <TextField
            type='text'
            required={true}
            autoFocus={true}
            placeholder='제목을 입력해 주세요'
            onChange={event => dispatch(updateArchiveTitle({ title: event.target.value }))}
            inputProps={{
              style: {
                fontSize: 20
              }
            }}
            sx={{
              width: '100%'
            }}
          />
        </Box>

        {/* 정보 */}
        <Box sx={{
          display: 'flex',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          pl: 1
        }}>

          {/* 카테고리 선택 */}
          <ArchiveCategorySelect defaultCategory='전체' />

          {/* 공지사항 표시 */}
          <FormControlLabel
            control={<Checkbox
              onChange={event => dispatch(updateArchiveNoticeChecked({ isNotice: event.target.checked }))}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }} />}
            label='공지사항'
            labelPlacement='start'
            sx={{ color: 'darkgrey' }} />
        </Box>

        {/* 문의 내용 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              allowedContent: true,
              placeholder: '내용을 입력하세요',
            }}
            onChange={(event: any, editor: { getData: () => any; }) => {
              const data = editor.getData();
              dispatch(updateArchiveContent({ content: data }));
            }}
          />
        </Box>

        {/* 첨부파일 */}
        <Stack direction='row' spacing={2} sx={{ p: 2 }}>
          <Box sx={{
            pl: 2,
            width: '100%',
            border: '1.8px solid lightgrey',
            borderRadius: 1,
            color: 'darkgrey',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Stack>
              {fileName.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>업로드할 파일</Typography>}
              {fileName.map((item, index) => (
                <Stack direction='row' key={index}>
                  <Typography>{item}</Typography>
                  <ClearRoundedIcon
                    onClick={() => deleteFile(index)}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}
            </Stack>
          </Box>
          <label className='fileUploadButton' htmlFor='archiveFile' onChange={event => {
            selectFile(event);
          }}>
            업로드
            <input type='file' id='archiveFile' multiple style={{ display: 'none' }} />
          </label>
        </Stack>
      </Box>

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