import React from 'react';
import {archiveApi} from '../../network/archive';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getAllArchives, getDetailData} from '../../app/reducers/archiveSlice';
import {
  Box,
  Container,
  Pagination,
  Stack,
  styled,
  Typography
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function ArchiveItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalPage = useAppSelector(state => state.archive.totalPage); // 전체 페이지
  const totalElements = useAppSelector(state => state.archive.totalElements); // 전체 페이지
  const currentPage = useAppSelector(state => state.archive.currentPage); // 현재 페이지
  const archives = useAppSelector(state => state.archive.archives); // 자료실 글 목록
  const notice = useAppSelector(state => state.archive.notice); // 공지 목록

  // 게시글 보기 (정보 받아오기)
  const openDetail = (archiveId: number) => {
    archiveApi.getArchive(archiveId)
      .then(res => {
        dispatch(getDetailData({detail: res}));
        navigate('/archive-detail');
      })
      .catch(error => console.log(error))
  };

  // 페이지 전환
  const changePage = (value: number) => {
    archiveApi.getArchives(value - 1)
      .then(res => {
        dispatch(getAllArchives({
          archives: res.archives,
          totalPage: res.totalPages,
          currentPage: res.currentPage,
          totalElements: res.totalElements
        }))
      })
      .catch(error => console.log(error))
  };

  return (
    <>
      <Box sx={{borderTop: '3px solid #2E7D32', borderBottom: '3px solid #3B6C46'}}>
        {/* 분류 */}
        <Box sx={{display: 'flex', flex: 1, p: '12px', borderBottom: '3px solid #3B6C46'}}>
          <Title sx={{flex: 0.1}}>번호</Title>
          <Title sx={{flex: 0.2}}>분류</Title>
          <Title sx={{flex: 0.5}}>제목</Title>
          <Title sx={{flex: 0.2}}>작성일</Title>
        </Box>

        {/* 공지 목록 */}
        {notice.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46',
              backgroundColor: 'rgba(105,162,149,0.1)',
              alignItems: 'center'
            }}>
            <List sx={{flex: 0.1}}><Icon/></List>
            <List sx={{flex: 0.2}}>{item.categoryName}</List>
            <TitleList onClick={() => openDetail(item.id)}>
              <TitleTypography>
                {item.title}
              </TitleTypography>
              {item.new == 'true' &&
                <New>[new]</New>
              }
            </TitleList>
            <List sx={{flex: 0.2}}>{item.createTime}</List>

          </Box>
        ))}

        {/* 자료 목록 */}
        {archives.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46'
            }}>
            <List sx={{flex: 0.1}}>{totalElements - index}</List>
            <List sx={{flex: 0.2}}>{item.categoryName}</List>
            <TitleList onClick={() => openDetail(item.id)}>
              <TitleTypography>
                {item.title}
              </TitleTypography>
              {item.new == 'true' &&
                <New>[new]</New>
              }
            </TitleList>
            <List sx={{flex: 0.2}}>{item.createTime}</List>

          </Box>
        ))}
      </Box>

      <Spacing/>

      <Stack>
        <Pagination
          onChange={(event: React.ChangeEvent<unknown>, value: number) => changePage(value)}
          count={totalPage}
          sx={{m: '0 auto'}}/>
      </Stack>
    </>
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;

const Title = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 17,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;

const List = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
  },
  textAlign: 'center',
  alignItems: 'center',
  fontSize: 15
})) as typeof Box;

const TitleList = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
    minWidth: '265px'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 11,
    minWidth: '155px'
  },
  textAlign: 'center',
  alignItems: 'center',
  fontSize: 15,
  flex: 0.5,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&: hover': {
    color: 'blue'
  }
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 13
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 11
  },
  fontSize: 15,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})) as typeof Typography;

const Icon = styled(ErrorIcon)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 17,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
  color: 'darkgreen'
}));

const New = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 10,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 8,
  },
  marginLeft: 7,
  fontSize: 13,
  display: 'flex',
  color: 'lightseagreen'
})) as typeof Typography;

