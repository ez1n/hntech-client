import React, { useState } from 'react';
import '../style.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { archiveApi } from '../../network/archive';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickArchiveModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { getDetailData } from '../../app/reducers/archiveSlice';
import {
  addArchiveFile,
  deleteArchiveFile,
  deleteArchiveFileData,
  updateArchiveFileData,
  resetArchiveState,
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked,
  deleteArchiveOriginFile
} from '../../app/reducers/archiveFormSlice';
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
import ArchiveCategorySelect from '../archiveCategorySelect';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  successModify: () => void,
  errorToast: (message) => void
}

export default function ArchiveModifyForm({ successModify, errorToast }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const archiveData = new FormData(); // 자료실 첨부파일

  const archiveModifyFormState = useAppSelector(state => state.dialog.archiveModifyFormState); // 글쓰기 취소 state
  const archiveModifyContent = useAppSelector(state => state.archiveForm.archiveModifyContent); // 자료실 글쓰기 수정 내용 state
  const archiveId = useAppSelector(state => state.archive.detail.id); // 자료실 글 id
  const fileData = useAppSelector(state => state.archiveForm.archiveFile.data); // 첨부파일 목록 state
  const fileName = useAppSelector(state => state.archiveForm.archiveFile.name); // 첨부파일 이름 목록 state
  const [deleteArchiveId, setDeleteArchiveId] = useState<{ archiveId: number, fileId: number }[]>([]);
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  const validate = () => {
    let isValid = true;
    if (archiveModifyContent.title === null || archiveModifyContent.title === '') {
      setTitleErrorMsg('제목을 입력해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 파일 선택 이벤트
  const selectFile = (event: any) => {
    // 파일 이름 미리보기
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(addArchiveFile({ item: event?.target.files[i].name }));
    };

    // 전송할 파일 데이터
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(updateArchiveFileData({ file: event?.target.files[i] }));
    };
  };

  // 파일 선택 취소
  const deleteFile = (index: number) => {
    // 파일 이름 삭제
    dispatch(deleteArchiveFile({ num: index }));

    // 전송할 파일 데이터 삭제
    dispatch(deleteArchiveFileData({ num: index }));
  };

  // 자료실 글 변경
  const putArchiveForm = (archiveId: number) => {
    fileData.map((item: string) => archiveData.append('files', item));
    archiveData.append('categoryName', archiveModifyContent.categoryName);
    archiveData.append('content', archiveModifyContent.content);
    archiveData.append('notice', archiveModifyContent.notice);
    archiveData.append('title', archiveModifyContent.title);

    deleteArchiveId.map((item: { archiveId: number, fileId: number }) => (
      archiveApi.deleteArchiveFile(item.archiveId, item.fileId)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    ))

    validate() &&
      archiveApi.putUpdateArchive(archiveId, archiveData)
        .then(res => {
          successModify();
          dispatch(getDetailData({ detail: res }));
          navigate(-1);
        })
        .catch(error => errorToast(error.response.data.message))
  };

  // 기존 파일 삭제
  const deleteOriginalFile = (index: number, archiveId: number, fileId: number) => {
    dispatch(deleteArchiveOriginFile({ num: index }));
    setDeleteArchiveId([...deleteArchiveId, { archiveId: archiveId, fileId: fileId }])
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>자료실</Typography>

      <Spacing />

      {/* 공지사항 글쓰기 폼 */}
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
            value={archiveModifyContent.title}
            required={true}
            error={titleErrorMsg ? true : false}
            helperText={titleErrorMsg}
            onChange={event => { dispatch(modifyArchiveTitle({ title: event?.target.value })) }}
            placeholder='제목을 입력해 주세요'
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
        {/* 공지사항 */}
        <Box sx={{
          display: 'flex',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          pl: 1
        }}>
          <ArchiveCategorySelect defaultCategory={archiveModifyContent.categoryName} categoryErrorMsg={undefined} />
          <FormControlLabel
            control={<Checkbox
              defaultChecked={archiveModifyContent.notice === 'true' ? true : false}
              onChange={event => dispatch(modifyArchiveNoticeChecked({ isNotice: event?.target.checked }))}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }} />}
            label='공지사항 표시'
            labelPlacement='start'
            sx={{ color: 'darkgrey' }} />
        </Box>

        {/* 문의 내용 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)' }}>
          <CKEditor
            editor={ClassicEditor}
            data={archiveModifyContent.content}
            config={{
              placeholder: '내용을 입력하세요',
            }}
            onChange={(event: any, editor: { getData: () => any }) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              dispatch(modifyArchiveContent({ content: data }));
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
              {/* 파일이 없는 경우 */}
              {(fileName.length === 0 && archiveModifyContent.files.length === 0) &&
                <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>업로드할 파일</Typography>
              }

              {/* 기존 파일 */}
              {archiveModifyContent.files.map((item, index) => (
                <Stack direction='row' key={item.id}>
                  <Typography>{item.originalFilename}</Typography>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginalFile(index, archiveId, item.id)}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}

              {/* 새로 추가되는 파일 */}
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
          <label
            className='fileUploadButton'
            htmlFor='archiveFile'
            onChange={event => selectFile(event)}>
            업로드
            <input type='file' id='archiveFile' multiple style={{ display: 'none' }} />
          </label>
        </Stack>
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => putArchiveForm(archiveId))}
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