import React from 'react';
import { questionApi } from '../../network/question';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickQuestionModifyFormGoBack } from '../../app/reducers/dialogSlice';
import { modifyQuestionTitle, modifyQuestionContent } from '../../app/reducers/questionFormSlice';
import {
  setFaqState,
  setDetailData
} from '../../app/reducers/questionSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Stack,
  TextField
} from '@mui/material';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

export default function QuestionModifyForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionModifyFormState = useAppSelector(state => state.dialog.questionModifyFormState); // 글쓰기 취소 state
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)
  const currentQuestion = useAppSelector(state => state.questionForm.currentQuestion); // 현재 문의사항 정보 (수정용)
  const faqState = useAppSelector(state => state.question.faqState); // FAQ state

  // 문의사항 변경하기
  const putQuestion = (questionId: number, currentQuestion: { title: string, content: string }) => {
    if (faqState) {
      questionApi.putUpdateFAQ(questionId, { title: currentQuestion.title, content: currentQuestion.content, faq: faqState })
        .then(res => {
          navigate('/question-detail');
        })
    } else {
      questionApi.putQuestion(questionId, currentQuestion)
        .then(res => {
          dispatch(setDetailData(res));
          navigate('/question-detail');
        })
        .catch(error => console.log(error))
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>문의사항 수정</Typography>

      <Spacing />

      {/* 문의 글쓰기 폼 */}
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
          <Stack direction='row'>
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

            <FormControlLabel
              control={<Checkbox
                defaultChecked={false}
                onChange={event => dispatch(setFaqState({ faq: event.target.checked }))}
                sx={{
                  color: 'darkgrey',
                  '&.Mui-checked': {
                    color: 'green',
                  },
                }} />}
              label='FAQ'
              labelPlacement='start'
              sx={{ color: 'darkgrey' }} />
          </Stack>

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

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('변경완료', () => putQuestion(detail.id, currentQuestion))}
        {EditButton('변경취소', () => dispatch(clickQuestionModifyFormGoBack()))}
      </Spacing>

      {/* 변경취소 Dialog */}
      <CancelModal
        openState={questionModifyFormState}
        title={'변경 취소'}
        text1={'변경중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          navigate('/question-detail');
          dispatch(clickQuestionModifyFormGoBack());
        }}
        closeAction={() => dispatch(clickQuestionModifyFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;