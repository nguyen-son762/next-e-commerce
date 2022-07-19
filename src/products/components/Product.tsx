import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createTheme,
  Typography,
} from "@mui/material";
import { ProductDef } from "../product";
import Image from "next/image";
import DefaultImage from "~/public/default-thumbnail.jpeg";
import { makeStyles } from "@mui/styles";
interface Iprops {
  product: ProductDef;
}

const theme = createTheme();
const useStyles = makeStyles({
  card: {
    width: 280,
    gap:10,
    [theme.breakpoints.down("xs")]: {
      with: 200,
    },
  },
});

function Product({ product }: Iprops) {
  const classess = useStyles();
  return (
    <Card className={classess.card}>
      <CardActionArea>
        <Image
          height={200}
          width={280}
          objectFit="cover"
          src={
            product?.details.length &&
            product?.details[0].images[0] &&
            product?.details[0].images[0].url
              ? product?.details[0].images[0].url
              : DefaultImage
          }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;
