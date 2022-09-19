import React from 'react';
import {categoryApi} from "../../network/category";
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch} from "../../app/hooks";
import {setAllProductCategories} from "../../app/reducers/categorySlice";
import {Box, Stack, Typography} from "@mui/material";

interface propsType {
  categoryList: { categoryName: string, id: number }[],
  changeCategoryList: (categoryId: { categoryName: string, id: number }[]) => void,
  category: { categoryName: string, id: number },
  id: number,
  index: number
}

export default function ProductCategoryListItem({categoryList, changeCategoryList, category, id, index}: propsType) {
  const dispatch = useAppDispatch();

  // 순서변경
  const putUpdateCategorySequence = (draggedId: number, targetId: number) => {
    categoryApi.putUpdateCategorySequence({currentCategoryId: draggedId, targetCategoryId: targetId})
      .then(res => {
        categoryApi.getAllProductCategories()
          .then(res => dispatch(setAllProductCategories({categories: res.categories})))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  /* 드래그 앤 드롭 */

  // 제품 순서 변경 보여주기
  const moveCategoryItem = (moveItem: { categoryName: string, id: number }, targetIndex: number) => {
    const index = categoryList.indexOf(moveItem);
    let newIdList = [...categoryList];
    newIdList.splice(index, 1);
    newIdList.splice(targetIndex, 0, moveItem);
    changeCategoryList(newIdList);
  };

  // drag
  const [{isDragging}, dragRef] = useDrag(() => ({
      type: 'productCategory',
      item: {category, index},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {category: originCategory, index: originIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCategoryItem(originCategory, originIndex);
        }
        putUpdateCategorySequence(originCategory.id, category.id);
      },
    }),
    [category, index, moveCategoryItem]
  );

  // drop
  const [, dropRef] = useDrop(() => ({
      accept: 'productCategory',
      hover: (item: { category: { categoryName: string, id: number }, index: number }) => {
        const {category: draggedCategory, index: originIndex} = item;
        if (draggedCategory.id !== category.id) {
          moveCategoryItem(draggedCategory, index);
        }
      }
    })
  );

  return (
    <Box>
      <Stack
        ref={dropRef}
        direction='row'
        spacing={2}
        sx={{
          alignItems: 'center',
          p: 1,
          border: '1px solid lightgrey',
          borderRadius: '10px'
        }}>
        <Typography
          ref={dragRef}
          sx={{
            pl: 2,
            width: '100%',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}>
          {category.categoryName}
        </Typography>
      </Stack>
    </Box>
  )
}
