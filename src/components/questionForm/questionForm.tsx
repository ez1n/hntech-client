import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { questionApi } from '../../network/question';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickQuestionFormGoBack } from '../../app/reducers/dialogSlice';
import {
  updateQuestionTitle,
  updateQuestionName,
  updateQuestionPassword,
  updateQuestionContent,
  resetQuestionContent
} from '../../app/reducers/questionFormSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  List,
  ListItem,
  TextField
} from '@mui/material';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function QuestionForm({ success, errorToast }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const questionFormState = useAppSelector(state => state.dialog.questionFormState); // 글쓰기 취소 state
  const questionContent = useAppSelector(state => state.questionForm.questionContent); // 문의사항 폼 정보 state
  const createQuestionForm = useAppSelector(state => state.questionForm.questionContent); // 문의사항 글 state
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  useEffect(() => {
    dispatch(resetQuestionContent());
  }, []);

  const validate = () => {
    let isValid = true;
    if (questionContent.writer === '') {
      setNameErrorMsg('이름을 입력해 주세요.');
      isValid = false;
    } else setNameErrorMsg('');
    if (questionContent.password === '' || questionContent.password.length < 4) {
      setPasswordErrorMsg('비밀번호 4자리를 입력해 주세요.');
      isValid = false;
    } else setPasswordErrorMsg('');
    if (questionContent.title === '') {
      setTitleErrorMsg('제목을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 문의사항 작성하기
  const postCreateQuestion = () => {
    validate() &&
      questionApi.postCreateQuestion(questionContent)
        .then(res => {
          success();
          navigate('/question');
        })
        .catch(error => errorToast(error.response.data.message))
  };

  // 비밀번호 숫자 제한
  const inputNumber = (event: any) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) { event.preventDefault() };
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>문의하기</Typography>

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
            required={true}
            autoFocus={true}
            onChange={event => dispatch(updateQuestionTitle({ title: event?.target.value }))}
            placeholder='제목을 입력해 주세요'
            error={titleErrorMsg ? true : false}
            helperText={titleErrorMsg}
            inputProps={{ style: { fontSize: 20 } }}
            sx={{ width: '100%' }}
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
            onChange={event => dispatch(updateQuestionName({ writer: event.target.value }))}
            size='small'
            error={nameErrorMsg ? true : false}
            helperText={nameErrorMsg}
            inputProps={{
              style: { fontSize: 20 }
            }}
            sx={{ mr: 2, width: '15%' }}
          />
          <TextField
            type='password'
            required={true}
            placeholder='비밀번호'
            error={passwordErrorMsg ? true : false}
            helperText={passwordErrorMsg}
            onKeyDown={inputNumber}
            onChange={event => dispatch(updateQuestionPassword({ password: event.target.value }))}
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
            onChange={event => dispatch(updateQuestionContent({ content: event.target.value }))}
            placeholder='문의사항을 작성해 주세요'
            inputProps={{ style: { fontSize: 20 } }}
            sx={{ width: '100%' }}
          />
        </Box>
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        <EditButton name='작성완료' onClick={postCreateQuestion} />
        <EditButton name='취소' onClick={() => dispatch(clickQuestionFormGoBack())} />
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={questionFormState}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          navigate(-1);
          dispatch(clickQuestionFormGoBack());
        }}
        closeAction={() => dispatch(clickQuestionFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;