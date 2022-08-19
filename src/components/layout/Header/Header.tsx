import { memo } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import * as yup from "yup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

import logo from "~/public/logo_400x.webp";
import CustomTextField from "@/components/atoms/CustomTextField";
import useAuthStore from "@/features/auth/store/auth";
import { useStyles } from "./Header.styles";

const schema = yup.object({
  keyword: yup.string().trim().required("Keyword is required"),
});

function Header() {
  const { user } = useAuthStore();
  const router = useRouter();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      keyword: router.query.keyword || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (router.query.keyword === values.keyword) {
        return;
      }
      router.push(`/search?keyword=${values.keyword}`);
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="end"
      py={2}
      px={5}
    >
      <Box className={classes.logo}>
        <Link href="/">
          <Image src={logo} width={200} height={50} alt="roya" />
        </Link>
      </Box>
      <Box>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          display="flex"
          alignItems="end"
          position="relative"
        >
          <CustomTextField
            fullWidth
            name="keyword"
            width="100%"
            label="Search"
            value={formik.values.keyword as string}
            onChange={formik.handleChange}
            isTextSearch
          />
          <Button
            type="submit"
            className={classes.iconSearch}
            sx={{
              minWidth: 50,
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Link href={user && user.user_id ? "/account" : "/account/login"}>
          <Typography
            sx={{
              cursor: "pointer",
            }}
            mr={2}
          >
            Account
          </Typography>
        </Link>
        <ShoppingCartIcon
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/cart")}
        />
      </Box>
    </Box>
  );
}

export default memo(Header);
