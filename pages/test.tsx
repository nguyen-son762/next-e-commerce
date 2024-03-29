import Loader from "@/components/atoms/Loader";
import {
  getProductApiByPageAndTypeAndPrice,
  ProductDef,
} from "@/features/products/product";
import type { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense } from "react";
const DefaultLayout = dynamic(
  () => import("@/components/layout/DefaultLayout"),
  { suspense: true, ssr: false }
);
import useTrans from "@/hooks/useTrans";
interface Iprops {
  products: ProductDef[];
  price: any;
}
const Test: NextPage<Iprops> = ({ products, price }) => {
  const t = useTrans();
  return (
    <div>
      <Head>
        <title>E-commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loader />}>
        <p style={{ textAlign: "center" }}>{t.title}</p>
        {process.env.customKey}
        {/* <DefaultLayout>
          <Products products={products} />
          <p>{t.title}</p>
        </DefaultLayout> */}
      </Suspense>
    </div>
  );
};

export default Test;
export const getStaticProps: GetStaticProps = async context => {
  const data = await getProductApiByPageAndTypeAndPrice({});
  if (data && data.data.data.length > 0) {
    return {
      props: {
        products: data.data.data,
      },
      revalidate: 100,
    };
  }
  return {
    props: {
      products: [],
    },
    revalidate: 1,
  };
};
