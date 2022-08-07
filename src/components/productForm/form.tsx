import React, { useRef } from 'react';
import {
  Box,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import CategorySelect from '../categorySelect';
import EditButton from '../editButton';

export default function Form() {
  const photoInputRef = useRef();
  const gradeInputRef = useRef();

  const selectInput = (item: any) => {
    item.current?.click();
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
            placeholder='제품명'
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

        {/* 사진 추가, 카테고리 선택 */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          pr: 1,
          pl: 1
        }}>
          <Box>
            {/* 숨김 input */}
            <TextField
              inputRef={photoInputRef}
              type='file'
              inputProps={{ multiple: true, accept: 'image/*' }}
              onChange={() => console.log('사진 선택')}
              sx={{ display: 'none' }}
            />
            <TextField
              inputRef={gradeInputRef}
              type='file'
              inputProps={{ multiple: true, accept: 'image/*' }}
              onChange={() => console.log('규격 선택')}
              sx={{ display: 'none' }}
            />

            {EditButton('제품 사진 추가', () => selectInput(photoInputRef))}
            {EditButton('규격 사진 추가', () => selectInput(gradeInputRef))}
          </Box>
          <CategorySelect />
        </Box>

        {/* 제품 사진 */}
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
          <Box sx={{ border: '1.8px solid darkgrey', borderRadius: 1, mb: 2, height: 150 }}>
            제품 사진
          </Box>

          <TextField
            placeholder='제품 설명'
            multiline
            minRows={3}
            inputProps={{
              style: {
                fontSize: 18
              }
            }}
            sx={{ width: '100%', mb: 2 }}
          />

          <Box sx={{ border: '1.8px solid darkgrey', borderRadius: 1, mb: 2, height: 150 }}>
            규격 사진
          </Box>

          <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
            <TextField
              size='small'
              placeholder='파일 이름'
              inputProps={{
                style: {
                  fontSize: 18
                }
              }} />
            <TextField
              inputRef={photoInputRef}
              type='file'
              inputProps={{ accept: '.pdf, .docx, .hwp, .hwpx' }}
              onChange={() => console.log('파일 선택')}
              sx={{ display: 'none' }}
            />
            <Typography sx={{ width: '100%', border: '1.8px solid darkgrey', borderRadius: 1 }}>업로드한 파일</Typography>
          </Stack>

          <Stack direction='row' spacing={1} sx={{ mb: 1 }}>
            <TextField
              size='small'
              placeholder='파일 이름'
              inputProps={{
                style: {
                  fontSize: 18
                }
              }} />
            <TextField
              inputRef={photoInputRef}
              type='file'
              inputProps={{ accept: '.pdf, .docx, .hwp, .hwpx' }}
              onChange={() => console.log('파일 선택')}
              sx={{ display: 'none' }}
            />
            <Typography sx={{ width: '100%', border: '1.8px solid darkgrey', borderRadius: 1 }}>업로드한 파일</Typography>
          </Stack>

        </Box>
      </Box>
    </>
  )
}