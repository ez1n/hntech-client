import React, { useEffect } from 'react';
import { adminApi } from '../../network/admin';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateIntroduce } from '../../app/reducers/companyModifySlice';
import { styled } from '@mui/system';
import {
  Box,
  Container,
  TextField,
  Typography
} from '@mui/material';
import EditButton from '../editButton';

export default function Introduce() {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const introduce = useAppSelector(state => state.companyModify.introduce); // 인사말 state

  // 인사말 받아오기
  useEffect(() => {
    adminApi.getIntroduce()
      .then(res => dispatch(updateIntroduce({ newIntroduce: res.data.newIntroduce })))
      .catch(error => console.log(error))
  }, []);

  // 인사말 수정
  const putIntroduce = () => {
    adminApi.putIntroduce(introduce)
      .then(res => {
        dispatch(updateIntroduce({ newIntroduce: res.newIntroduce }));
      })
      .catch(error => console.log(error))
  };

  return (
    <Box sx={{ p: 5, pb: 0 }}>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant='h5'
          sx={{
            p: 1,
            width: 'max-content',
            borderBottom: '3px solid #2E7D32',
          }}>
          인사말
        </Typography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode && EditButton('수정', putIntroduce)}
      </Spacing>

      {/* 내용 */}
      {managerMode ?
        <Container sx={{ textAlign: 'center' }}>
          <TextField
            type='text'
            multiline
            value={introduce.newIntroduce}
            onChange={event => dispatch(updateIntroduce({ newIntroduce: event?.target.value }))}
            minRows={10}
            InputProps={{
              style: { fontSize: 18 }
            }}
            sx={{
              m: 3,
              width: '90%'
            }} />
        </Container> :
        <Container sx={{ textAlign: 'center' }}>
          {introduce.newIntroduce.split('\n').map((value, index) => (
            <Typography sx={{
              fontSize: 18,
              mb: 5,
              textAlign: 'center'
            }}
              key={index}>
              {value}
            </Typography>
          ))}
        </Container>}
    </Box>
  )
};

const Spacing = styled(Container)(() => ({
  height: 50
})) as typeof Container;