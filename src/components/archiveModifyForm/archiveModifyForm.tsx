import React, {useEffect, useState} from 'react';
import '../style.css';
import {useNavigate} from 'react-router-dom';
import {api} from "../../network/network";
import {archiveApi} from '../../network/archive';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {getDetailData} from '../../app/reducers/archiveSlice';
import {onLoading} from "../../app/reducers/dialogSlice";
import {changeMode} from '../../app/reducers/managerModeSlice';
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
  const detail = useAppSelector(state => state.archive.detail); // 게시글 상세정보
  const archiveId = useAppSelector(state => state.archive.detail.id); // 자료실 글 id
  const [content, setContent] = useState<{
    categoryName: string,
    content: string,
    notice: string,
    title: string
  }>({
    categoryName: '',
    content: '',
    notice: '',
    title: ''
  });
  const [originFiles, setOriginFiles] = useState<{
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  }[]>([]);
  const [originImages, setOriginImages] = useState<{
    id: number,
    originalFilename: string,
    savedPath: string,
    serverFilename: string
  }[]>([]);
  const [file, setFile] = useState<{ name: string, file: string }[]>([]); // 첨부파일
  const [image, setImage] = useState<{ file: string, path: string }[]>([]); // 첨부 사진
  const [cancelArchiveModify, setCancelArchiveModify] = useState(false); // 자료실 글 수정
  const [deleteArchiveId, setDeleteArchiveId] = useState<{ archiveId: number, fileId: number }[]>([]); // 삭제할 첨부파일

  // error message
  const [titleErrorMsg, setTitleErrorMsg] = useState(''); // 제목

  useEffect(() => {
    setContent({
      categoryName: detail.categoryName,
      content: detail.content,
      title: detail.title,
      notice: detail.notice
    })
    setOriginFiles(detail.attachedFiles);
    setOriginImages(detail.contentImageFiles);
  }, []);

  const validate = () => {
    let isValid = true;
    if (!content.title) {
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

  // 제목, 내용 입력
  const changeValue = (event: any) => {
    const {name, value} = event.target;
    setContent({...content, [name]: value})
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
    for (let i = 0; i < event.target.files.length; i++) {
      let newImage = image;
      for (let i = 0; i < event.target.files.length; i++) {
        newImage = newImage.concat({file: event.target.files[i], path: URL.createObjectURL(event.target.files[i])})
      }
      setImage(newImage);
    }
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

  // 카테고리 선택
  const getCategory = (event: any) => {
    setContent({...content, categoryName: event.target.value})
  };

  // 공지사항 선택
  const getNotice = (event: any) => {
    setContent({...content, notice: String(event.target.checked)});
  };

  // 기존 이미지 삭제
  const deleteOriginImage = (num: number, archiveId: number, fileId: number) => {
    const newImage = originImages.filter((item, index) => index !== num);
    setOriginImages(newImage);
    setDeleteArchiveId([...deleteArchiveId, {archiveId: archiveId, fileId: fileId}]);
  };

  // 기존 파일 삭제
  const deleteOriginalFile = (num: number, archiveId: number, fileId: number) => {
    const newFile = originFiles.filter((item, index) => index !== num);
    setOriginFiles(newFile);
    setDeleteArchiveId([...deleteArchiveId, {archiveId: archiveId, fileId: fileId}])
  };

  // 파일 삭제
  const deleteArchiveFile = () => {
    deleteArchiveId.map((item: { archiveId: number, fileId: number }) => (
      archiveApi.deleteArchiveFile(item.archiveId, item.fileId)
        .then(() => setDeleteArchiveId([])).catch(error => console.log(error))
    ))
  };

  // 자료실 글 변경
  const putArchiveForm = (archiveId: number) => {
    const archiveForm = new FormData();
    file.map((item: { file: string, name: string }) => archiveForm.append('attachedFiles', item.file));
    archiveForm.append('categoryName', content.categoryName);
    archiveForm.append('content', content.content);
    image.map((item: { file: string, path: string }) => archiveForm.append('contentImageFiles', item.file));
    archiveForm.append('notice', content.notice);
    archiveForm.append('title', content.title);

    deleteArchiveFile();

    if (validate()) {
      dispatch(onLoading());
      archiveApi.putUpdateArchive(archiveId, archiveForm)
        .then(res => {
          successModify();
          dispatch(getDetailData({detail: res}));
          navigate(-1);
        })
        .catch(error => {
          errorToast(error.response.data.message);
          console.log(error);
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
            value={content.title}
            required
            error={!!titleErrorMsg}
            helperText={titleErrorMsg}
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
          <ArchiveCategorySelect getCategory={getCategory} defaultCategory={detail.categoryName}/>

          {/* 공지사항 표시 */}
          <FormControlLabel
            control={<Checkbox
              defaultChecked={detail.notice === 'true'}
              onChange={getNotice}
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
          {originImages.length + image.length > 0 &&
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
              {originImages.map((item, index) => (
                <Box key={item.id} sx={{width: '23%', m: 1}}>
                  <Box sx={{textAlign: 'end'}}>
                    <ClearRoundedIcon
                      onClick={() => deleteOriginImage(index, archiveId, item.id)}
                      sx={{color: 'darkgreen', cursor: 'pointer'}}/>
                  </Box>
                  <img src={`${api.baseUrl()}/files/archive/${item.serverFilename}`} alt={item.originalFilename}
                       width='100%'/>
                </Box>
              ))}

              {/* 새로 추가한 이미지 */}
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
              {/* 파일이 없는 경우 */}
              {(originFiles.length + file.length === 0) &&
                <UploadFileTypography>업로드할 파일</UploadFileTypography>
              }

              {/* 기존 파일 */}
              {originFiles.map((item, index) => (
                <Stack direction='row' key={item.id}>
                  <UploadFileTypography>{item.originalFilename}</UploadFileTypography>
                  <ClearRoundedIcon
                    onClick={() => deleteOriginalFile(index, archiveId, item.id)}
                    fontSize='small'
                    sx={{color: 'lightgrey', cursor: 'pointer', ml: 1}}/>
                </Stack>
              ))}

              {/* 새로 추가되는 파일 */}
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