import { Suspense } from "react";
import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import useTrans from "@/hooks/useTrans";
import { Box } from "@mui/system";

import {
  getProductApiByPageAndTypeAndPrice,
  ProductDef,
} from "@/features/products/product";
import { useStyles } from "@/themes/style";
import Products from "@/features/products/components/Products";
import Loader from "@/components/atoms/Loader";
import SearchSelectBox from "@/components/layout/SearchSelectBox/SearchSelectBox";
import PaginationCustom from "@/components/atoms/PaginationCustom";
const DefaultLayout = dynamic(
  () => import("@/components/layout/DefaultLayout"),
  { suspense: true, ssr: false }
);

interface Iprops {
  products: ProductDef[];
  totalPage?: number;
  page?: number;
}

const Home: NextPage<Iprops> = ({ products, page = 1, totalPage = 1 }) => {
  const t = useTrans();
  const classess = useStyles();

  return (
    <div>
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
          <SearchSelectBox />
          <Box className={classess.container}>
            <Products products={products} />
          </Box>
          <PaginationCustom page={page} totalPage={totalPage} />
        </DefaultLayout>
      </Suspense>
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps<Iprops> = async context => {
  try {
    const param = context.query;
    const data = await getProductApiByPageAndTypeAndPrice(param);
    if (data && data.data.data.length > 0) {
      const { data: products, totalPage, page } = data.data;
      return {
        props: {
          products,
          totalPage,
          page,
        },
      };
    }
    return {
      props: {
        products: [],
      },
    };
  } catch {
    return {
      props: {
        products: [],
      },
    };
  }
};
