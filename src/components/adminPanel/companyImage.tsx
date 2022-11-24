import React from 'react';
import {List, ListItem, Stack, styled, Typography} from "@mui/material";
import {addBannerFile, addLogoFile, deleteBanner, deleteOriginBanner} from "../../app/reducers/adminSlice";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

interface propsType {
  deleteOriginBannerImage: (index: number, name: string) => void
}

export default function CompanyImage({deleteOriginBannerImage}: propsType) {
  const dispatch = useAppDispatch();

  const logo = useAppSelector(state => state.manager.logo); // 기존 로고
  const logoFile = useAppSelector(state => state.manager.logoFile); // 추가한 로고
  const copyBanner = useAppSelector(state => state.manager.copyBanner); // 기존 배너
  const bannerFile = useAppSelector(state => state.manager.bannerFile); // 새로 추가한 배너

  // 배너 사진 추가
  const addBannerImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addBannerFile({
        banner: {
          id: Date.now(),
          file: event?.target.files[i],
          name: event?.target.files[i].name
        }
      }))
    }
  };

  // 새로 추가한 배너 삭제
  const deleteBannerImage = (index: number) => dispatch(deleteBanner({num: index}));

  return (
    <>
      <List>
        <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>
          ※ 배너 사진은 가로 세로 5:2 비율의 사진을 첨부해 주세요.
        </ListItem>
        <ListItem sx={{userSelect: 'none', color: 'darkgrey'}}>
          ※ 배너 사진은 최소 한 장 이상 필요합니다.
        </ListItem>
      </List>

      <ContentStack
        direction='row'
        sx={{pt: 2, borderTop: '2px solid rgba(46, 125, 50, 0.5)'}}>
        <LogoTitleBox>회사 로고</LogoTitleBox>

        <Typography sx={{flex: 0.8, color: 'darkgrey'}}>
          {logoFile.name !== '' ? logoFile.name : logo.originalFilename}
        </Typography>
        <label
          className='uploadButton'
          htmlFor='headerLogoInput'
          onChange={(event: any) => dispatch(addLogoFile({
            logo: {
              file: event?.target.files[0],
              name: event?.target.files[0].name
            }
          }))}
        >
          업로드
          <input type={'file'} id='headerLogoInput' accept='image/*'/>
        </label>
      </ContentStack>

      <ContentStack
        direction='row'
        sx={{pb: 2, borderBottom: '2px solid rgba(46, 125, 50, 0.5)'}}>
        <LogoTitleBox>배너 사진</LogoTitleBox>

        <Stack sx={{flex: 0.8}}>
          {/* 기존 배너 사진 */}
          {copyBanner?.map((item: {
            id: number,
            originalFilename: string,
            savedPath: string,
            serverFilename: string
          }, index: number) => (
            <Stack key={index} direction='row' sx={{alignItems: 'center'}}>
              <Typography sx={{color: 'darkgrey'}}>
                {item.originalFilename}
              </Typography>
              <ClearRoundedIcon
                onClick={() => deleteOriginBannerImage(index, item.serverFilename)}
                fontSize='small'
                sx={{color: 'lightgrey', cursor: 'pointer', ml: 1}}/>
            </Stack>
          ))}

          {/* 추가한 배너 사진 */}
          {bannerFile?.map((item: { id: number, file: string, name: string }, index: number) => (
            <Stack key={item.id} direction='row' sx={{alignItems: 'center'}}>
              <Typography sx={{color: 'darkgrey'}}>
                {item.name}
              </Typography>
              <ClearRoundedIcon
                onClick={() => deleteBannerImage(index)}
                fontSize='small'
                sx={{color: 'lightgrey', cursor: 'pointer', ml: 1}}/>
            </Stack>
          ))}
        </Stack>

        <label
          className='uploadButton'
          htmlFor='bannerInput'
          onChange={(event: any) => addBannerImage(event)}>
          업로드
          <input type={'file'} id='bannerInput' accept='image/*' multiple/>
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