import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getArchiveCategory } from '../../app/reducers/archiveCategorySlice';
import { clickArchivesGoBack } from '../../app/reducers/dialogSlice';
import { Container, styled, Typography } from '@mui/material';
import ArchiveItem from './archiveItem';
import EditButton from '../editButton';
import CategorySelect from '../archiveCategorySelect';
import EditArchiveCategory from './editArchiveCategory';

export default function Archives() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  //// 읭 이거 archivesState는 어디서 써? (cancel)
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

        {/* 카테고리 */}
        {CategorySelect('전체')}
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