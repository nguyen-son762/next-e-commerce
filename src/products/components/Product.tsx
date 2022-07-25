import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { ProductDef } from "../product";
import Image from "next/image";
import DefaultImage from "~/public/images/default-thumbnail.jpeg";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { convertMoney } from "@/utils/convertMoney";
import theme from "@/themes/theme";
import { useRouter } from "next/router";
interface Iprops {
  product: ProductDef;
}

const useStyles = makeStyles({
  card: {
    width: "100%",
    gap: 30,
    [theme.breakpoints.down("xs")]: {
      with: 200,
    },
  },
  cardImage: {
    position: "relative",
    with: "100%",
    height: 250,
    [theme.breakpoints.down("md")]: {
      with: 200,
      height: 250,
    },
  },
});

function Product({ product }: Iprops) {
  const classess = useStyles();
  const router = useRouter();
  function redirectProductDetail(id: number) {
    router.push(`/products/${id}`);
  }

  return (
    <Card className={classess.card}>
      <CardActionArea onClick={() => redirectProductDetail(product.product_id)}>
        <Box className={classess.cardImage}>
          <Image
            objectFit="cover"
            src={
              product?.details?.length &&
              product?.details[0].images[0] &&
              product?.details[0].images[0].url
                ? product?.details[0].images[0].url
                : DefaultImage
            }
            layout="fill"
            alt="green iguana"
          />
        </Box>
        <CardContent>
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
        }}
      >
        <IconButton aria-label="delete" color="primary" size="large">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="delete" color="primary" size="large">
          <VisibilityIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Product;
