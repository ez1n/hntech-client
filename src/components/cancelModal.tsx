import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface propsType {
  openState: boolean,
  title: string,
  text1: string,
  text2: string,
  yesAction: () => void,
  closeAction: () => void
}

export default function CancelModal(props: propsType) {
  return (
    <Dialog
      open={props.openState}
      onClose={() => props.closeAction}>
      <DialogTitle>
        {props.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.text1}
        </DialogContentText>
        <DialogContentText>
          {props.text2}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.yesAction}>
          네
        </Button>
        <Button onClick={props.closeAction}>
          아니오
        </Button>
      </DialogActions>
    </Dialog>
  )
};