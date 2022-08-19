import Link from "next/link";
import { memo, useMemo, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { ProductDef, ProductDetailModalDef } from "../product";
import Product from "./Product";
import CustomDialogs from "@/components/atoms/CustomDialog";
import CustomSelect from "@/components/atoms/CustomSelect";
import DefaultImage from "~/public/images/default-thumbnail.jpeg";
import useAuthStore from "@/features/auth/store/auth";
import useCartStore from "@/features/cart/store/cart";
import { green } from "@mui/material/colors";

interface Iprops {
  products: ProductDef[];
} 

function Products({ products }: Iprops) {
  const { user } = useAuthStore();
  const { addProductToCart } = useCartStore();
  const [isShowModalCart, setIsShowModalCart] = useState(false);
  const [isShowModalSuccess, setIsShowModalSuccess] = useState(false);
  const [productModal, setProductModal] =
    useState<ProductDetailModalDef | null>(null);
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState(1);
  const [size, setSize] = useState(1);

  const remainAmount = useMemo(() => {
    return (
      (productModal?.product.details || []).find(
        item => item.color.color_id === color && item.size.size_id === size
      )?.amount || 0
    );
  }, [size, color, , productModal?.product.details]);

  const renderProducts = () => {
    if (!products?.length) {
      return null;
    }
    return products.map(product => {
      return (
        <Product
          key={product.product_id}
          product={product}
          columnSize={3}
          addProductToModal={(item: ProductDetailModalDef) =>
            addProductToModal(item)
          }
        ></Product>
      );
    });
  };
  const handleCloseModal = () => {
    setIsShowModalCart(false);
  };
  const handleCloseModalSuccess = () => {
    setIsShowModalCart(false);
    setIsShowModalSuccess(false);
  };
  const handleChangeColor = (value: number | string) => {
    setColor(+value);
  };
  const handleChangeSize = (value: number | string) => {
    setSize(+value);
  };
  const handleAddProductToCart = async () => {
    await addProductToCart({
      isAuth: Boolean(user?.user_id),
      productDetailId:
        productModal?.product.details?.find(
          item => item.color.color_id === color && item.size.size_id === size
        )?.product_detail_id || 0,
      amount,
      product: productModal?.product,
    });
    setIsShowModalSuccess(true);
  };
  const addProductToModal = (item: ProductDetailModalDef) => {
    setProductModal(item);
    setIsShowModalCart(true);
  };

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} mt={3} mb={2}>
        {renderProducts()}
      </Grid>

      {/* dialog add to cart */}
      <CustomDialogs
        open={isShowModalCart}
        onClose={handleCloseModal}
        title="Add to cart"
      >
        <Typography variant="h4">{productModal?.product.name}</Typography>
        <Box display="flex">
          <Box
            sx={{
              position: "relative",
              height: 200,
              width: 300,
            }}
          >
            <Image
              objectFit="cover"
              src={productModal?.thumbnailUrl || DefaultImage}
              layout="fill"
              alt="green iguana"
            />
          </Box>
          <Box ml={3} mr={4}>
            <Typography variant="subtitle1" mt={1}>
              Choose color:
            </Typography>
            <CustomSelect
              fullWidth
              listItem={productModal?.colors || []}
              value={color}
              handleChange={handleChangeColor}
            />
            <Typography variant="subtitle1" mt={1}>
              Choose size:
            </Typography>
            <CustomSelect
              fullWidth
              listItem={productModal?.sizes || []}
              value={size}
              handleChange={handleChangeSize}
            />
            <Typography variant="subtitle1">
              Remaining quantity: {remainAmount}
            </Typography>
            <Box display="flex" alignItems="center" mt={4}>
              <Button
                size="small"
                onClick={() => {
                  if (amount === 1) {
                    return;
                  }
                  setAmount(amount - 1);
                }}
              >
                <RemoveIcon />
              </Button>
              <TextField
                sx={{
                  width: 100,
                }}
                size="small"
                type="number"
                label="Amount"
                variant="outlined"
                value={amount}
                onChange={e => {
                  console.log(e.target.value);
                  if (
                    Number(e.target.value) < 1 ||
                    Number(e.target.value) > (remainAmount || 0)
                  ) {
                    return;
                  }
                  setAmount(Number(e.target.value || 1));
                }}
              />
              <Button
                size="small"
                onClick={() => {
                  if (amount === remainAmount) {
                    return;
                  }
                  setAmount(amount + 1);
                }}
              >
                <AddIcon />
              </Button>
            </Box>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddProductToCart}>
                Buy now
              </Button>
            </Box>
          </Box>
        </Box>
      </CustomDialogs>

      {/* dialog success */}
      <CustomDialogs
        open={isShowModalSuccess}
        onClose={handleCloseModalSuccess}
      >
        <Box textAlign="center">
          <Box display="flex" alignItems="center" mb={3}>
            <CheckCircleOutlineIcon
              sx={{
                color: green[400],
                fontSize: 34,
              }}
            />
            <Typography fontSize={25} color={green[400]}>
              Add to cart successfully
            </Typography>
          </Box>
          <Box display="flex" justifyContent="end" gap={3}>
            <Button variant="outlined" onClick={handleCloseModalSuccess}>
              Continue to buy
            </Button>
            <Button variant="contained">
              <Link href="/cart">Go to cart</Link>
            </Button>
          </Box>
        </Box>
      </CustomDialogs>
    </>
  );
}

export default memo(Products);
