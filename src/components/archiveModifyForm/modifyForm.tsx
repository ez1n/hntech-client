import React from 'react';
import '../style.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked,
  deleteArchiveOriginFile
} from '../../app/reducers/archiveSlice';
import ArchiveCategorySelect from '../archiveCategorySelect';
import {
  addArchiveFile,
  deleteArchiveFile,
  deleteArchiveFileData,
  updateArchiveFileData
} from '../../app/reducers/archiveFileSlice';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function Form() {
  const dispatch = useAppDispatch();

  const fileName = useAppSelector(state => state.archiveFile.file.name); // 첨부파일 이름 목록 state
  const archiveModifyContent = useAppSelector(state => state.archive.archiveModifyContent); // 자료실 상세 자료(수정용)

  // 파일 선택 이벤트
  const selectFile = (event: React.FormEvent<HTMLLabelElement>) => {
    // 파일 이름 미리보기
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(addArchiveFile({ item: event?.target.files[i].name }))
    };

    // 전송할 파일 데이터
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(updateArchiveFileData({ file: event?.target.files[i] }))
    };
  };

  // 파일 선택 취소
  const deleteFile = (index: number) => {
    dispatch(deleteArchiveFile({ num: index }));
    dispatch(deleteArchiveFileData({ num: index }))
  };

  return (
    <>
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
            onChange={event => dispatch(modifyArchiveTitle({ title: event?.target.value }))}
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
          <ArchiveCategorySelect defaultCategory={archiveModifyContent.categoryName} />
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
                    onClick={() => dispatch(deleteArchiveOriginFile({ num: index }))}
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
    </>
  )
};