import React from 'react';
import {
  Box,
  TextField,
  Typography
} from '@mui/material';

export default function Form() {
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
        <Box sx={{ p: 2 }}>
          <TextField
            type="file"
            inputProps={{
              multiple: true
            }}
            sx={{ width: '100%' }}
          />
        </Box>
      </Box>
    </>
  )
};