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

interface propsType {
  success: () => void
}

export default function Introduce({ success }: propsType) {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const introduce = useAppSelector(state => state.companyModify.introduce); // 인사말 state

  // 인사말 받아오기
  useEffect(() => {
    adminApi.getIntroduce()
      .then(res => dispatch(updateIntroduce({ newIntroduce: res.newIntroduce })))
      .catch(error => console.log(error))
  }, []);

  // 인사말 수정
  const putIntroduce = () => {
    adminApi.putIntroduce(introduce)
      .then(res => {
        success();
        dispatch(updateIntroduce({ newIntroduce: res.newIntroduce }));
      })
      .catch(error => console.log(error))
  };

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <TitleTypography variant='h5'>
          인사말
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{ textAlign: 'end' }}>
        {managerMode && <EditButton name='수정' onClick={putIntroduce} />}
      </Spacing>

      {/* 내용 */}
      {managerMode ?
        <Container sx={{ textAlign: 'center' }}>
          <TextField
            type='text'
            autoFocus={true}
            autoComplete='off'
            multiline
            value={introduce.newIntroduce}
            onChange={event => dispatch(updateIntroduce({ newIntroduce: event?.target.value }))}
            minRows={10}
            InputProps={{
              style: { fontSize: 18 }
            }}
            sx={{ mt: 3, width: '100%' }} />
        </Container> :
        <Container sx={{ textAlign: 'center' }}>
          {introduce.newIntroduce.split('\n').map((value, index) => (
            <IntroduceContentTypography key={index}>
              {value}
            </IntroduceContentTypography>
          ))}
        </Container>}
    </TotalBox>
  )
};

const Spacing = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height: 30
  },
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 14
  },
  padding: 1,
  width: 'max-content',
  borderBottom: '3px solid #2E7D32',
})) as typeof Typography;

const IntroduceContentTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 15
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  },
  fontSize: 18,
  marginBottom: 20,
  textAlign: 'center'
})) as typeof Typography;