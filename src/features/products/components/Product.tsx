import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { green } from "@mui/material/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { ProductDef, ProductDetailModalDef } from "../product";
import DefaultImage from "~/public/images/default-thumbnail.jpeg";
import { convertMoney } from "@/utils/convertMoney";
import theme from "@/themes/theme";
import CustomDialogs from "@/components/atoms/CustomDialog";
import CustomSelect from "@/components/atoms/CustomSelect";
import { ItemCustomSelect } from "@/types/selectBox.types";
import useCartStore from "@/features/cart/store/cart";
import useAuthStore from "@/features/auth/store/auth";
import { StatusImage } from "../constants/product.constant";

interface Iprops {
  product: ProductDef;
  columnSize?: number;
  addProductToModal: (item: ProductDetailModalDef) => void;
}

const useStyles = makeStyles({
  card: {
    // [theme.breakpoints.down("xs")]: {
    // },
  },
  cardImage: {
    [theme.breakpoints.down("md")]: {
      with: 200,
    },
  },
});

function Product({ product, columnSize = 3, addProductToModal }: Iprops) {
  const classess = useStyles();
  const router = useRouter();

  const listColors = useMemo(() => {
    const dummyColors: ItemCustomSelect[] = [];
    (product?.details || []).forEach(productDetail => {
      if (
        productDetail &&
        !dummyColors.find(
          dummyItem => dummyItem.value === productDetail.color.color_id
        )
      ) {
        dummyColors.push({
          value: productDetail.color.color_id,
          label: productDetail.color.name || "",
        });
      }
    });
    return dummyColors;
  }, [product]);
  const listSizes = useMemo(() => {
    const dummySizes: ItemCustomSelect[] = [];
    (product?.details || []).forEach(productDetail => {
      if (
        productDetail &&
        !dummySizes.find(
          dummyItem => dummyItem.value === productDetail.size.size_id
        )
      ) {
        dummySizes.push({
          value: productDetail.size.size_id,
          label: productDetail.size.name || "",
        });
      }
    });
    return dummySizes;
  }, [product]);
  const thumnailImage = useMemo(() => {
    const images = (product.details || []).find(item => item.images.length > 0);
    return images?.images.find(image => image.status === StatusImage.THUMBNAIL)
      ?.url;
  }, [product.details]);

  const redirectProductDetail = (id: number) => {
    router.push(`/products/${id}`);
  };
  const showModalAddToCart = () => {
    addProductToModal({
      product,
      thumbnailUrl: thumnailImage || "",
      colors: listColors,
      sizes: listSizes,
    });
  };

  return (
    <Grid item xs={6} sm={4} lg={columnSize}>
      <Card className={classess.card}>
        <CardActionArea
          onClick={() => redirectProductDetail(product.product_id)}
        >
          <Box
            className={classess.cardImage}
            sx={{
              position: "relative",
              width: "100%",
              height: "auto",
              aspectRatio: "1/1",
            }}
          >
            <Image
              style={{
                minHeight: "300px",
              }}
              objectFit="cover"
              src={thumnailImage || DefaultImage}
              layout="fill"
              alt="green iguana"
            />
          </Box>
          <CardContent
            style={{
              padding: "5px 10px",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              fontSize={18}
              color={theme.palette.primary.main}
            >
              {convertMoney(product.price)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            paddingY: 0,
          }}
        >
          <IconButton
            aria-label="delete"
            color="primary"
            size="large"
            onClick={showModalAddToCart}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton aria-label="delete" color="primary" size="large">
            <VisibilityIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Product;
