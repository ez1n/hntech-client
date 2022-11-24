import React from 'react';
import {List, ListItem, Stack, styled, Typography} from "@mui/material";
import {addApproval, addCatalog, addTax} from "../../app/reducers/adminSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export default function Documents() {
  const dispatch = useAppDispatch();

  const documentName = useAppSelector(state => state.manager.document); // 기존 카다록, 자재승인서 이름
  const documentFile = useAppSelector(state => state.manager.documentFile); // 새로 추가한 카다록, 자재 승인서

  return (
    <>
      <List>
        <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>
          ※ 미리보기는 pdf 파일만 지원됩니다.
        </ListItem>
      </List>

      {/* 카다록, 자재 승인서, 시국세 */}
      <ContentStack
        direction='row'
        sx={{pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)'}}>
        <LogoTitleBox sx={{flex: 0.3}}>카다록</LogoTitleBox>

        <Typography sx={{flex: 0.6, color: 'darkgrey'}}>
          {documentFile.catalog.name !== '' ? documentFile.catalog.name : documentName.catalogOriginalFilename}
        </Typography>

        <label
          className='uploadButton'
          htmlFor='catalogInput'
          onChange={(event: any) => dispatch(addCatalog({
            catalog: {
              file: event?.target.files[0],
              name: event?.target.files[0].name
            }
          }))}
        >
          업로드
          <input type={'file'} id='catalogInput'/>
        </label>
      </ContentStack>

      <ContentStack direction='row'>
        <LogoTitleBox sx={{flex: 0.3}}>자재승인서</LogoTitleBox>
        <Typography sx={{flex: 0.6, color: 'darkgrey'}}>
          {documentFile.approval.name !== '' ? documentFile.approval.name : documentName.materialOriginalFilename}
        </Typography>

        <label
          className='uploadButton'
          htmlFor='approvalInput'
          onChange={(event: any) => dispatch(addApproval({
            approval: {
              file: event?.target.files[0],
              name: event?.target.files[0].name
            }
          }))}
        >
          업로드
          <input type={'file'} id='approvalInput'/>
        </label>
      </ContentStack>

      <ContentStack
        direction='row'
        sx={{pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)'}}>
        <LogoTitleBox sx={{flex: 0.3}}>시국세</LogoTitleBox>

        <Typography sx={{flex: 0.6, color: 'darkgrey'}}>
          {documentFile.tax.name !== '' ? documentFile.tax.name : documentName.taxOriginalFilename}
        </Typography>

        <label
          className='uploadButton'
          htmlFor='taxInput'
          onChange={(event: any) => dispatch(addTax({
            tax: {
              file: event?.target.files[0],
              name: event?.target.files[0].name
            }
          }))}>
          업로드
          <input type={'file'} id='taxInput'/>
        </label>
      </ContentStack>
    </>
  );
}

const ContentStack = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center'
})) as typeof Stack;

const LogoTitleBox = styled(Typography)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: 15,
  },
  fontSize: 20,
  marginRight: 30,
  textAlign: 'center'
})) as typeof Typography;