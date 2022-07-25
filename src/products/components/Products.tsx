import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memo } from "react";
import { ProductDef } from "../product";
import Product from "./Product";

interface Iprops {
  products: ProductDef[];
}
const useStyles = makeStyles({
  products: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 280px)",
    placeContent: "center",
    rowGap: "20px",
    columnGap: "40px",
  },
});
function Products({ products }: Iprops) {
  const classess = useStyles();
  const renderProducts = () => {
    if (!products?.length) {
      return null;
    }
    return products.map(product => {
      return <Product key={product.product_id} product={product}></Product>;
    });
  };
  return <Box className={classess.products}>{renderProducts()}</Box>;
}

export default memo(Products);
