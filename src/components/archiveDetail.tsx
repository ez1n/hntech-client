import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {archiveApi} from '../network/archive';
import {fileApi} from '../network/file';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {changeMode} from '../app/reducers/managerModeSlice';
import {copyArchiveDetailData, resetArchiveFile} from '../app/reducers/archiveFormSlice';
import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography
} from '@mui/material';
import EditButton from './editButton';
import CancelModal from './cancelModal';
import {api} from "../network/network";
import {getDetailData} from "../app/reducers/archiveSlice";

interface propsType {
  successDelete: () => void
}

export default function ArchiveDetail({successDelete}: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {currentId} = useParams();

  // state
  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const detail = useAppSelector(state => state.archive.detail); // 게시글 상세정보
  const [deleteArchiveDetail, setDeleteArchiveDetail] = useState(false); // 게시글 삭제

  // 수정 정보 만들기
  useEffect(() => {
    dispatch(copyArchiveDetailData({detail: detail}));
    dispatch(resetArchiveFile());
  }, []);

  useEffect(() => {
    currentId &&
    archiveApi.getArchive(parseInt(currentId))
      .then(res => dispatch(getDetailData({detail: res})))
      .catch(error => console.log(error))
  }, []);

  // 게시글 삭제 modal - open
  const openDeleteArchiveDetail = () => {
    setDeleteArchiveDetail(deleteArchiveDetail => !deleteArchiveDetail);
  };

  // 게시글 삭제 modal - close
  const closeDeleteArchiveDetail = () => {
    setDeleteArchiveDetail(false);
  };

  // 게시글 삭제
  const deleteArchive = (archiveId: number) => {
    archiveApi.deleteArchive(archiveId)
      .then(res => {
        successDelete();
        closeDeleteArchiveDetail();
        navigate('/archive/page/1');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  // 파일 다운로드
  const downloadFile = (serverFilename: string, originalFilename: string) => {
    fileApi.downloadFile(serverFilename)
      .then(res => {
        return res;
      })
      .then(file => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = originalFilename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
      })
      .catch(error => console.log(error))
  };

  return (
    <Container sx={{mt: 5}}>
      {/* 소제목 */}
      <TitleTypography variant='h5'>
        자료실
      </TitleTypography>

      <Spacing>
        {managerMode &&
            <Box sx={{textAlign: 'end'}}>
                <EditButton name='수정' onClick={() => navigate('/archive-modify')}/>
                <EditButton name='삭제' onClick={openDeleteArchiveDetail}/>
            </Box>
        }
      </Spacing>

      <Box sx={{
        borderTop: '3px solid #2E7D32',
        borderBottom: '3px solid #2E7D32',
      }}>
        {/* 제목 */}
        <DetailTitleBox>
          <DetailTitleTypography>
            {detail.title}
          </DetailTitleTypography>
        </DetailTitleBox>

        {/* 카테고리, 작성일 */}
        <CategoryBox>
          <ContentTypography>{detail.categoryName}</ContentTypography>
          <ContentTypography sx={{color: 'darkgrey'}}>작성일 {detail.createTime}</ContentTypography>
        </CategoryBox>

        {/* content */}
        <Box sx={{p: 3, minHeight: 300, borderBottom: '1px solid #3B6C46'}}>
          <Stack direction='row' sx={{flexWrap: 'wrap', mb: 2}}>
            {detail.contentImageFiles?.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }) => (
              <img key={item.id} src={`${api.baseUrl()}/files/archive/${item.serverFilename}`} width={'30%'} alt={item.originalFilename}/>
            ))}
          </Stack>

          {detail.content.split('\n').map((value, index) => (
            <Typography key={index}>
              {value === '\r' ? <br/> : value}
            </Typography>
          ))}
        </Box>

        {/* 첨부파일 */}
        <Stack direction='row' spacing={1} sx={{p: 2, color: 'darkgrey'}}>
          <ContentTypography>첨부파일</ContentTypography>
          <ContentTypography>|</ContentTypography>
          <Box>
            {detail.attachedFiles.map((item: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            }) => (
              <ContentTypography
                key={item.id}
                onClick={() => downloadFile(item.serverFilename, item.originalFilename)}
                sx={{cursor: 'pointer', '&:hover': {color: 'darkgreen'}}}
              >
                {item.originalFilename}
              </ContentTypography>
            ))}
          </Box>
        </Stack>
      </Box>

      {/* 목록 버튼 */}
      <Box sx={{mt: 1, display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          size='small'
          onClick={() => navigate('/archive/page/1')}
          sx={{
            color: 'white',
            backgroundColor: '#2E7D32',
            fontWeight: 'bold',
            '&: hover': {
              backgroundColor: '#339933'
            }
          }}>
          목록
        </Button>
      </Box>

      {/* 삭제 버튼 Dialog */}
      <CancelModal
        openState={deleteArchiveDetail}
        title={'게시글 삭제'}
        text1={'삭제된 게시글은 복구할 수 없습니다'}
        text2={'삭제하시겠습니까?'}
        yesAction={() => deleteArchive(detail.id)}
        closeAction={closeDeleteArchiveDetail}/>
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50,
  marginBottom: 10
})) as typeof Container;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32'
})) as typeof Typography;

const DetailTitleBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 10
  },
  borderBottom: '1px solid #3B6C46',
  padding: 15
})) as typeof Box;

const DetailTitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 18
  },
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center'
})) as typeof Typography;

const CategoryBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 10
  },
  display: 'flex',
  justifyContent: 'space-between',
  padding: 15,
  borderBottom: '1px solid #3B6C46'
})) as typeof Box;

const ContentTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 13
  },
  fontSize: 15
})) as typeof Typography;