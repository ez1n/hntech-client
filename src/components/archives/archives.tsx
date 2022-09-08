import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import { Box, Container, styled, Typography } from '@mui/material';
import ArchiveItem from './archiveItem';
import EditButton from '../editButton';
import EditArchiveCategory from './editArchiveCategory';
import { archiveApi } from '../../network/archive';
import { getAllArchives, getNotice } from '../../app/reducers/archiveSlice';

interface propsType {
  errorToast: (message: string) => void
}

export default function Archives({ errorToast }: propsType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const detail = useAppSelector(state => state.archive.detail); // 게시글 상세정보
  const archiveCategory = useAppSelector(state => state.category.archiveCategory); // 카테고리 목록 state

  useEffect(() => {
    // 자료실 목록 받아오기
    archiveApi.getArchives(0)
      .then(res => {
        dispatch(getAllArchives({
          archives: res.archives,
          totalPage: res.totalPages,
          currentPage: res.currentPage,
          totalElements: res.totalElements
        }));
      })

    // 공지 목록 받아오기
    archiveApi.getArchivesNotice()
      .then(res => {
        dispatch(getNotice({ notice: res.notices }))
      })
  }, [detail, archiveCategory]);

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <TitleTypography variant='h5'>
        고객 자료실
      </TitleTypography>

      {/* 버튼 */}
      <Spacing>
        {managerMode &&
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <EditButton name='카테고리 수정' onClick={() => dispatch(clickArchivesGoBack())} />
            <EditButton name='글쓰기' onClick={() => navigate('/archive-form')} />
          </Box>
        }

      </Spacing>

      {/* 자료 목록 */}
      <ArchiveItem />

      {/* 카테고리 수정 */}
      <EditArchiveCategory errorToast={errorToast} />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50,
  marginBottom: 10
})) as typeof Container;

const TitleTypography = styled(Typography)(({ theme }) => ({
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