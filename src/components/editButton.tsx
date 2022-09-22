import React from 'react';
import {Button, styled} from '@mui/material';

interface propsType {
  name: string,
  onClick: () => void
}

export default function EditButton({name, onClick}: propsType) {
  return (
    <ButtonStyle onClick={onClick}>
      {name}
    </ButtonStyle>
  )
};

const ButtonStyle = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 12
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 10
  },
  margin: 10,
  color: '#2E7D32',
  border: '1px solid rgba(46, 125, 50, 0.5)',
  borderRadius: 10,
  backgroundColor: 'rgba(46, 125, 50, 0.1)'
})) as typeof Button;
