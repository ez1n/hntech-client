import React, {useState} from 'react';
import {adminApi} from '../../network/admin';
import {api} from '../../network/network';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {changeMode} from '../../app/reducers/adminSlice';
import {onLoading} from "../../app/reducers/dialogSlice";
import {getHistoryImage, deleteHistory} from '../../app/reducers/companyModifySlice';
import {Box, Container, Typography, styled, IconButton} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditButton from '../editButton';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function History({success, errorToast}: propsType) {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const history = useAppSelector(state => state.companyModify.companyImage.historyImage); // 회사 연혁 state (받아온 데이터)
  const [image, setImage] = useState<{ id: number, file: string, path: string }[]>([]);
  const [deleteImage, setDeleteImage] = useState<string[]>([]);

  // 회사 연혁 사진 업로드
  const updateHistoryImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      setImage(prev => {
        return prev.concat({
          id: Date.now(),
          file: event.target.files[i],
          path: URL.createObjectURL(event.target.files[i])
        })
      })
    }
  };

  // 업로드 사진 삭제
  const deleteHistoryImage = (num: number) => {
    URL.revokeObjectURL(image[num].path);
    setImage(prev => {
      return prev.filter((item, index) => index !== num);
    });
  };

  // 기존 사진 삭제
  const deleteOriginHistoryImage = (num: number) => {
    dispatch(deleteHistory({num: num}));
    setDeleteImage(prev => [...prev, history[num].serverFilename]);
  };

  // 회사연혁 변경 요청
  const postHistory = () => {
    dispatch(onLoading());
    const historyForm = new FormData(); // 회사 연혁 (전송 데이터)
    image.map(item => historyForm.append('files', item.file));

    // 삭제
    deleteImage.map(item => (
      adminApi.deleteImage(item)
        .then(() => setDeleteImage([]))
        .catch(error => {
          dispatch(onLoading());
          console.log(error);

          if (error.response.status === 401) {
            errorToast('로그인이 필요합니다.');
            localStorage.removeItem("login");
            const isLogin = localStorage.getItem("login");
            dispatch(changeMode({login: isLogin}));
          }
        })
    ))

    //변경
    adminApi.postHistory(historyForm)
      .then(() => {
        adminApi.getImages()
          .then(res => {
            setImage([]);
            success();
            dispatch(getHistoryImage({historyImage: res.historyImage}));
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          errorToast('로그인이 필요합니다.');
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
      .finally(() => dispatch(onLoading()))
  };

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <TitleTypography>
          회사 연혁
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing>
        {managerMode &&
          <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <label className='imageUploadButton' htmlFor='historyInput'>
              이미지 가져오기
              <input
                type='file'
                accept='image/*'
                multiple
                id='historyInput'
                onChange={updateHistoryImage}
                onClick={(e: any) => e.target.value = null}/>
            </label>
            <EditButton name='수정' onClick={postHistory}/>
          </Box>}
      </Spacing>

      {/* 회사 연혁 */}
      <Box sx={{textAlign: 'center', mt: 1}}>
        {managerMode ?
          <Container
            sx={{
              border: '2px solid lightgrey',
              borderRadius: 1,
              alignItems: 'center',
              height: 500,
              overflow: 'auto'
            }}>
            {history.length > 0 &&
              history.map((item, index) => (
                <Box key={item.id} sx={{width: '80%', position: 'relative', m: 'auto'}}>
                  <IconButton onClick={() => deleteOriginHistoryImage(index)}
                              sx={{position: 'absolute', top: '15px', right: 0}}>
                    <ClearRoundedIcon sx={{color: 'darkgreen', cursor: 'pointer', fontSize: '2rem'}}/>
                  </IconButton>
                  <img src={`${api.baseUrl()}/files/admin/${item.serverFilename}`} alt={item.originalFilename}
                       width='80%'/>
                </Box>
              ))}
            {image.map((item, index) => (
              <Box key={item.id} sx={{width: '80%', position: 'relative', m: 'auto'}}>
                <IconButton onClick={() => deleteHistoryImage(index)}
                            sx={{position: 'absolute', top: '15px', right: 0}}>
                  <ClearRoundedIcon sx={{color: 'darkgreen', cursor: 'pointer', fontSize: '2rem'}}/>
                </IconButton>
                <img src={item.path} alt='회사 연혁' width='80%'/>
              </Box>
            ))}
          </Container> :
          history.map(item => (
            <img className='companyImage' key={item.id} src={`${api.baseUrl()}/files/admin/${item.serverFilename}`} alt={item.originalFilename}/>
          ))
        }
      </Box>
    </TotalBox>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  fontSize: 22,
  fontWeight: 'bold',
  color: '#2b2b2b',
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;
