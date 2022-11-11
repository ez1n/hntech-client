import React, {useState} from 'react';
import ProductButton from "./productButton";
import {Box, Button, Grid, styled} from "@mui/material";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import {
  setAllProductCategories,
  setCurrentProductCategory
} from "../../app/reducers/categorySlice";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import ProductDeleteModal from "./productDeleteModal";
import {useDrag, useDrop} from "react-dnd";
import {categoryApi} from "../../network/category";

interface propsType {
  category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  },
  index: number,
  selectMainCategory: (categoryName: string) => void,
  successDelete: () => void
}

export default function ProductMainCategoryItem(props: propsType) {
  const {category, index, selectMainCategory, successDelete} = props;
  const {categoryName, id, imageServerFilename, imageOriginalFilename, showInMain} = category;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const managerMode = useAppSelector(state => state.manager.managerMode); // 관리자 모드
  const productCurrentCategory = useAppSelector(state => state.category.productCurrentCategory); // 선택된 카테고리 정보
  const [openDelete, setOpenDelete] = useState(false);

  // 카테고리 삭제 확인 modal - open
  const openDeleteMessage = (category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  }) => {
    dispatch(setCurrentProductCategory({category: category}));
    setOpenDelete(openDelete => !openDelete);
  };

  // 카테고리 삭제 확인 modal - close
  const closeDeleteMessage = () => setOpenDelete(false);

  // 순서변경
  const putUpdateCategorySequence = (draggedId: number, targetId: number) => {
    categoryApi.putUpdateCategorySequence({currentCategoryId: draggedId, targetCategoryId: targetId})
      .then(() => {
        categoryApi.getMainProductCategory()
          .then(res => dispatch(setAllProductCategories({categories: res})))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  };

  /* 드래그 앤 드롭 */
  // drag
  const [{isDragging}, dragRef] = useDrag(() => ({
      type: 'productMainCategory',
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
      accept: 'productMainCategory',
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
            onClick={() => selectMainCategory(categoryName)}
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
                  dispatch(setCurrentProductCategory({category: category}));
                  navigate('/product/category/main/modify');
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
        category={productCurrentCategory}
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
