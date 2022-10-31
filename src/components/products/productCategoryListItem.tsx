import React from 'react';
import {categoryApi} from "../../network/category";
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch} from "../../app/hooks";
import {setAllProductCategories} from "../../app/reducers/categorySlice";
import {Box, Stack, Typography} from "@mui/material";

interface propsType {
  moveCategoryItem: (id: number, targetIndex: number) => void,
  category: { categoryName: string, id: number },
  id: number,
  index: number
}

export default function ProductCategoryListItem({moveCategoryItem, category, id, index}: propsType) {
  const dispatch = useAppDispatch();

  // 순서변경
  const putUpdateCategorySequence = (draggedId: number, targetId: number) => {
    categoryApi.putUpdateCategorySequence({currentCategoryId: draggedId, targetCategoryId: targetId})
      .then(res => {
        categoryApi.getMainProductCategory()
          .then(res => dispatch(setAllProductCategories({categories: res.categories})))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  /* 드래그 앤 드롭 */

  // drag
  const [{isDragging}, dragRef] = useDrag(() => ({
      type: 'productCategory',
      item: {id, index},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const {id: originId, index: originIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          putUpdateCategorySequence(originId, 0);
        }
      },
    }),
    [id, index]
  );

  // drop
  const [{isOver}, dropRef] = useDrop(() => ({
      accept: 'productCategory',
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
      drop: (item: { id: number, index: number }) => {
        const {id: draggedId, index: originIndex} = item;
        if (draggedId !== id) {
          putUpdateCategorySequence(draggedId, id);
        }
      }
    })
  );

  return (
    <Box
      ref={dropRef}
      sx={{backgroundColor: isOver ? 'rgba(46, 125, 50, 0.2)' : 'none'}}>
      <Stack
        ref={dragRef}
        direction='row'
        spacing={2}
        sx={{
          alignItems: 'center',
          p: 1,
          border: '1px solid lightgrey',
          borderRadius: '10px'
        }}>
        <Typography
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
