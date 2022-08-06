import React from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

export default function CommentForm() {
  return (
    <Stack direction='column' sx={{ alignItems: 'center' }}>
      <TextField
        multiline
        minRows={3}
        variant={'filled'}
        label={'댓글 쓰기'}
        sx={{ width: '100%' }} />

      <Box sx={{ width: '100%', textAlign: 'end' }}>
        <Button sx={{ fontSize: 16, color: 'green' }}>등록</Button>
      </Box>
    </Stack>
  )
}