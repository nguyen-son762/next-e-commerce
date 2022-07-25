import { Box } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TestImage from "~/public/images/test2.avif";
const demoimage: NextPage = () => {
  // load by size
  // const renderImage = () => {
  //   return (
  //     <Box
  //       sx={{
  //         maxWidth: 700,
  //         height: 300,
  //         position: "relative",
  //       }}
  //     >
  //       <Image src={TestImage} objectFit="cover" alt="1231" layout="fill" />
  //     </Box>
  //   );
  // };
  // lazy load image
  const renderImage = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      return (
        <Box key={index} position="relative">
          <Image
            src="https://images.unsplash.com/photo-1658237783206-e1ae5b72eeb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            width={700}
            height={400}
            alt="1231"
          />
        </Box>
      );
    });
  };
  return (
    <div>
      <Head>
        <title>demo image</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>{renderImage()}</Box>
    </div>
  );
};

export default demoimage;
