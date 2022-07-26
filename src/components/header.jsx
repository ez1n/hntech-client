import React, { useState } from 'react';
import styles from './header.module.css';
import { Toolbar, Typography, Button, Stack, Box, Menu, MenuItem } from '@mui/material';

export default function Header(props) {
  const [anchorCompany, setAnchorCompany] = useState(null);
  const [anchorProduct, setAnchorProduct] = useState(null);
  const [anchorService, setAnchorService] = useState(null);

  const openCompany = Boolean(anchorCompany);
  const openProduct = Boolean(anchorProduct);
  const openService = Boolean(anchorService);

  function MenuButton(props) {
    return (
      <Button onMouseOver={props.onHover} sx={{ fontSize: '1.2em', color: '#0F0F0F' }}>
        {props.menu}
      </Button>
    )
  };

  return (
    <Toolbar sx={{ p: 2, position: 'sticky', top: 0 }}>
      {/* 로고 */}
      <Button sx={{ pl: 5, pr: 5 }}>
        <img className={styles.logoImage} src='/images/logo.png' alt='HNTECH logo' />
        <Typography sx={{ ml: 3, fontSize: '2.5em', fontWeight: 'bold', color: '#0F0F0F' }}>HNTECH</Typography>
      </Button>

      {/* 메뉴 */}
      <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-around' }}>
        <Box>
          <MenuButton
            menu={'회사소개'}
            onHover={event => setAnchorCompany(event.currentTarget)} />
          <Menu
            anchorEl={anchorCompany}
            open={openCompany}
            onMouseLeave={() => setAnchorCompany(null)}>
            <MenuItem sx={{justifyContent: 'center'}}>인사말</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>회사 연혁</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>조직도</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>CI 소개</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>찾아오시는 길</MenuItem>
          </Menu>
        </Box>

        <Box>
          <MenuButton
            menu={'제품소개'}
            onHover={event => setAnchorProduct(event.currentTarget)} />
          <Menu
            anchorEl={anchorProduct}
            open={openProduct}
            onMouseLeave={() => setAnchorProduct(null)}>
            <MenuItem sx={{justifyContent: 'center'}}>스프링클러헤드</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>유수제어밸브</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>기타</MenuItem>
          </Menu>
        </Box>

        <Box>
          <MenuButton
            menu={'고객지원'}
            onHover={event => setAnchorService(event.currentTarget)} />
          <Menu
          anchorEl={anchorService}
            open={openService}
            onMouseLeave={() => setAnchorService(null)}>
            <MenuItem sx={{justifyContent: 'center'}}>공지사항</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>자료실</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>고객문의</MenuItem>
            <MenuItem sx={{justifyContent: 'center'}}>카다록 및 자재승인서</MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Toolbar>
  )
};
