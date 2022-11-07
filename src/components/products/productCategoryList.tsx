import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {clickProductCategoryListGoBack} from "../../app/reducers/dialogSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  styled
} from "@mui/material";
import ProductCategoryListItem from "./productCategoryListItem";

export default function ProductCategoryList() {
  const dispatch = useAppDispatch();

  const productCategories = useAppSelector(state => state.category.productCategories); // 카테고리 목록 state
  const productCategoryListState = useAppSelector(state => state.dialog.productCategoryListState);
  const [categoryList, setCategoryList] = useState<{ categoryName: string, id: number }[]>([]);

  useEffect(() => {
    let categoryId: { categoryName: string, id: number }[] = [];
    productCategories.map((item: { categoryName: string, id: number }) => categoryId.push({
      categoryName: item.categoryName,
      id: item.id
    }));
    setCategoryList(categoryId);
  }, [productCategories]);

  // 카테고리 순서 변경 보여주기
  const moveCategoryItem = (id: number, targetIndex: number) => {
    const index = categoryList.findIndex(category => category.id === id);
    let newIdList = [...categoryList];
    const moveItem = newIdList.splice(index, 1)[0];
    newIdList.splice(targetIndex + 1, 0, moveItem);
    setCategoryList(newIdList);
  };

  return (
    <Dialog
      open={productCategoryListState}
      onClose={() => dispatch(clickProductCategoryListGoBack())}>
      <Title>제품 카테고리 수정</Title>

      <DialogContent>
        <ContentText>카테고리 목록</ContentText>

        <Stack
          direction='column'
          spacing={1}
          sx={{
            height: 350,
            overflow: 'auto'
          }}>
          {categoryList.map((item: { categoryName: string, id: number }, index: number) => (
            <ProductCategoryListItem
              key={item.id}
              category={item}
              id={item.id}
              index={index}/>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{justifyContent: 'center'}}>
        <Button onClick={() => dispatch(clickProductCategoryListGoBack())}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
};

const Title = styled(DialogTitle)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 25,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
  fontSize: 30,
  textAlign: 'center',
  marginRight: 10,
  marginLeft: 10
})) as typeof DialogTitle;

const ContentText = styled(DialogContentText)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 19,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
  paddingBottom: 15,
  marginBottom: 25,
  fontSize: 22,
  borderBottom: '2px solid rgba(46, 125, 50, 0.5)'
})) as typeof DialogContentText;