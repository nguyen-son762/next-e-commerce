import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";

import { sortList } from "@/constants/selectBox.constants";

const DEFAUL_ID_SORT_QUERY = 1;

const SearchSelectBox = () => {
  const [sortQuery, setSortQuery] = useState<number>(DEFAUL_ID_SORT_QUERY);
  const router = useRouter();

  useEffect(() => {
    const { order_by_name = "", order_by_value = "" } = router.query;
    if (!order_by_name) {
      setSortQuery(DEFAUL_ID_SORT_QUERY);
      return;
    }
    const id =
      sortList.find(
        item => item.name === order_by_name && item.value === order_by_value
      )?.id || DEFAUL_ID_SORT_QUERY;
    setSortQuery(id);
  }, [router.query, router.query.order_by_name, router.query.order_by_value]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const searchVal = Number(event.target.value || 1);
    setSortQuery(searchVal);
    const sortItem = sortList.find(item => item.id === searchVal);

    if (searchVal === DEFAUL_ID_SORT_QUERY || !sortItem) {
      router.push(router.pathname);
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("order_by_name", sortItem?.name);
    urlParams.set("order_by_value", sortItem?.value);
    router.push(router.pathname + "?" + urlParams.toString());
  };

  const renderSelectBoxSort = () => {
    return sortList.map(item => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.label}
        </MenuItem>
      );
    });
  };

  return (
    <Box display="flex" justifyContent="center">
      <FormControl sx={{ mt: 3, minWidth: 200 }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={sortQuery}
          label="Sort"
          onChange={handleChange}
        >
          {renderSelectBoxSort()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSelectBox;
