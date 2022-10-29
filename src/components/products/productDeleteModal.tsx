import React, {useState} from 'react';
import {categoryApi} from "../../network/category";
import {useAppDispatch} from "../../app/hooks";
import {setAllProductCategories} from "../../app/reducers/categorySlice";
import {changeMode} from "../../app/reducers/managerModeSlice";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

interface PropsType {
  open: boolean,
  onClose: () => void,
  category: {
    categoryName: string,
    id: number,
    imageServerFilename: string,
    imageOriginalFilename: string,
    showInMain: string
  },
  successDelete: () => void
}

export default function ProductDeleteModal(props: PropsType) {
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState(false);
  const [deleteCategoryName, setDeleteCategoryName] = useState('');
  const [categoryNameErrorMessage, setCategoryNameErrorMessage] = useState('');

  const validate = () => {
    let valid = true;
    if (!deleteCategoryName || props.category.categoryName !== deleteCategoryName) {
      valid = false;
      setCategoryNameErrorMessage('정확하게 입력해 주세요.');
    } else setCategoryNameErrorMessage('')
    return valid;
  };

  const checkCategoryName = () => {
    props.onClose();
    setCheck(check => !check);
  };

  const closeDeleteModal = () => {
    props.onClose();
    setCheck(false);
    setDeleteCategoryName('');
    setCategoryNameErrorMessage('');
  };

  const changeValue = (e: any) => {
    setDeleteCategoryName(e.target.value);
  };

  // 카테고리 삭제
  const deleteProductCategory = (categoryName: string, categoryId: number) => {
    validate() &&
    categoryApi.deleteProductCategory(categoryId)
      .then(() => {
        categoryApi.getAllProductCategories()
          .then(res => {
            dispatch(setAllProductCategories({categories: res.categories}));
            props.successDelete();
            props.onClose();
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.removeItem("login");
          const isLogin = localStorage.getItem("login");
          dispatch(changeMode({login: isLogin}));
        }
      })
  };

  return (
    <>
        <Dialog open={props.open} onClose={closeDeleteModal}>
          <DialogTitle>{props.category.categoryName} 카테고리 삭제</DialogTitle>

          <DialogContent>
            <DialogContentText>
              카테고리에 포함된 제품이 삭제되고 복구할 수없습니다.
            </DialogContentText>

            <DialogContentText>삭제하시겠습니까?</DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={checkCategoryName}>네</Button>
            <Button onClick={props.onClose}>아니오</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={check} onClose={closeDeleteModal}>
          <DialogTitle>{props.category.categoryName} 카테고리 삭제</DialogTitle>

          <DialogContent>
            <DialogContentText>
              삭제할 카테고리 이름을 입력해 주세요.
            </DialogContentText>

            <TextField value={deleteCategoryName} onChange={changeValue} error={!!categoryNameErrorMessage}
                       helperText={categoryNameErrorMessage}
                       autoFocus fullWidth placeholder='삭제할 카테고리 이름'/>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => deleteProductCategory(deleteCategoryName, props.category.id)}>삭제</Button>
            <Button onClick={closeDeleteModal}>취소</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}