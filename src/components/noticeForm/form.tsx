import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNoticeFile, deleteNoticeFile } from '../../app/reducers/noticeFileSlice';
import {
  Box,
  TextField,
  Typography,
  Stack
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

export default function Form() {
  const dispatch = useAppDispatch();

  const file = useAppSelector(state => state.noticeFile.file); // 파일 state

  // 파일 이름 미리보기
  const selectFile = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addNoticeFile({ item: event.target.files[i].name }))
    }
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
            required={true}
            autoFocus={true}
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
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 2,
          textAlign: 'end'
        }}>
          <Typography sx={{ color: 'darkgrey' }}>작성자 | 관리자</Typography>
        </Box>

        {/* 문의 내용 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
          <TextField
            type='text'
            multiline
            minRows={15}
            required={true}
            placeholder='공지사항을 작성해 주세요'
            inputProps={{
              style: {
                fontSize: 20,
              }
            }}
            sx={{ width: '100%' }}
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
                <Stack direction='row'>
                  <Typography key={index}>{item}</Typography>
                  <ClearRoundedIcon
                    onClick={() => dispatch(deleteNoticeFile({ num: index }))}
                    fontSize='small'
                    sx={{ color: 'lightgrey', cursor: 'pointer', ml: 1 }} />
                </Stack>
              ))}
            </Stack>
          </Box>
          <label className='fileUploadButton' htmlFor='noticeFile' onChange={(event) => selectFile(event)}>
            업로드
            <input type='file' id='noticeFile' multiple style={{ display: 'none' }} />
          </label>
        </Stack>
      </Box>
    </>
  )
};