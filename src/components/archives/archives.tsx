import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import { Container, styled, Typography } from '@mui/material';
import ArchiveItem from './archiveItem';
import EditButton from '../editButton';
import EditArchiveCategory from './editArchiveCategory';
import { archiveApi } from '../../network/archive';
import { getAllArchives, getNotice } from '../../app/reducers/archiveSlice';

export default function Archives() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

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
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography
        variant='h5'
        sx={{
          p: 1,
          width: 'max-content',
          borderBottom: '3px solid #2E7D32',
        }}>
        고객 자료실
      </Typography>

      {/* 버튼 */}
      <Spacing sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {managerMode &&
          <>
            {EditButton('카테고리 수정', () => dispatch(clickArchivesGoBack()))}
            {EditButton('글쓰기', () => navigate('/archive-form'))}
          </>
        }

      </Spacing>

      {/* 자료 목록 */}
      <ArchiveItem />

      {/* 카테고리 수정 */}
      <EditArchiveCategory />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;