import { selectSort } from "@/types/selectBox.types";

export const sortList: selectSort[] = [
  {
    label: "Random",
    value: "id",
    name: "id",
  },
  {
    label: "Name: A-Z",
    value: "name_asc",
    name: "name",
  },
  {
    label: "Name: Z-A",
    value: "name_desc",
    name: "name",
  },
  {
    label: "Price: low to high",
    value: "price_asc",
    name: "price",
  },
  {
    label: "Price: high to low",
    value: "price_desc",
    name: "price",
  },
];
