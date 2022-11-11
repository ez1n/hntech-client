import React from 'react';
import {adminApi} from '../../network/admin';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {updateIntroduce} from '../../app/reducers/companyModifySlice';
import {Box, Container, TextField, Typography, styled} from '@mui/material';
import EditButton from '../editButton';
import {changeMode} from '../../app/reducers/adminSlice';

interface propsType {
  success: () => void,
  errorToast: (message: string) => void
}

export default function Introduce({success, errorToast}: propsType) {
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드 state
  const introduce = useAppSelector(state => state.companyModify.introduce); // 인사말 state

  // 인사말 수정
  const putIntroduce = () => {
    adminApi.putIntroduce(introduce)
      .then(res => {
        success();
        dispatch(updateIntroduce({newIntroduce: res.newIntroduce}));
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          errorToast('로그인이 필요합니다.');
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  return (
    <TotalBox>
      {/* 소제목 */}
      <Container sx={{display: 'flex', justifyContent: 'center'}}>
        <TitleTypography variant='h5'>
          인사말
        </TitleTypography>
      </Container>

      {/* 수정 버튼 */}
      <Spacing sx={{textAlign: 'end'}}>
        {managerMode && <EditButton name='수정' onClick={putIntroduce}/>}
      </Spacing>

      {/* 내용 */}
      {managerMode ?
        <Container sx={{textAlign: 'center', mt: 1}}>
          <TextField
            autoFocus
            multiline
            defaultValue={introduce.newIntroduce}
            onChange={event => dispatch(updateIntroduce({newIntroduce: event.target.value}))}
            minRows={10}
            InputProps={{style: {fontSize: 18}}}
            sx={{mt: 3, width: '100%'}}/>
        </Container> :
        <Container sx={{textAlign: 'center'}}>
          <IntroduceContentTypography>
            {introduce.newIntroduce}
          </IntroduceContentTypography>
        </Container>}
    </TotalBox>
  )
};

const Spacing = styled(Container)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    height: 30
  },
  height: 50
})) as typeof Container;

const TotalBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    padding: 10,
  },
  padding: 20,
  paddingBottom: 0
})) as typeof Box;

const TitleTypography = styled(Typography)(({theme}) => ({
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

const IntroduceContentTypography = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 15
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12
  },
  fontSize: 18,
  fontWeight: 'bold',
  color: 'rgb(43, 88, 53)',
  marginBottom: 20,
  textAlign: 'center',
  whiteSpace: 'pre-wrap'
})) as typeof Typography;