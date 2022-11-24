import React from 'react';
import {Button, MenuItem, Select, Stack, styled, TextField, Typography} from "@mui/material";
import {
  addSitesUploadButton,
  deleteSitesUploadButton,
  updateAddress,
  updateAfterService,
  updateFax,
  updateManagerReceivedMail,
  updateManagerSendEmailPassword,
  updateManagerSentMail,
  updateManagerTime,
  updatePhone,
  updateSiteButtonName,
  updateSiteLink
} from "../../app/reducers/adminSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export default function Company() {
  const dispatch = useAppDispatch();

  const newPanelData = useAppSelector(state => state.manager.newPanelData); // 관리자 정보 변경
  const {
    emailSendingTime,
    address,
    afterService,
    fax,
    phone,
    receiveEmailAccount,
    sendEmailAccount,
    sendEmailPassword,
    sites
  } = newPanelData;

  return (
    <>
      {/* 메일 주소 */}
      <ContentStack direction='row' spacing={5}>
        <TextField
          type={'email'}
          label={'수신 메일'}
          value={receiveEmailAccount}
          onChange={event => dispatch(updateManagerReceivedMail({receiveEmailAccount: event?.target.value}))}
          placeholder={'메일 주소'}
          autoComplete='off'
          sx={{flex: 0.45}}/>

        <TextField
          type={'email'}
          label={'발신 메일'}
          value={sendEmailAccount}
          onChange={event => dispatch(updateManagerSentMail({sendEmailAccount: event?.target.value}))}
          placeholder={'메일 주소'}
          autoComplete='off'
          sx={{flex: 0.45}}/>
      </ContentStack>

      {/* 발신 메일 비밀번호, 메일 발송 시간 */}
      <ContentStack direction='row' spacing={5}>
        <TextField
          type={'password'}
          label={'발신 메일 비밀번호'}
          value={sendEmailPassword}
          onChange={event => dispatch(updateManagerSendEmailPassword({sendEmailPassword: event?.target.value}))}
          placeholder={'발신 메일 비밀번호'}
          autoComplete='off'
          sx={{flex: 0.45}}/>

        <ContentStack direction='column' sx={{pb: 2, alignItems: 'flex-start', flex: 0.45}}>
          <Typography variant='caption' sx={{textAlign: 'left'}}>메일 발송 시간</Typography>
          <Select
            defaultValue={emailSendingTime}
            onChange={event => dispatch(updateManagerTime({emailSendingTime: event?.target.value}))}
            MenuProps={{
              PaperProps: {sx: {maxHeight: 300}}
            }}
            sx={{
              textAlign: 'center',
              fontSize: 18,
              width: '100%'
            }}>
            <MenuList value='5'>05:00</MenuList><MenuList value='6'>06:00</MenuList>
            <MenuList value='7'>07:00</MenuList><MenuList value='8'>08:00</MenuList>
            <MenuList value='9'>09:00</MenuList><MenuList value='10'>10:00</MenuList>
            <MenuList value='11'>11:00</MenuList><MenuList value='12'>12:00</MenuList>
            <MenuList value='13'>13:00</MenuList><MenuList value='14'>14:00</MenuList>
            <MenuList value='15'>15:00</MenuList><MenuList value='16'>16:00</MenuList>
            <MenuList value='17'>17:00</MenuList><MenuList value='18'>18:00</MenuList>
            <MenuList value='19'>19:00</MenuList><MenuList value='20'>20:00</MenuList>
            <MenuList value='21'>21:00</MenuList><MenuList value='22'>22:00</MenuList>
            <MenuList value='23'>23:00</MenuList><MenuList value='0'>00:00</MenuList>
            <MenuList value='1'>01:00</MenuList><MenuList value='2'>02:00</MenuList>
            <MenuList value='3'>03:00</MenuList><MenuList value='4'>04:00</MenuList>
          </Select>
        </ContentStack>
      </ContentStack>

      {/* 주소, AS */}
      <ContentStack direction='row' spacing={5}>
        <TextField
          type={'text'}
          label={'본사 주소'}
          multiline
          value={address}
          onChange={event => dispatch(updateAddress({address: event?.target.value}))}
          placeholder={'본사 주소'}
          autoComplete='off'
          sx={{flex: 0.45}}/>
        <TextField
          type={'text'}
          label={'A/S'}
          value={afterService}
          onChange={event => dispatch(updateAfterService({afterService: event?.target.value}))}
          placeholder={'A/S'}
          autoComplete='off'
          sx={{flex: 0.45}}/>
      </ContentStack>

      {/* TEL, FAX */}
      <ContentStack direction='row' spacing={5} sx={{pb: 2}}>
        <TextField
          type={'text'}
          label={'TEL'}
          value={phone}
          onChange={event => dispatch(updatePhone({phone: event?.target.value}))}
          placeholder={'TEL'}
          autoComplete='off'
          sx={{flex: 0.45}}/>

        <TextField
          type={'text'}
          label={'FAX'}
          value={fax}
          onChange={event => dispatch(updateFax({fax: event?.target.value}))}
          placeholder={'FAX'}
          autoComplete='off'
          sx={{flex: 0.45}}/>
      </ContentStack>

      {/* FAMILY SITE */}
      <ContentStack spacing={2} sx={{borderBottom: '2px solid rgba(46, 125, 50, 0.5)', pb: 2}}>
        {sites.map((item: { buttonName: string, link: string, id: number }, index) => (
          <ContentStack key={item.id} direction='row' spacing={2}>
            <TextField
              size='small'
              label='NAME'
              defaultValue={item.buttonName}
              placeholder='SITE Name'
              autoComplete='off'
              onChange={event => dispatch(updateSiteButtonName({buttonName: event.target.value, index: index}))}
              sx={{flex: 0.3}}/>

            <TextField
              size='small'
              label='LINK'
              defaultValue={item.link}
              placeholder='LINK'
              autoComplete='off'
              onChange={event => dispatch(updateSiteLink({link: event.target.value, index: index}))}
              sx={{flex: 0.6}}/>

            <Button
              onClick={() => dispatch(deleteSitesUploadButton({index: index}))}
              sx={{color: 'darkgreen'}}>
              <DeleteIcon/>
            </Button>
          </ContentStack>
        ))}

        <Button
          onClick={() => dispatch(addSitesUploadButton())}
          sx={{
            color: 'rgba(46, 125, 50, 0.5)',
            '&: hover': {backgroundColor: 'rgba(46, 125, 50, 0.1)'}
          }}>
          SITE MAP 추가
        </Button>
      </ContentStack>
    </>
  )
}

const ContentStack = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center'
})) as typeof Stack;

const MenuList = styled(MenuItem)(() => ({
  justifyContent: 'center'
})) as typeof MenuItem;