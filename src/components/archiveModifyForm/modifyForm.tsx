import React from 'react';
import '../style.css';
import axios from 'axios';
import FormData from 'form-data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked
} from '../../app/reducers/archiveSlice';
import ArchiveCategorySelect from '../archiveCategorySelect';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { addArchiveFile, deleteArchiveFile } from '../../app/reducers/archiveFileSlice';

export default function Form() {
  const dispatch = useAppDispatch();

  const fileData = new FormData(); // 첨부파일 데이터
  const file = useAppSelector(state => state.archiveFile.file); // 첨부파일 이름 목록 state
  const archiveModifyContent = useAppSelector(state => state.archive.archiveModifyContent); // 자료실 상세 자료(수정용)

  // 파일 이름 미리보기
  const selectFile = (event: React.FormEvent<HTMLLabelElement>) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addArchiveFile({ item: event.target.files[i].name }))
    }
  };

  // 파일 첨부 (update)
  const addFileData = () => {
    // const filename = image.split('/').pop();
    // fileData.append('file', { uri: image, type: 'multipart/form-data', name: filename });
  }

  // 파일 전송
  const postFileData = async () => {
    await axios.post('', fileData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    })
  }

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
              {file.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>업로드할 파일</Typography>}
              {file.map((item, index) => (
                <Stack direction='row' key={index}>
                  <Typography>{item}</Typography>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteArchiveFile({ num: index }))}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}
            </Stack>
          </Box>
          <label className='fileUploadButton' htmlFor='archiveFile' onChange={(event) => selectFile(event)}>
            업로드
            <input type='file' id='archiveFile' multiple style={{ display: 'none' }} />
          </label>
        </Stack>
      </Box>
    </>
  )
};