import React, { Suspense, useMemo, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Error from "next/error";
import Head from "next/head";
import Image from "next/image";
import { makeStyles } from "@mui/styles";

import Loader from "@/components/atoms/Loader";
import { getProductDetail, ProductDef } from "@/features/products/product";
import { convertMoney } from "@/utils/convertMoney";
import { Box, Button, Rating, Typography } from "@mui/material";
import DefaultImage from "~/public/images/default-thumbnail.jpeg";
import theme from "@/themes/theme";
import CustomSelect from "@/components/atoms/CustomSelect";
import { ItemCustomSelect } from "@/types/selectBox.types";
import useCartStore from "@/features/cart/store/cart";
const DefaultLayout = dynamic(
  () => import("@/components/layout/DefaultLayout"),
  { suspense: true, ssr: false }
);

interface Iprops {
  product: ProductDef | null;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    [theme.breakpoints.up("xs")]: {
      padding: "30px 5%",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "30px 10%",
    },
    [theme.breakpoints.up("md")]: {
      padding: "30px 15%",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "30px 20%",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  boxImage: {
    width: 400,
    [theme.breakpoints.down("md")]: {
      width: 300,
    },
    [theme.breakpoints.down("sm")]: {
      flex: 1,
      width: "100% !important",
    },
  },
});

const ProductDetail: NextPage<Iprops> = ({ product }) => {
  const [color, setColor] = useState(1);
  const [size, setSize] = useState(1);
  const classes = useStyles();
  const { addProductToCart } = useCartStore();

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

  const handleChangeColor = (value: number | string) => {
    setColor(+value);
  };
  const handleChangeSize = (value: number | string) => {
    setSize(+value);
  };
  if (!product) {
    return <Error statusCode={404} />;
  }

  return (
    <Box>
      <Head>
        <title>E-commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loader />}>
        {/* <p style={{ textAlign: "center", fontSize: "50px", marginTop: "50px" }}>
          {t.title}
        </p> */}
        <DefaultLayout>
          <Box className={classes.wrapper}>
            <Box
              height="auto"
              position="relative"
              sx={{
                aspectRatio: "1/1",
              }}
              className={classes.boxImage}
            >
              <Image
                src={
                  product?.details?.length &&
                  product?.details[0].images[0] &&
                  product?.details[0].images[0].url
                    ? product?.details[0].images[0].url
                    : DefaultImage
                }
                alt={
                  (product?.details[0] || []).images.find(
                    img => img.status === 1
                  )?.url || "T-shirt"
                }
                objectFit="cover"
                layout="fill"
              />
            </Box>
            <Box>
              <Typography variant="h5">{product.name}</Typography>
              <Rating name="simple-controlled" value={5} />
              <Typography
                variant="subtitle1"
                color={theme.palette.error.main}
                fontSize={20}
              >
                {convertMoney(product.price)}
              </Typography>
              <Typography variant="subtitle1" mt={1}>
                Choose color:
              </Typography>
              <CustomSelect
                listItem={listColors}
                value={color}
                handleChange={handleChangeColor}
              />
              <Typography variant="subtitle1" mt={1}>
                Choose size:
              </Typography>
              <CustomSelect
                listItem={listSizes || []}
                value={size}
                handleChange={handleChangeSize}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: `${product.description}`,
                }}
              ></div>

              <Box mt={3}>
                <Button
                  variant="outlined"
                  sx={{
                    mr: 2,
                  }}
                >
                  Add to cart
                </Button>
                <Button variant="contained">Buy now</Button>
              </Box>
            </Box>
          </Box>
        </DefaultLayout>
      </Suspense>
    </Box>
  );
};

export default ProductDetail;

export const getStaticProps: GetStaticProps<Iprops> = async ({ params }) => {
  try {
    const data = await getProductDetail((params?.id as string) || "");
    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
          // statusCode: 301
        },
      };
    }
    return {
      props: {
        product: data.data.data,
      },
      revalidate: 1,
    };
  } catch {
    return {
      props: {
        product: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
