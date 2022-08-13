import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllArchives, getNotice, getDetailData } from '../../app/reducers/archiveSlice';
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

  const TotalPage = useAppSelector(state => state.archive.totalPage); // 전체 페이지
  const currentPage = useAppSelector(state => state.archive.currentPage); // 현재 페이지
  const archives = useAppSelector(state => state.archive.archives); // 자료실 글 목록
  const notice = useAppSelector(state => state.archive.notice); // 공지 목록

  // 임시데이터
  const data = [
    { id: 9, category: '일반자료', title: '제목', createDate: '2022-08-09', new: 'true' },
    { id: 8, category: '일반자료', title: '제목', createDate: '2022-08-09', new: 'true' },
    { id: 7, category: '일반자료', title: '제목', createDate: '2022-08-08', new: 'true' },
    { id: 6, category: '일반자료', title: '제목', createDate: '2022-08-04', new: 'false' },
    { id: 5, category: '일반자료', title: '제목', createDate: '2022-08-03', new: 'false' },
    { id: 4, category: '일반자료', title: '제목', createDate: '2022-08-02', new: 'false' },
    { id: 3, category: '일반자료', title: '제목', createDate: '2022-07-30', new: 'false' },
    { id: 2, category: '일반자료', title: '제목', createDate: '2022-07-30', new: 'false' },
    { id: 1, category: '일반자료', title: '제목', createDate: '2022-07-23', new: 'false' },
  ];

  // 임시 데이터
  const noticeData = [
    { id: 5, category: '일반자료', title: '제목', createDate: '2022-08-10', new: 'true' },
    { id: 4, category: '일반자료', title: '제목', createDate: '2022-08-9', new: 'true' },
    { id: 3, category: '일반자료', title: '제목', createDate: '2022-08-03', new: 'false' },
  ];

  // 임시 데이터
  const detailData = {
    id: 0,
    title: 'ㅇㅇㅇ자료',
    createDate: '2022-08-10',
    content: 'ㅎㅎㅎ입니다',
    category: '전체',
    notice: 'true'
  };

  useEffect(() => {
    // 자료 목록 받아오기
    dispatch(getAllArchives({ archives: data, totalPage: 3, currentPage: 0 }));

    // 공지 목록 받아오기
    dispatch(getNotice({ notice: noticeData }));
  }, []);

  // 게시글 보기 (정보 받아오기)
  const openDetail = (id: number) => {
    dispatch(getDetailData({ detail: detailData }));
    navigate('/archive-detail');
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
        {notice.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46',
              backgroundColor: 'rgba(46, 125, 50, 0.1)'
            }}>
            <List sx={{ flex: 0.1 }}><ErrorIcon sx={{ color: 'darkgreen' }} /></List>
            <List sx={{ flex: 0.1 }}>{item.category}</List>
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
            <List sx={{ flex: 0.2 }}>{item.createDate}</List>

          </Box>
        ))}

        {/* 자료 목록 */}
        {archives.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flex: 1,
              p: 1.5,
              borderBottom: '1px solid #3B6C46'
            }}>
            <List sx={{ flex: 0.1 }}>{item.id}</List>
            <List sx={{ flex: 0.1 }}>{item.category}</List>
            <List
              onClick={() => navigate('/archive-detail')}
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
            <List sx={{ flex: 0.2 }}>{item.createDate}</List>

          </Box>
        ))}
      </Box>

      <Spacing />

      <Stack>
        <Pagination count={TotalPage} sx={{ m: '0 auto' }} />
      </Stack>
    </>
  )
};


const Spacing = styled(Container)(() => ({
  height: 50
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