import React, { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  updateProductName,
  updateProductDescription,
  addProductImagePath,
  deleteProductImagePath,
  addGradeImagePath,
  deleteGradeImagePath
} from '../../app/reducers/productContentSlice';
import {
  addFile,
  deleteFileName,
  addUploadButton,
  deleteUploadButton
} from '../../app/reducers/productFileSlice';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import ProductCategorySelect from '../productCategorySelect';
import EditButton from '../editButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Form() {
  const dispatch = useAppDispatch();

  // 제품, 규격 사진 Ref
  const photoInputRef: any = useRef();
  const gradeInputRef: any = useRef();

  const productImage = useAppSelector(state => state.productContent.productPath); // 제품 사진 state
  const gradeImage = useAppSelector(state => state.productContent.gradePath); // 규격 사진 state
  const file = useAppSelector(state => state.productFile.file); // 파일 state

  // input - button 연결(input 숨기기)
  const selectInput = (item: any) => { item.current?.click() };

  // 제품 사진 미리보기
  const selectProductImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addProductImagePath({ item: URL.createObjectURL(event.target.files[i]) }))
    };
  };

  // 규격 사진 미리보기
  const selectGradeImage = (event: any) => {
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addGradeImagePath({ item: URL.createObjectURL(event.target.files[i]) }))
    }
  };

  // 파일 이름 미리보기
  const selectFile = (key: number, event: any) => { dispatch(addFile({ key: key, item: event.target.files[0].name })) };

  return (
    <Box sx={{
      borderTop: '3px solid #2E7D32',
      borderBottom: '3px solid #2E7D32',
    }}>

      {/* 제목 */}
      <Box sx={{
        textAlign: 'center',
        borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
        p: 2
      }}>
        <TextField
          type='text'
          required={true}
          autoFocus={true}
          placeholder='제품명'
          onChange={(event) => dispatch(updateProductName({ name: event?.target.value }))}
          inputProps={{
            style: {
              fontSize: 20
            }
          }}
          sx={{
            width: '100%'
          }}
        />
      </Box>

      {/* 사진 추가, 카테고리 선택 */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(46, 125, 50, 0.5)',
        pr: 1,
        pl: 1
      }}>
        <Box>
          {/* 숨김 input */}
          <label ref={photoInputRef} htmlFor='inputPhoto' onChange={(event) => selectProductImage(event)}>
            <input className='productInput' type='file' id='inputPhoto' multiple accept='image/*' />
          </label>

          <label ref={gradeInputRef} htmlFor='inputGrade' onChange={(event) => selectGradeImage(event)}>
            <input className='productInput' type='file' id='inputGrade' multiple accept='image/*' />
          </label>

          {/* 보여지는 button */}
          {EditButton('제품 사진 추가', () => selectInput(photoInputRef))}
          {EditButton('규격 사진 추가', () => selectInput(gradeInputRef))}
        </Box>
        {ProductCategorySelect('스프링쿨러헤드')}
      </Box>

      {/* 제품 사진 미리보기 */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(46, 125, 50, 0.5)', }}>
        <Container
          sx={{
            border: '1.8px solid lightgrey',
            borderRadius: 1,
            mb: 2,
            height: 250,
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            alignItems: 'center'
          }}>
          {productImage.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>제품 사진 미리보기</Typography>}
          {productImage.map((file, index) => (
            <Box key={index} sx={{ width: '23%', m: 1 }}>
              <Box sx={{ textAlign: 'end' }}>
                <ClearRoundedIcon
                  onClick={() => dispatch(deleteProductImagePath({ num: index }))}
                  sx={{ color: 'darkgreen', cursor: 'pointer' }} />
              </Box>
              <img src={file} alt='제품 사진' width='100%' />
            </Box>
          ))}
        </Container>

        {/* 제품 설명 */}
        <TextField
          placeholder='제품 설명'
          multiline
          minRows={3}
          onChange={event => dispatch(updateProductDescription({ description: event.target.value }))}
          inputProps={{
            style: {
              fontSize: 18
            }
          }}
          sx={{ width: '100%', mb: 2 }}
        />

        {/* 규격 사진 미리보기 */}
        <Container
          sx={{
            border: '1.8px solid lightgrey',
            borderRadius: 1,
            mb: 2,
            height: 300,
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
            alignItems: 'center'
          }}>
          {gradeImage.length === 0 && <Typography sx={{ color: 'lightgrey', fontSize: 18 }}>규격 사진 미리보기</Typography>}
          {gradeImage.map((file, index) => (
            <Box key={index} sx={{ width: '23%', m: 1 }}>
              <Box sx={{ textAlign: 'end' }}>
                <ClearRoundedIcon
                  onClick={() => dispatch(deleteGradeImagePath({ num: index }))}
                  sx={{ color: 'darkgreen', cursor: 'pointer' }} />
              </Box>
              <img src={file} alt='규격 사진' width='100%' />
            </Box>
          ))}
        </Container>

        {/* 파일 업로드 (다운로드 가능한 자료) */}
        <Stack direction='column' spacing={2}>
          {file.map((item, index) => (
            <Stack key={index} direction='row' spacing={1} sx={{ alignItems: 'center' }}>
              <TextField
                size='small'
                placeholder='파일 이름'
                inputProps={{
                  style: {
                    fontSize: 18
                  }
                }} />
              <Typography sx={{
                pl: 2,
                width: '100%',
                height: 40,
                border: '1.8px solid lightgrey',
                borderRadius: 1,
                color: 'darkgrey',
                display: 'flex',
                alignItems: 'center'
              }}>
                <>
                  {item.name}
                  {item.name ? <ClearRoundedIcon onClick={() => dispatch(deleteFileName({ key: item.key }))} fontSize='small' sx={{ ml: 1, cursor: 'pointer' }} /> : '파일'}
                </>
              </Typography>
              <label className='fileUploadButton' htmlFor={`inputFile${item.key}`} onChange={(event) => { selectFile(item.key, event) }}>
                업로드
                <input className='productInput' type='file' id={`inputFile${item.key}`} multiple accept='.pdf, .doc, .docx, .hwp, .hwpx' />
              </label>
              {file.length === 1 ?
                <Button disabled onClick={() => dispatch(deleteUploadButton({ key: index }))} sx={{ color: 'darkgreen' }}>
                  <DeleteIcon />
                </Button> :
                <Button onClick={() => dispatch(deleteUploadButton({ key: index }))} sx={{ color: 'darkgreen' }}>
                  <DeleteIcon />
                </Button>
              }
            </Stack>
          ))}

          <Button onClick={() => dispatch(addUploadButton())} sx={{ color: 'rgba(46, 125, 50, 0.5)', '&: hover': { backgroundColor: 'rgba(46, 125, 50, 0.1)' } }}>파일 추가</Button>
        </Stack>
      </Box>
    </Box>
  )
}