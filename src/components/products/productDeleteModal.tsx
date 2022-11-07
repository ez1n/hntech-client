import React, {useState} from 'react';
import {categoryApi} from "../../network/category";
import {useAppDispatch} from "../../app/hooks";
import {getMiddleProductCategory, setAllProductCategories} from "../../app/reducers/categorySlice";
import {changeMode} from "../../app/reducers/managerModeSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@mui/material";
import {useLocation} from "react-router-dom";

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
  const location = useLocation();
  const mainCategory = new URLSearchParams(location.search).get('main');

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
  const deleteProductCategory = (categoryId: number, categoryName: string) => {
    validate() &&
    categoryApi.deleteProductCategory(categoryId, categoryName)
      .then(() => {
        categoryApi.getMainProductCategory()
          .then(res => {
            closeDeleteModal();
            dispatch(setAllProductCategories({categories: res.categories}));
            props.successDelete();
          })
          .catch(error => console.log(error))

        mainCategory &&
        categoryApi.getMiddleProductCategory(mainCategory)
          .then(res => dispatch(getMiddleProductCategory({category: res.categories})))
          .catch(error => console.log(error))
      })
      .catch(error => {
        console.log(error);
        setCategoryNameErrorMessage(error.response.data.message);
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
        <DialogTitle sx={{fontWeight: 'bold'}}>{props.category.categoryName} 카테고리 삭제</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{color: '#b03030', fontWeight: 'bold'}}>
            카테고리에 포함된 모든 제품이 삭제되며
          </DialogContentText>
          <DialogContentText sx={{color: '#b03030', fontWeight: 'bold'}}>
            복구가 불가능합니다.
          </DialogContentText>
          <DialogContentText sx={{mt: 1, color: '#3d3c3c'}}>
            정말 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={checkCategoryName}>네</Button>
          <Button onClick={props.onClose}>아니오</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={check} onClose={closeDeleteModal}>
        <DialogTitle sx={{fontWeight: 'bold'}}>{props.category.categoryName} 삭제</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{mb: 1}}>
            삭제할 카테고리 이름을 입력해 주세요.
          </DialogContentText>

          <TextField value={deleteCategoryName} onChange={changeValue} error={!!categoryNameErrorMessage}
                     helperText={categoryNameErrorMessage}
                     autoComplete='off' autoFocus fullWidth placeholder='정확한 명칭을 입력해 주세요'/>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => deleteProductCategory(props.category.id, deleteCategoryName)}>삭제</Button>
          <Button onClick={closeDeleteModal}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}