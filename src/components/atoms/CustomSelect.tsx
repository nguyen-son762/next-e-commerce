import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { ItemCustomSelect } from "@/types/selectBox.types";

interface Iprops {
  value: string | number | undefined;
  handleChange: (value: number | string) => void;
  listItem: ItemCustomSelect[] | [];
  label?: string;
  minWidth?: number;
  fullWidth?: boolean;
}

function CustomSelect({
  minWidth = 120,
  value,
  handleChange,
  listItem,
  fullWidth,
  ...props
}: Iprops) {
  const renderItems = () => {
    return listItem.map(item => (
      <MenuItem value={item.value} key={item.value}>
        {item.label}
      </MenuItem>
    ));
  };

  return (
    <>
      <FormControl
        sx={{ m: 0, minWidth, width: fullWidth ? "100%" : "auto" }}
        size="small"
      >
        {props.label && (
          <InputLabel id={`select_${props.label}`}>{props.label}</InputLabel>
        )}
        <Select
          labelId={`select_${props.label}`}
          id={`select_small_${props.label}`}
          value={value}
          {...props}
          onChange={e => handleChange(e.target.value)}
        >
          {renderItems()}
        </Select>
      </FormControl>
    </>
  );
}

export default CustomSelect;
