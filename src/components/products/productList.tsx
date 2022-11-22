import React from 'react';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Grid, Typography} from "@mui/material";
import ProductItem from "./productItem";

interface propsType {
  windowSize: number,
  productList: {
    id: number,
    image: {
      id: number,
      originalFilename: string,
      savedPath: string,
      serverFilename: string
    },
    productName: string
  }[],
  deleteProductItem: () => void
}

function ProductList({windowSize, productList, deleteProductItem}: propsType) {
  let productColumn = 4;
  if (windowSize < 1200) productColumn = 3;
  if (windowSize < 900) productColumn = 2;
  if (windowSize < 600) productColumn = 1;

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container columns={productColumn} spacing={1}>
        {productList.length !== 0 ? // 제품 존재하는 경우
          productList.map((item: {
            id: number,
            image: {
              id: number,
              originalFilename: string,
              savedPath: string,
              serverFilename: string
            },
            productName: string
          }) => (
            <Grid key={item.id} item xs={1}>
              <ProductItem product={item} index={item.id} deleteProductItem={deleteProductItem}/>
            </Grid>
          )) : // 제품 존재하지 않는 경우
          <Typography>
            해당 카테고리에 제품이 존재하지 않습니다.
          </Typography>}
      </Grid>
    </DndProvider>
  )
}

export default ProductList;