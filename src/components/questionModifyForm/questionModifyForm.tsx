import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {questionApi} from '../../network/question';
import {api} from "../../network/network";
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {onLoading} from "../../app/reducers/dialogSlice";
import {changeMode} from '../../app/reducers/adminSlice';
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
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function QuestionModifyForm({successModify, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const detail = useAppSelector(state => state.question.detail); // 문의 정보 (데이터)
  const faqState = useAppSelector(state => state.question.faqState); // FAQ
  const [cancelQuestionModify, setCancelQuestionModify] = useState(false); // 문의사항 변경 취소
  const [deleteQuestionId, setDeleteQuestionId] = useState<{ questionId: number, fileId: number }[]>([]);
  const [questionContent, setQuestionContent] = useState({title: '', content: ''});
  const [file, setFile] = useState<{ file: string, path: string }[]>([]);
  const [originalFile, setOriginalFile] = useState<{
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  }[]>([]);

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목
  const [contentErrorMsg, setContentErrorMsg] = useState(''); // 내용

  const preventReset = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventReset);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventReset);
    };
  }, []);

  useEffect(() => {
    setQuestionContent({title: detail.title, content: detail.content});
    setOriginalFile(detail.files);
  }, [])

  const validate = () => {
    let isValid = true;
    if (!questionContent.title) {
      setTitleErrorMsg('제목을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (!questionContent.content) {
      setContentErrorMsg('문의 내용을 작성해 주세요.');
      isValid = false;
    } else setContentErrorMsg('');
    return isValid;
  };

  const changeValue = (event: any) => {
    const {name, value} = event.target;
    setQuestionContent({...questionContent, [name]: value});
  };

  // 이미지 추가
  const getFile = (event: any) => {
    let newFile = file;
    for (let i = 0; i < event.target.files.length; i++) {
      newFile = newFile.concat({file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])});
    }
    setFile(newFile);
  };

  // 기존 이미지 삭제
  const deleteOriginalFile = (num: number, questionId: number, fileId: number) => {
    const newFile = originalFile.filter((item, index) => index !== num);
    setOriginalFile(newFile);
    setDeleteQuestionId([...deleteQuestionId, {questionId: questionId, fileId: fileId}]);
  };

  // 추가한 이미지 삭제
  const deleteFile = (num: number) => {
    const newFile = file.filter((item, index) => index !== num);
    setFile(newFile);
  };

  // 문의사항 변경 취소 - open
  const openCancelQuestionModify = () => setCancelQuestionModify(cancelQuestionModify => !cancelQuestionModify);

  // 문의사항 변경 취소 - close
  const closeCancelQuestionModify = () => setCancelQuestionModify(false);


  // 문의사항 변경하기
  const putQuestion = (questionId: number) => {
    const questionForm = new FormData();
    questionForm.append('title', questionContent.title);
    questionForm.append('content', questionContent.content);
    file.map((item: { file: string, path: string }) => questionForm.append('files', item.file));

    deleteQuestionId.map((item: { questionId: number, fileId: number }) => (
      questionApi.deleteQuestionFile(item.questionId, item.fileId)
        .then().catch(error => console.log(error))
    ));

    if (managerMode) {
      questionForm.append('FAQ', faqState)
      if (validate()) {
        dispatch(onLoading());
        questionApi.putUpdateFAQ(questionId, questionForm)
          .then(res => {
            successModify();
            dispatch(setDetailData({detail: res}));
            navigate(-1);
          })
          .catch(error => console.log(error))
          .finally(() => dispatch(onLoading()))
      }
    } else {
      if (validate()) {
        dispatch(onLoading());
        questionApi.putQuestion(questionId, questionForm)
          .then(res => {
            successModify();
            dispatch(setDetailData({detail: res}));
            navigate(-1);
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === 401) {
              errorToast('로그인이 필요합니다.');
              localStorage.removeItem("login");
              const isLogin = localStorage.getItem("login");
              dispatch(changeMode({login: isLogin}));
            }
            errorToast(error.response.data.message);
          })
          .finally(() => dispatch(onLoading()))
      }
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>문의사항 수정</Typography>

      <Spacing/>

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
            name={'title'}
            value={questionContent.title}
            required
            onChange={changeValue}
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            placeholder='제목을 입력해 주세요'
            inputProps={{style: {fontSize: 20}}}
            sx={{width: '100%'}}
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
              sx={{mr: 2, width: '15%'}}
            />

            {managerMode &&
              <FormControlLabel
                control={<Checkbox
                  defaultChecked={faqState === 'true'}
                  onChange={event => dispatch(setFaqState({faq: event.target.checked}))}
                  sx={{
                    color: 'darkgrey',
                    '&.Mui-checked': {
                      color: 'green',
                    },
                  }}/>}
                label='FAQ'
                labelPlacement='start'
                sx={{color: 'darkgrey'}}/>
            }

          </Stack>

          <List sx={{mt: 1}}>
            <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>※ 이름은 꼭 실명으로 기재해 주세요.</ListItem>
            <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>※ 확인용 비밀번호는 숫자 4자리를 입력해 주세요. 답변을 확인할 때
              사용됩니다.</ListItem>
          </List>
        </Box>

        {/* 문의 내용 */}
        <Stack spacing={2} p={2}>
          <Box>
            <label
              className='uploadButton'
              htmlFor='inputQuestionPhoto'
              onChange={getFile}
              onClick={(e: any) => e.target.value = null}>
              사진 첨부
              <input className='questionInput' id='inputQuestionPhoto' type='file' accept={'image/*'} multiple/>
            </label>
          </Box>

          {/* 첨부파일 */}
          {file.length + originalFile.length > 0 &&
            <Container
              sx={{
                border: '1.8px solid lightgrey',
                borderRadius: 1,
                mb: 2,
                height: 300,
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'auto',
                alignItems: 'center'
              }}>
              {/* 기존 이미지 */}
              {originalFile.map((item, index) => (
                <Box key={item.id} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteOriginalFile(index, detail.id, item.id)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={`${api.baseUrl()}/files/question/${item.serverFilename}`} alt={item.originalFilename}
                       width='100%'/>
                </Box>
              ))}

              {/* 새로 추가한 이미지 */}
              {file.map((item, index) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteFile(index)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={item.path} alt='첨부 이미지' width='100%'/>
                </Box>
              ))}
            </Container>
          }

          <TextField
            type='text'
            name='content'
            value={questionContent.content}
            multiline
            minRows={15}
            required
            onChange={changeValue}
            placeholder='문의사항을 작성해 주세요'
            error={!!contentErrorMsg}
            helperText={contentErrorMsg}
            inputProps={{style: {fontSize: 20}}}
            sx={{width: '100%'}}
          />
        </Stack>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='변경완료' onClick={() => putQuestion(detail.id)}/>
        <EditButton name='변경취소' onClick={openCancelQuestionModify}/>
      </Spacing>

      {/* 변경취소 Dialog */}
      <CancelModal
        openState={cancelQuestionModify}
        title={'변경 취소'}
        text1={'변경중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          navigate(-1);
          closeCancelQuestionModify();
        }}
        closeAction={closeCancelQuestionModify}/>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;