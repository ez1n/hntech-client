import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  modifyQuestionTitle,
  modifyQuestionContent
} from '../../app/reducers/questionSlice';
import {
  Box,
  List,
  ListItem,
  TextField
} from '@mui/material';

export default function ModifyForm() {
  const dispatch = useAppDispatch();

  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)
  const currentQuestion = useAppSelector(state => state.question.currentQuestion); // 현재 문의사항 정보

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
            value={currentQuestion.title}
            required={true}
            onChange={event => dispatch(modifyQuestionTitle({ title: event?.target.value }))}
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
            disabled
            value={detail.writer}
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
            disabled
            value={detail.password}
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
            value={currentQuestion.content}
            multiline
            minRows={15}
            required={true}
            onChange={event => dispatch(modifyQuestionContent({ content: event?.target.value }))}
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