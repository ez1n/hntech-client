import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { Toolbar, Typography, Button, Stack, Box, Paper } from '@mui/material';

export default function Header(props) {
  const navigate = useNavigate();

  // 드롭다운 메뉴 open state
  const [openCompany, setOpenCompany] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openService, setOpenService] = useState(false);

  // 하위 메뉴 component
  function DropdownMenu(props) {
    return (
      <Button
        sx={{
          justifyContent: 'center',
          fontSize: 13,
          color: '#0F0F0F',
          '&:hover': {
            backgroundColor: 'rgba(57, 150, 82, 0.2)',
          },
        }}>
        {props.item}
      </Button>
    )
  };

  // 페이지 이동 이벤트
  const onClickMenu = (menu) => { navigate(menu) };

  return (
    <Toolbar sx={{ pt: 2, pb: 2, position: 'sticky', top: 0 }}>
      {/* 로고 */}
      <Button sx={{ pl: 5, pr: 5 }} onClick={() => onClickMenu('/')}>
        {/* 로고 이미지 - 서버에서 받아오기 */}
        <img className='logoImage' src='/images/logo.png' alt='HNTECH logo' />
        <Typography sx={{ ml: 3, fontSize: '2.5em', fontWeight: 'bold', color: '#0F0F0F' }}>HNTECH</Typography>
      </Button>

      {/* 메뉴 */}
      <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-around' }}>
        {/* 회사소개 */}
        <Box onMouseLeave={() => setOpenCompany(!openCompany)}>
          <Button
            onMouseOver={() => setOpenCompany(!openCompany)}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            회사소개
          </Button>
          {openCompany &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute'
              }}>
              <DropdownMenu item={'인사말'} />
              <DropdownMenu item={'회사 연혁'} />
              <DropdownMenu item={'조직도'} />
              <DropdownMenu item={'CI 소개'} />
              <DropdownMenu item={'찾아오시는 길'} />
            </Paper>
          }
        </Box>

        {/* 제품소개 */}
        <Box onMouseLeave={() => setOpenProduct(false)}> 
          <Button
            onMouseOver={() => setOpenProduct(true)}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            제품소개
          </Button>
          {openProduct &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu item={'스프링클러헤드'} />
              <DropdownMenu item={'유수제어밸브'} />
              <DropdownMenu item={'기타'} />
            </Paper>
          }
        </Box>

        {/* 고객지원 */}
        <Box onMouseLeave={() => setOpenService(!openService)}>
          <Button
            onMouseOver={() => setOpenService(!openService)}
            sx={{ fontSize: '1.3em', color: '#0F0F0F' }}>
            고객지원
          </Button>
          {openService &&
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
              }}>
              <DropdownMenu item={'공지사항'} />
              <DropdownMenu item={'자료실'} />
              <DropdownMenu item={'카다록 및 자재승인서'} />
              <DropdownMenu item={'고객문의'} />
            </Paper>
          }
        </Box>
      </Stack>
    </Toolbar>
  )
};
