import React, { useRef } from 'react';
import { fileApi } from '../../network/file';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { clickProductFormGoBack } from '../../app/reducers/dialogSlice';
import { resetArchiveFileData } from '../../app/reducers/archiveFileSlice';
import {
  updateProductName,
  updateProductDescription,
  addProductImagePath,
  deleteProductImagePath,
  addGradeImagePath,
  deleteGradeImagePath,
  updateProductImage,
  updateGradeImage,
  deleteProductImage,
  deleteGradeImage
} from '../../app/reducers/productContentSlice';
import {
  addFile,
  deleteFileName,
  addUploadButton,
  deleteUploadButton,
  updateProductFile,
  deleteProductFile
} from '../../app/reducers/productFileSlice';
import {
  Container,
  styled,
  Typography,
  Box,
  Button,
  Stack,
  TextField
} from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditButton from '../editButton';
import CancelModal from '../cancelModal';
import ProductCategorySelect from '../productCategorySelect';

export default function ProductForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 제품, 규격 사진 Ref
  const photoInputRef: any = useRef();
  const gradeInputRef: any = useRef();

  // 제품, 규격 사진, 첨부파일 폼데이터
  const productData = new FormData();
  const gradeData = new FormData();
  const fileData = new FormData();

  const productFormState = useAppSelector(state => state.dialog.productFormState); // 글쓰기 취소 state
  const productContent = useAppSelector(state => state.productContent.productContent); // 제품 등록 내용
  const gradeImage = useAppSelector(state => state.productContent.gradePath); // 규격 사진 state
  const file = useAppSelector(state => state.productFile.file); // 파일 state
  const productImage = useAppSelector(state => state.productContent.productImage); // 전송할 제품 사진 state

  // input - button 연결(input 숨기기)
  const selectInput = (item: any) => { item.current?.click() };

  // 제품 사진 추가
  const selectProductImage = (event: any) => {
    // 미리보기
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addProductImagePath({ item: URL.createObjectURL(event.target.files[i]) }))
    };

    // 전송할 제품 사진 데이터
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(updateProductImage({ file: event.target.files[i] }))
    };
  };

  // 규격 사진 추가
  const selectGradeImage = (event: any) => {
    // 미리보기
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(addGradeImagePath({ item: URL.createObjectURL(event.target.files[i]) }))
    };

    // 전송할 규격 사진 데이터
    for (let i = 0; i < event.target.files.length; i++) {
      dispatch(updateGradeImage({ file: event.target.files[i] }))
    };
  };

  // 첨부파일 추가
  const selectFile = (key: number, event: React.FormEvent<HTMLLabelElement>) => {
    // 미리보기
    dispatch(addFile({ key: key, item: event.target.files[0].name }));

    // 전송할 파일 데이터
    dispatch(updateProductFile({ file: event.target.files[0] }));
  };

  // 제품 등록
  const postProduct = () => {
    productImage.map(item => productData.append('files', item))
    fileApi.postUploadAllFiles(productData)
      .then(res => {
        console.log(resetArchiveFileData);

        navigate('product');
      })
      .catch(error => console.log(error))
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* 소제목 */}
      <Typography variant='h5' p={1}>제품등록</Typography>

      <Spacing />

      {/* 제품 등록 폼 */}
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
                    onClick={() => {
                      dispatch(deleteProductImagePath({ num: index }));
                      dispatch(deleteProductImage({ num: index }));
                    }}
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
                    onClick={() => {
                      dispatch(deleteGradeImagePath({ num: index }));
                      dispatch(deleteGradeImage({ num: index }));
                    }}
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
                    {item.name ?
                      <ClearRoundedIcon
                        onClick={() => {
                          dispatch(deleteFileName({ key: item.key }));
                          dispatch(deleteProductFile({ num: index }))
                        }}
                        fontSize='small'
                        sx={{ ml: 1, cursor: 'pointer' }} /> :
                      '파일'}
                  </>
                </Typography>
                <label className='fileUploadButton' htmlFor={`inputFile${item.key}`} onChange={event => { selectFile(item.key, event) }}>
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

            <Button
              onClick={() => dispatch(addUploadButton())}
              sx={{
                color: 'rgba(46, 125, 50, 0.5)',
                '&: hover': { backgroundColor: 'rgba(46, 125, 50, 0.1)' }
              }}>
              파일 추가
            </Button>
          </Stack>
        </Box>
      </Box>

      <Spacing />

      {/* 버튼 */}
      <Spacing sx={{ textAlign: 'center' }}>
        {EditButton('작성완료', postProduct)}
        {EditButton('취소', () => dispatch(clickProductFormGoBack()))}
      </Spacing>

      {/* 취소 버튼 Dialog */}
      <CancelModal
        openState={productFormState}
        title='작성 취소'
        text1='작성중인 내용이 사라집니다.'
        text2='취소하시겠습니까?'
        yesAction={() => {
          dispatch(clickProductFormGoBack());
          navigate(-1);
        }}
        closeAction={() => dispatch(clickProductFormGoBack())} />
    </Container >
  )
};

const Spacing = styled(Container)(() => ({
  height: 30
})) as typeof Container;