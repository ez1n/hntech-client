import React from 'react';
import { Button } from '@mui/material';

export default function EditButton(name: string, onClick: any) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: '#2E7D32',
        border: '1px solid rgba(46, 125, 50, 0.5)',
        borderRadius: 2,
        backgroundColor: 'rgba(46, 125, 50, 0.1)'
      }}>
      {name}
    </Button>
  )
}