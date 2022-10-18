import React, {useEffect, useState} from 'react';
import '../style.css';
import {useNavigate} from 'react-router-dom';
import {api} from "../../network/network";
import {archiveApi} from '../../network/archive';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {getDetailData} from '../../app/reducers/archiveSlice';
import {changeMode} from '../../app/reducers/managerModeSlice';
import {
  addArchiveFile,
  deleteArchiveFile,
  deleteArchiveFileData,
  updateArchiveFileData,
  resetArchiveState,
  modifyArchiveTitle,
  modifyArchiveContent,
  modifyArchiveNoticeChecked,
  deleteArchiveOriginFile,
  updateArchiveCategory,
  addArchiveContentFile,
  deleteArchiveContentFile,
  deleteOriginalArchiveContentFile, resetArchiveFile
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
import ArchiveCategorySelect from '../archiveCategorySelect';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';

interface propsType {
  successModify: () => void,
  errorToast: (message: string) => void
}

export default function ArchiveModifyForm({successModify, errorToast}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // state
  const archiveModifyContent = useAppSelector(state => state.archiveForm.archiveModifyContent); // 자료실 글쓰기 수정 내용
  const categoryName = useAppSelector(state => state.archiveForm.archiveContent.categoryName);
  const archiveId = useAppSelector(state => state.archive.detail.id); // 자료실 글 id
  const attachedFileData = useAppSelector(state => state.archiveForm.attachedFiles.data); // 첨부파일 목록
  const attachedFileName = useAppSelector(state => state.archiveForm.attachedFiles.name); // 첨부파일 이름 목록
  const contentImageFiles = useAppSelector(state => state.archiveForm.contentImageFiles);
  const [cancelArchiveModify, setCancelArchiveModify] = useState(false); // 자료실 글 수정
  const [deleteArchiveId, setDeleteArchiveId] = useState<{ archiveId: number, fileId: number }[]>([]); // 삭제할 첨부파일

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목

  useEffect(() => {
    dispatch(updateArchiveCategory({categoryName: archiveModifyContent.categoryName}))
    dispatch(resetArchiveFile());
  }, []);

  const validate = () => {
    let isValid = true;
    if (archiveModifyContent.title === null || archiveModifyContent.title === '') {
      setTitleErrorMsg('제목을 입력해 주세요.');
      isValid = false;
    } else setTitleErrorMsg('');
    return isValid;
  };

  // 자료실 글 수정 modal - open
  const openCancelArchiveModify = () => {
    setCancelArchiveModify(cancelArchiveModify => !cancelArchiveModify);
  };

  // 자료실 글 수정 modal - close
  const closeCancelArchiveModify = () => {
    setCancelArchiveModify(false);
  };

  // 파일 선택 이벤트
  const selectFile = (event: any) => {
    // 파일 이름 미리보기
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(addArchiveFile({item: event?.target.files[i].name}));
    }

    // 전송할 파일 데이터
    for (let i = 0; i < event?.target.files.length; i++) {
      dispatch(updateArchiveFileData({file: event?.target.files[i]}));
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
    // 파일 이름 삭제
    dispatch(deleteArchiveFile({num: index}));

    // 전송할 파일 데이터 삭제
    dispatch(deleteArchiveFileData({num: index}));
  };

  // 기존 이미지 삭제
  const deleteOriginArchiveContentFile = (index: number, archiveId: number, fileId: number) => {
    dispatch(deleteOriginalArchiveContentFile({index: index}));
    setDeleteArchiveId([...deleteArchiveId, {archiveId: archiveId, fileId: fileId}])
  };

  // 기존 파일 삭제
  const deleteOriginalFile = (index: number, archiveId: number, fileId: number) => {
    dispatch(deleteArchiveOriginFile({num: index}));
    setDeleteArchiveId([...deleteArchiveId, {archiveId: archiveId, fileId: fileId}])
  };

  // 자료실 글 변경
  const putArchiveForm = (archiveId: number) => {
    const archiveData = new FormData();
    attachedFileData.map((item: string) => archiveData.append('attachedFiles', item));
    archiveData.append('categoryName', categoryName);
    archiveData.append('content', archiveModifyContent.content);
    contentImageFiles.map((item: { file: string, path: string }) => archiveData.append('contentImageFiles', item.file));
    archiveData.append('notice', archiveModifyContent.notice);
    archiveData.append('title', archiveModifyContent.title);

    deleteArchiveId.map((item: { archiveId: number, fileId: number }) => (
      archiveApi.deleteArchiveFile(item.archiveId, item.fileId)
        .then()
        .catch(error => console.log(error))
    ))

    validate() &&
    archiveApi.putUpdateArchive(archiveId, archiveData)
      .then(res => {
        successModify();
        dispatch(getDetailData({detail: res}));
        navigate(-1);
      })
      .catch(error => {
        errorToast(error.response.data.message);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <Title variant='h5'>자료실</Title>

      <Spacing/>

      {/* 공지사항 글쓰기 폼 */}
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
            value={archiveModifyContent.title}
            required
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
            onChange={event => dispatch(modifyArchiveTitle({title: event?.target.value}))}
            placeholder='제목을 입력해 주세요'
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
          <ArchiveCategorySelect defaultCategory={archiveModifyContent.categoryName} categoryErrorMsg={undefined}/>
          <FormControlLabel
            control={<Checkbox
              defaultChecked={archiveModifyContent.notice === 'true'}
              onChange={event => dispatch(modifyArchiveNoticeChecked({isNotice: event?.target.checked}))}
              sx={{
                color: 'darkgrey',
                '&.Mui-checked': {
                  color: 'green',
                },
              }}/>}
            label='공지사항 표시'
            labelPlacement='start'
            sx={{color: 'darkgrey'}}/>
        </Box>

        {/* 내용 */}
        <Stack spacing={2} sx={{p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)'}}>
          <Box>
            <label className='uploadButton' htmlFor='inputArchivePhoto' onChange={selectContentFile}>
              사진 첨부
              <input id='inputArchivePhoto' type='file' accept={'image/*'} multiple/>
            </label>
          </Box>

          {/* 첨부파일 */}
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
            {archiveModifyContent.contentImageFiles.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }, index: number) => (
              <Box key={item.id} sx={{width: '23%', m: 1}}>
                <Box sx={{textAlign: 'end'}}>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginArchiveContentFile(index, archiveId, item.id)}
                    sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                </Box>
                <img src={`${api.baseUrl()}/files/archive/${item.serverFilename}`} alt={item.originalFilename}
                     width='100%'/>
              </Box>
            ))}

            {/* 새로 추가한 이미지 */}
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

          <TextField
            defaultValue={archiveModifyContent.content}
            placeholder='내용을 입력하세요'
            multiline
            minRows={15}
            onChange={event => dispatch(modifyArchiveContent({content: event.target.value}))}
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
              {/* 파일이 없는 경우 */}
              {(attachedFileName.length === 0 && archiveModifyContent.attachedFiles.length === 0) &&
                <UploadFileTypography>업로드할 파일</UploadFileTypography>
              }

              {/* 기존 파일 */}
              {archiveModifyContent.attachedFiles.map((item, index) => (
                <Stack direction='row' key={item.id}>
                  <UploadFileTypography>{item.originalFilename}</UploadFileTypography>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginalFile(index, archiveId, item.id)}
                    fontSize='small'
                    sx={{color: 'lightgrey', cursor: 'pointer', ml: 1}}/>
                </Stack>
              ))}

              {/* 새로 추가되는 파일 */}
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
            onChange={event => selectFile(event)}>
            업로드
            <input type='file' id='archiveFile' multiple style={{display: 'none'}}/>
          </label>
        </Stack>
      </Box>

      <Spacing/>

      {/* 버튼 */}
      <Spacing sx={{textAlign: 'center'}}>
        <EditButton name='변경완료' onClick={() => putArchiveForm(archiveId)}/>
        <EditButton name='취소' onClick={openCancelArchiveModify}/>
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={cancelArchiveModify}
        title={'변경 취소'}
        text1={'변경중인 내용이 사라집니다.'}
        text2={'취소하시겠습니까?'}
        yesAction={() => {
          dispatch(resetArchiveState());
          closeCancelArchiveModify()
          navigate(-1);
        }}
        closeAction={closeCancelArchiveModify}/>
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