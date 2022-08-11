import React from 'react';
import '../style.css';
import axios from 'axios';
import FormData from 'form-data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateArchiveTitle, updateArchiveContent, updateArchiveNoticeChecked } from '../../app/reducers/formContentSlice';
import CategorySelect from '../categorySelect';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { addArchiveFile, deleteArchiveFile } from '../../app/reducers/archiveFileSlide';

export default function Form() {
  const dispatch = useAppDispatch();

  const fileData = new FormData(); // 첨부파일 데이터
  const file = useAppSelector(state => state.archiveFile.file); // 첨부파일 이름 목록 state

  // 파일 이름 미리보기
  const selectFile = (event: any) => {
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
          <CategorySelect />
          <FormControlLabel
            control={<Checkbox sx={{
              color: 'darkgrey',
              '&.Mui-checked': {
                color: 'green',
              },
            }} />}
            onChange={event => dispatch(updateArchiveNoticeChecked({ isNotice: event.target?.checked }))}
            label='공지사항 표시'
            labelPlacement='start'
            sx={{ color: 'darkgrey' }} />
        </Box>

        {/* 문의 내용 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: '내용을 입력하세요',
            }}
            onReady={(editor: any) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event: any, editor: { getData: () => any; }) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              dispatch(updateArchiveContent({ content: data }));
            }}
            onBlur={(editor: any) => {
              console.log('Blur.', editor);
            }}
            onFocus={(editor: any) => {
              console.log('Focus.', editor);
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
          <label className='fileUploadButton' htmlFor='archiveFile' onChange={(event) => {
            selectFile(event);
          }}>
            업로드
            <input type='file' id='archiveFile' multiple style={{ display: 'none' }} />
          </label>
        </Stack>
      </Box>
    </>
  )
};