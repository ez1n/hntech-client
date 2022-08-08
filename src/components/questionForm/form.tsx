import React from 'react';
import {
  Box,
  List,
  ListItem,
  TextField
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
          pb: 0
        }}>
          <TextField
            type='text'
            required={true}
            placeholder='이름'
            size='small'
            inputProps={{
              style: {
                fontSize: 20,
              }
            }}
            sx={{ mr: 2, width: '15%' }}
          />
          <TextField
            type='password'
            required={true}
            placeholder='비밀번호'
            size='small'
            inputProps={{
              style: {
                fontSize: 20
              },
              maxLength: 4
            }}
            sx={{ width: '15%' }}
          />

          <List sx={{ mt: 1 }}>
            <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 이름은 꼭 실명으로 기재해 주세요.</ListItem>
            <ListItem sx={{ userSelect: 'none', color: 'darkgrey' }}>※ 확인용 비밀번호는 숫자 4자리를 입력해 주세요. 답변을 확인할 때 사용됩니다.</ListItem>
          </List>
        </Box>

        {/* 문의 내용 */}
        <Box p={2}>
          <TextField
            type='text'
            multiline
            minRows={15}
            required={true}
            placeholder='문의사항을 작성해 주세요'
            inputProps={{
              style: {
                fontSize: 20,
              }
            }}
            sx={{ width: '100%' }}
          />
        </Box>
      </Box>
    </>
  )
};