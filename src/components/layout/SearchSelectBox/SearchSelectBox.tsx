import { sortList } from "@/constants/selectBox.constants";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SearchSelectBox = () => {
  const [sortQuery, setSortQuery] = useState("id");
  const router = useRouter();

  const handleChange = (event: SelectChangeEvent<number>) => {
    const searchData = event.target.value + "";
    setSortQuery(searchData);
    const name = searchData.split("_")[0];
    if (name === "id") {
      router.push(router.pathname);
      return;
    }
    const value = searchData.split("_")[1];
    const urlParams = new URLSearchParams();
    urlParams.set("order_by_name", name);
    urlParams.set("order_by_value", value);
    router.push(router.pathname + "?" + urlParams.toString());
  };
  const renderSelectBoxSort = () => {
    return sortList.map(item => {
      return (
        <MenuItem key={item.name + item.label} value={item.value}>
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
          value={sortQuery as any}
          onChange={handleChange}
        >
          {renderSelectBoxSort()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSelectBox;
