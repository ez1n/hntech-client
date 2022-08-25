import React, { useEffect, useState } from 'react';
import { archiveApi } from '../../network/archive';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllArchives,
  getNotice,
  getDetailData
} from '../../app/reducers/archiveSlice';
import {
  Box,
  Container,
  Pagination,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArchiveCategorySelect from '../archiveCategorySelect';

export default function ArchiveItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchContent, setSearchContent] = useState<string>('');

  const TotalPage = useAppSelector(state => state.archive.totalPage); // 전체 페이지
  const currentPage = useAppSelector(state => state.archive.currentPage); // 현재 페이지
  const archives = useAppSelector(state => state.archive.archives); // 자료실 글 목록
  const notice = useAppSelector(state => state.archive.notice); // 공지 목록
  const categoryName = useAppSelector(state => state.archiveForm.archiveContent.categoryName); // 선택한 카테고리

  useEffect(() => {
    // 자료실 목록 받아오기
    archiveApi.getArchives(0)
      .then(res => {
        dispatch(getAllArchives({
          archives: res.archives,
          totalPage: res.totalPages,
          currentPage: res.currentPage
        }));
      })

    // 공지 목록 받아오기
    archiveApi.getArchivesNotice()
      .then(res => {
        dispatch(getNotice({ notice: res.notices }))
      })
      .catch(error => console.log(error))
  }, []);

  // 게시글 보기 (정보 받아오기)
  const openDetail = (archiveId: number) => {
    archiveApi.getArchive(archiveId)
      .then(res => {
        dispatch(getDetailData({ detail: res }));
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
          currentPage: res.currentPage
        }))
      })
      .catch(error => console.log(error))
  };

  // 자료 검색
  const getSearchArchive = () => {
    archiveApi.getSearchArchive(categoryName === '전체' ? null : categoryName, searchContent, 0)
      .then(res => {
        console.log(res)
        dispatch(getAllArchives({ archives: res.archives, totalPage: res.totalPages, currentPage: res.currentPage }))
      })
      .catch(error => console.log(error))
  };


  return (
    <>
      <Box sx={{ borderTop: '3px solid #2E7D32', borderBottom: '3px solid #3B6C46' }}>
        {/* 분류 */}
        <Box sx={{ display: 'flex', flex: 1, p: 2, borderBottom: '3px solid #3B6C46' }}>
          <Title sx={{ flex: 0.1 }}>번호</Title>
          <Title sx={{ flex: 0.1 }}>분류</Title>
          <Title sx={{ flex: 0.6 }}>제목</Title>
          <Title sx={{ flex: 0.2 }}>작성일</Title>
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
              backgroundColor: 'rgba(46, 125, 50, 0.1)'
            }}>
            <List sx={{ flex: 0.1 }}><ErrorIcon sx={{ color: 'darkgreen' }} /></List>
            <List sx={{ flex: 0.1 }}>{item.categoryName}</List>
            <List
              onClick={() => openDetail(item.id)}
              sx={{
                flex: 0.6,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                '&: hover': {
                  color: 'blue'
                }
              }}>
              <Typography>
                {item.title}
              </Typography>
              {item.new == 'true' &&
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: 'small',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'lightseagreen'
                  }}>
                  [new]
                </Typography>
              }
            </List>
            <List sx={{ flex: 0.2 }}>{item.createTime}</List>

          </Box>
        ))}

        {/* 자료 목록 */}
        {archives.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46'
            }}>
            <List sx={{ flex: 0.1 }}>{item.id}</List>
            <List sx={{ flex: 0.1 }}>{item.categoryName}</List>
            <List
              onClick={() => openDetail(item.id)}
              sx={{
                flex: 0.6,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                '&: hover': {
                  color: 'blue'
                }
              }}>
              <Typography>
                {item.title}
              </Typography>
              {item.new == 'true' &&
                <Typography
                  sx={{
                    ml: 1,
                    fontSize: 'small',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'lightseagreen'
                  }}>
                  [new]
                </Typography>
              }
            </List>
            <List sx={{ flex: 0.2 }}>{item.createTime}</List>

          </Box>
        ))}
      </Box>

      <SpacingMargin />

      {/* 자료 검색 */}
      <Stack direction='row' spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* 카테고리 */}
        <ArchiveCategorySelect defaultCategory={'전체'} />

        <TextField
          placeholder='검색어를 입력하세요.'
          size='small'
          autoComplete='off'
          onChange={event => setSearchContent(event?.target.value)}
          sx={{ width: '50%' }} />
        <SearchRoundedIcon
          onClick={getSearchArchive}
          sx={{ color: 'darkgreen', fontSize: 35, cursor: 'pointer' }} />
      </Stack>

      <SpacingMargin />

      <Stack>
        <Pagination
          onChange={(event: React.ChangeEvent<unknown>, value: number) => changePage(value)}
          count={TotalPage}
          sx={{ m: '0 auto' }} />
      </Stack>
    </>
  )
};


const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;

const SpacingMargin = styled(Container)(() => ({
  height: 30
})) as typeof Container;

const Title = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold'
})) as typeof Typography;

const List = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: 15,
})) as typeof Typography;