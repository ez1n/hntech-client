import React, {useEffect, useState} from 'react';
import '../style.css';
import {useNavigate} from 'react-router-dom';
import {archiveApi} from '../../network/archive';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {onLoading} from '../../app/reducers/dialogSlice';
import {changeMode} from '../../app/reducers/managerModeSlice';
import {
  addArchiveFile,
  deleteArchiveFile,
  updateArchiveFileData,
  deleteArchiveFileData,
  updateArchiveTitle,
  updateArchiveContent,
  updateArchiveNoticeChecked,
  resetArchiveState,
  resetArchiveFile,
  updateArchiveCategory,
  addArchiveContentFile,
  deleteArchiveContentFile
} from '../../app/reducers/archiveFormSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ArchiveCategorySelect from '../archiveCategorySelect';
import Loading from '../loading';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function ArchiveForm({success, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const archiveContent = useAppSelector(state => state.archiveForm.archiveContent); // 자료실 글쓰기 내용
  const attachedFileData = useAppSelector(state => state.archiveForm.attachedFiles.data); // 첨부파일 이름 목록
  const attachedFileName = useAppSelector(state => state.archiveForm.attachedFiles.name); // 첨부파일 이름 목록
  const contentImageFiles = useAppSelector(state => state.archiveForm.contentImageFiles);
  const [cancelArchive, setCancelArchive] = useState(false); // 자료실 글쓰기 취소

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(''); // 카테고리

  useEffect(() => {
    dispatch(resetArchiveFile());
    dispatch(updateArchiveCategory({categoryName: ''}));
    dispatch(updateArchiveNoticeChecked({isNotice: false}));
  }, []);

  const validate = () => {
    let isValid = true;
    if (archiveContent.title === '') {
      setTitleErrorMsg('제목을 입력해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    if (archiveContent.categoryName === '') {
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
  const selectFile = (event: any) => {
    // 파일 이름 미리보기
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addArchiveFile({item: event.target.files[i].name}))
    }

    // 전송할 파일 데이터
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(updateArchiveFileData({file: event.target.files[i]}))
    }
  };

  // 파일 선택 이벤트
  const selectContentFile = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addArchiveContentFile({
        file: {
          file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])
        }
      }))
    }
  };

  // 파일 선택 취소
  const deleteFile = (index: number) => {
    dispatch(deleteArchiveFile({num: index}));
    dispatch(deleteArchiveFileData({num: index}));
  };

  // 자료실 글쓰기
  const postArchiveForm = () => {
    const archiveData = new FormData();
    attachedFileData.map(item => archiveData.append('attachedFiles', item));
    archiveData.append('categoryName', archiveContent.categoryName);
    archiveData.append('content', archiveContent.content);
    contentImageFiles.map((item: { file: string, path: string }) => archiveData.append('contentImageFiles', item.file));
    archiveData.append('notice', archiveContent.notice);
    archiveData.append('title', archiveContent.title);

    // 게시글 내용 보내기
    if (validate()) {
      dispatch(onLoading());
      archiveApi.postCreateArchive(archiveData)
        .then(res => {
          success();
          dispatch(resetArchiveState());
          dispatch(onLoading());
          navigate('/archive/page/1');
        })
        .catch(error => {
          dispatch(onLoading());
          errorToast(error.response.data.message);
          if (error.response.status === 401) {
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
    }
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>자료실</Title>

      <Spacing/>

      {/* 자료실 글쓰기 폼 */}
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
            required
            autoFocus
            autoComplete='off'
            placeholder='제목을 입력해 주세요'
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            onChange={event => dispatch(updateArchiveTitle({title: event.target.value}))}
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
          <ArchiveCategorySelect defaultCategory={null} categoryErrorMsg={categoryErrorMsg}/>

          {/* 공지사항 표시 */}
          <FormControlLabel
            control={<Checkbox
              onChange={event => dispatch(updateArchiveNoticeChecked({isNotice: event.target.checked}))}
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
              onChange={selectContentFile}
              onClick={(e: any) => e.target.value = null}>
              사진 첨부
              <input id='inputArchivePhoto' type='file' accept={'image/*'} multiple/>
            </label>
          </Box>

          {/* 첨부파일 */}
          {contentImageFiles.length > 0 &&
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
              {contentImageFiles.map((item: { file: string, path: string }, index: number) => (
                <Box key={index} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => dispatch(deleteArchiveContentFile({index: index}))}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={item.path} alt='이미지' width='100%'/>
                </Box>
              ))}
            </Container>
          }


          <TextField
            autoComplete='off'
            placeholder='내용을 입력하세요'
            multiline
            minRows={15}
            onChange={event => dispatch(updateArchiveContent({content: event.target.value}))}
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
              {attachedFileName.length === 0 &&
                <UploadFileTypography>
                  업로드할 파일
                </UploadFileTypography>
              }
              {attachedFileName.map((item, index) => (
                <Stack direction='row' key={index}>
                  <UploadFileTypography>{item}</UploadFileTypography>
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
            onChange={event => selectFile(event)}
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

      <Loading/>

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