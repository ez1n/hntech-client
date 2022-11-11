import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {questionApi} from '../../network/question';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {changeMode} from '../../app/reducers/adminSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  List,
  ListItem,
  TextField,
  Stack
} from '@mui/material';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {onLoading} from "../../app/reducers/dialogSlice";

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function QuestionForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const questionFile = useAppSelector(state => state.questionForm.questionFile);
  const [deleteQuestionForm, setDeleteQuestionForm] = useState(false); // 글쓰기 취소
  const [questionContent, setQuestionContent] = useState({title: '', writer: '', password: '', content: ''});
  const [file, setFile] = useState<{ file: string, path: string }[]>([]);
  const {title, writer, password, content} = questionContent;

  // error message
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');
  const [contentErrorMsg, setContentErrorMsg] = useState('');

  const validate = () => {
    let isValid = true;
    if (writer === '') {
      setNameErrorMsg('이름을 입력해 주세요.');
      isValid = false;
    } else setNameErrorMsg('');
    if (password === '' || password.length < 4) {
      setPasswordErrorMsg('비밀번호 4자리를 입력해 주세요.');
      isValid = false;
    } else setPasswordErrorMsg('');
    if (title === '') {
      setTitleErrorMsg('제목을 작성해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (!content) {
      setContentErrorMsg('문의 내용을 입력해 주세요.')
      isValid = false;
    } else setContentErrorMsg('');
    return isValid;
  };

  const changeValue = (event: any) => {
    const {name, value} = event.target;
    setQuestionContent({...questionContent, [name]: value});
  };

  // 파일 선택
  const getFile = (event: any) => {
    let newFile = file;
    for (let i = 0; i < event.target.files.length; i++) {
      newFile = newFile.concat({file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])})
    }
    setFile(newFile);
  };

  // 파일 삭제
  const deleteFile = (num: number) => {
    const newFile = file.filter((item, index) => index !== num);
    setFile(newFile);
  };

  // 문의사항 작성 취소 - open
  const openDeleteQuestionForm = () => setDeleteQuestionForm(deleteQuestionForm => !deleteQuestionForm);

  // 문의사항 작성 취소 - close
  const closeDeleteQuestionForm = () => setDeleteQuestionForm(false);

  // 문의사항 작성하기
  const postCreateQuestion = () => {
    dispatch(onLoading())
    const questionForm = new FormData();
    questionForm.append('writer', writer);
    questionForm.append('password', password);
    questionForm.append('title', title);
    questionForm.append('content', content);
    questionFile.map((item: { file: string, path: string }) => questionForm.append('files', item.file));
    questionForm.append('FAQ', 'false');

    validate() &&
    questionApi.postCreateQuestion(questionForm)
      .then(() => {
        success();
        navigate('/question?page=1');
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
      .finally(() => dispatch(onLoading()))
  };

  // 비밀번호 숫자 제한
  const inputNumber = (event: any) => {
    if (!/^[0-9]+$/.test(event.key) && event.key.length === 1) {
      event.preventDefault()
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>문의하기</Title>

      <Spacing/>

      {/* 문의 글쓰기 폼 */}
      <Box sx={{
        borderTop: '3px solid #2E7D32',
        borderBottom: '3px solid #2E7D32'
      }}>

        {/* 제목 */}
        <Box sx={{
          textAlign: 'center',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 2
        }}>
          <TextField
            type='text'
            name='title'
            value={title}
            required
            autoFocus
            onChange={changeValue}
            placeholder='제목을 입력해 주세요'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%'}}
          />
        </Box>

        {/* 정보 */}
        <Box sx={{
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 2,
          pt: 0
        }}>
          <List sx={{mb: 1}}>
            <Precautions>※ 이름은 실명으로 기재해 주세요.</Precautions>
            <Precautions>※ 비밀번호는 숫자 4자리를 입력해 주세요. 게시물 열람시 사용됩니다.</Precautions>
          </List>
          <DataTextField
            type='text'
            name='writer'
            required
            placeholder='이름'
            onChange={changeValue}
            size='small'
            error={!!nameErrorMsg}
            helperText={nameErrorMsg}
            inputProps={{
              style: {fontSize: 15}
            }}
            sx={{mr: 2}}
          />
          <DataTextField
            type='password'
            name='password'
            required
            placeholder='비밀번호'
            error={!!passwordErrorMsg}
            helperText={passwordErrorMsg}
            onKeyDown={inputNumber}
            onChange={changeValue}
            size='small'
            inputProps={{style: {fontSize: 15}, maxLength: 4}}/>
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
          {file.length > 0 &&
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
              {file.map((item: { file: string, path: string }, index: number) => (
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
            multiline
            rows={15}
            required={true}
            onChange={changeValue}
            error={!!contentErrorMsg}
            helperText={contentErrorMsg}
            placeholder='문의사항을 작성해 주세요'
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%'}}
          />
        </Stack>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='작성완료' onClick={postCreateQuestion}/>
        <EditButton name='취소' onClick={openDeleteQuestionForm}/>
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={deleteQuestionForm}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          navigate(-1);
          closeDeleteQuestionForm();
        }}
        closeAction={closeDeleteQuestionForm}/>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;


const Title = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;

const DataTextField = styled(TextField)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '25%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '40%'
  },
  width: '15%'
})) as typeof TextField;

const Precautions = styled(ListItem)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  },
  userSelect: 'none',
  color: 'darkgrey'
}));