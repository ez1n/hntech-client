import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, styled, Typography } from '@mui/material';
import ArchiveItem from './archiveItem';
import EditButton from '../editButton';
import CategorySelect from '../categorySelect';
import { clickGoBack } from '../../app/reducers/dialogSlice';
import EditCategory from './editCategory';

export default function Archives() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state

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
            {EditButton('카테고리 수정', () => dispatch(clickGoBack()))}
            {EditButton('글쓰기', () => navigate('/archive-form'))}
          </>
        }
        <CategorySelect />
      </Spacing>

      {/* 자료 목록 */}
      <ArchiveItem />

      <EditCategory />
    </Container>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;