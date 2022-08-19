import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

interface Iprops {
  totalPage: number;
  page: number;
}

function PaginationCustom({ page = 1, totalPage = 1 }: Iprops) {
  const router = useRouter();
  const handleChange = (page: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", page + "");
    router.push(router.pathname + "?" + urlParams.toString());
  };
  return (
    <Box display="flex" justifyContent="center" pb={4}>
      <Pagination
        count={totalPage}
        color="primary"
        page={page}
        onChange={(_, page) => handleChange(page)}
      />
    </Box>
  );
}

export default PaginationCustom;
