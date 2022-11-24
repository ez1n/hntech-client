import React, {useEffect, useState} from 'react';
import '../style.css';
import {useNavigate} from 'react-router-dom';
import {archiveApi} from '../../network/archive';
import {useAppDispatch} from '../../app/hooks';
import {onLoading} from '../../app/reducers/dialogSlice';
import {changeMode} from '../../app/reducers/adminSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  FormControl,
  FormHelperText
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ArchiveCategorySelect from '../archiveCategorySelect';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function ArchiveForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const [content, setContent] = useState({categoryName: '', content: '', notice: 'false', title: ''});
  const [file, setFile] = useState<{ name: string, file: string }[]>([]); // 첨부파일
  const [image, setImage] = useState<{ file: string, path: string }[]>([]); // 첨부 사진
  const [cancelArchive, setCancelArchive] = useState(false); // 자료실 글쓰기 취소

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(''); // 카테고리

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

  const validate = () => {
    let isValid = true;
    if (content.title === '') {
      setTitleErrorMsg('제목을 입력해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (content.categoryName === '') {
      setCategoryErrorMsg('카테고리를 선택해 주세요.');
      isValid = false;
    } else setCategoryErrorMsg('');
    return isValid;
  };

  // 자료실 글쓰기 취소 - open
  const openCancelArchive = () => {
    setCancelArchive(cancelArchive => !cancelArchive);
  };

  // 자료실 글쓰기 취소 - close
  const closeCancelArchive = () => {
    setCancelArchive(false);
  };

  // 파일 선택 이벤트
  const getFile = (event: any) => {
    let newFile = file;
    for (let i = 0; i < event.target.files.length; i++) {
      newFile = newFile.concat({name: event.target.files[i].name, file: event.target.files[i]})
    }
    setFile(newFile);
  };

  // 이미지 선택 이벤트
  const getImage = (event: any) => {
    let newImage = image;
    for (let i = 0; i < event.target.files.length; i++) {
      newImage = newImage.concat({file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])})
    }
    setImage(newImage);
  };

  // 이미지 삭제
  const deleteImage = (num: number) => {
    const newImage = image.filter((item, index) => index !== num)
    setImage(newImage);
  };

  // 파일 선택 취소
  const deleteFile = (num: number) => {
    const newFile = file.filter((item, index) => index !== num);
    setFile(newFile);
  };

  // 제목, 내용 입력
  const changeValue = (event: any) => {
    const {name, value} = event.target;
    setContent({...content, [name]: value})
  };

  // 카테고리 선택
  const getCategory = (event: any) => {
    setContent({...content, categoryName: event.target.value})
  };

  // 공지사항 선택
  const getNotice = (event: any) => {
    setContent({...content, notice: String(event.target.checked)});
  };

  // 자료실 글쓰기
  const postArchiveForm = () => {
    const archiveData = new FormData();
    file.map((item: { file: string, name: string }) => archiveData.append('attachedFiles', item.file));
    archiveData.append('categoryName', content.categoryName);
    archiveData.append('content', content.content);
    image.map((item: { file: string, path: string }) => archiveData.append('contentImageFiles', item.file));
    archiveData.append('notice', content.notice);
    archiveData.append('title', content.title);

    if (validate()) {
      dispatch(onLoading());
      archiveApi.postCreateArchive(archiveData)
        .then(() => {
          success();
          navigate('/archive?page=1');
        })
        .catch(error => {
          errorToast(error.response.data.message);
          console.log(error)
          if (error.response.status === 401) {
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
        .finally(() => dispatch(onLoading()))
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>자료실</Title>

      <Spacing/>

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
            name='title'
            onChange={changeValue}
            required
            autoFocus
            autoComplete='off'
            placeholder='제목을 입력해 주세요'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            inputProps={{style: {fontSize: 18}}}
            sx={{width: '100%'}}
          />
        </Box>

        {/* 정보 */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
          p: 1,
          pl: 2
        }}>
          {/* 카테고리 선택 */}
          <ArchiveCategoryFormControl error={!!categoryErrorMsg}>
            <ArchiveCategorySelect getCategory={getCategory} defaultCategory={null}/>
            <FormHelperText>{categoryErrorMsg}</FormHelperText>
          </ArchiveCategoryFormControl>

          {/* 공지사항 표시 */}
          <FormControlLabel
            control={<Checkbox
              onChange={getNotice}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }}/>}
            label='공지사항'
            labelPlacement='start'
            sx={{color: 'darkgrey'}}/>
        </Box>

        {/* 내용 */}
        <Stack spacing={2} sx={{p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)'}}>
          <Box>
            <label
              className='uploadButton'
              htmlFor='inputArchivePhoto'
              onChange={getImage}
              onClick={(e: any) => e.target.value = null}>
              사진 첨부
              <input id='inputArchivePhoto' type='file' accept={'image/*'} multiple/>
            </label>
          </Box>

          {/* 첨부파일 */}
          {image.length > 0 &&
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
              {image.map((item, index) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteImage(index)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={item.path} alt='첨부 이미지' width='100%'/>
                </Box>
              ))}
            </Container>
          }

          <TextField
            name='content'
            value={content.content}
            onChange={changeValue}
            autoComplete='off'
            placeholder='내용을 입력하세요'
            multiline
            minRows={15}
            sx={{width: '100%', overflow: 'auto'}}/>
        </Stack>

        {/* 첨부파일 */}
        <Stack direction='row' spacing={2} sx={{p: 2}}>
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
              {file.length === 0 &&
                <UploadFileTypography>
                  업로드할 파일
                </UploadFileTypography>
              }
              {file.map((item, index) => (
                <Stack direction='row' key={index}>
                  <UploadFileTypography>{item.name}</UploadFileTypography>
                  <ClearRoundedIcon
                    onClick={() => deleteFile(index)}
                    fontSize='small'
                    sx={{color: 'lightgrey', cursor: 'pointer', ml: 1}}/>
                </Stack>
              ))}
            </Stack>
          </Box>
          <label
            className='fileUploadButton'
            htmlFor='archiveFile'
            onChange={getFile}
            onClick={(e: any) => e.target.value = null}>
            업로드
            <input type='file' id='archiveFile' multiple style={{display: 'none'}}/>
          </label>
        </Stack>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='작성완료' onClick={postArchiveForm}/>
        <EditButton name='취소' onClick={openCancelArchive}/>
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={cancelArchive}
        title={'작성취소'}
        text1={'작성중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          navigate(-1);
          closeCancelArchive()
        }}
        closeAction={closeCancelArchive}/>
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

const UploadFileTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
  color: 'lightgrey',
  fontSize: 18
})) as typeof Typography;

const ArchiveCategoryFormControl = styled(FormControl)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    width: '50%'
  },
  width: '20%'
})) as typeof FormControl;