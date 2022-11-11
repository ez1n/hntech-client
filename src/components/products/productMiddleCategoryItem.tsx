import React, {useState} from 'react';
import {categoryApi} from "../../network/category";
import {useLocation, useNavigate} from "react-router-dom";
import {useDrag, useDrop} from "react-dnd";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  getMiddleProductCategory,
  setCurrentProductMiddleCategory
} from "../../app/reducers/categorySlice";
import {Box, Button, Grid, styled} from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import ProductDeleteModal from "./productDeleteModal";
import ProductButton from "./productButton";

interface propsType {
  category: {
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    categoryName: string,
    showInMain: string,
    parent: string,
    children: string[]
  },
  index: number,
  selectMiddleCategory: (categoryName: string) => void,
  successDelete: () => void
}

export default function ProductMiddleCategoryItem(props: propsType) {
  const {category, index, selectMiddleCategory, successDelete} = props
  const {id, imageServerFilename, imageOriginalFilename, categoryName} = category;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const currentProductMiddleCategory = useAppSelector(state => state.category.currentProductMiddleCategory); // 선택된 중분류 카테고리 state
  const [openDelete, setOpenDelete] = useState(false);

  // 카테고리 삭제 확인 modal - open
  const openDeleteMessage = (category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string,
    parent: string,
    children: string[]
  }) => {
    dispatch(setCurrentProductMiddleCategory({category: category}));
    setOpenDelete(openDelete => !openDelete);
  };

  // 카테고리 삭제 확인 modal - close
  const closeDeleteMessage = () => setOpenDelete(false);

  // 순서변경
  const putUpdateCategorySequence = (draggedId: number, targetId: number) => {
    categoryApi.putUpdateCategorySequence({currentCategoryId: draggedId, targetCategoryId: targetId})
      .then(() => {
        mainCategory &&
        categoryApi.getMiddleProductCategory(mainCategory)
          .then(res => dispatch(getMiddleProductCategory({category: res})))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  /* 드래그 앤 드롭 */
  // drag
  const [{isDragging}, dragRef] = useDrag(() => ({
      type: 'productMiddleCategory',
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
      accept: 'productMiddleCategory',
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
    <>
      <Box ref={dropRef}>
        <ProductBox ref={dragRef} sx={{boxShadow: isOver ? '3px 3px 3px 3px lightgrey' : 'none'}}>
          <ProductButton
            imageServerFilename={imageServerFilename}
            imageOriginalFilename={imageOriginalFilename}
            categoryName={categoryName}
            onClick={selectMiddleCategory}
          />

          {/* 수정 버튼 */}
          {managerMode &&
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
              <Button
                onClick={() => openDeleteMessage(category)}
                sx={{color: 'red'}}>
                <RemoveCircleRoundedIcon sx={{fontSize: 30}}/>
              </Button>
              <Button
                onClick={() => {
                  dispatch(setCurrentProductMiddleCategory({category: category}));
                  navigate('/product/category/middle/modify');
                }}
                sx={{color: 'darkgreen'}}>
                <CreateRoundedIcon sx={{fontSize: 30}}/>
              </Button>
            </Box>
          }
        </ProductBox>
      </Box>

      {/* 카테고리 삭제 경고 메시지 */}
      <ProductDeleteModal
        open={openDelete}
        category={currentProductMiddleCategory}
        successDelete={successDelete}
        onClose={closeDeleteMessage}
      />
    </>
  );
}

const ProductBox = styled(Box)(() => ({
  margin: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 10,
})) as typeof Box;

