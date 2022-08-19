import { selectSort } from "@/types/selectBox.types";

export const sortList: selectSort[] = [
  {
    id: 1,
    label: "Random",
    value: "random",
    name: "id",
  },
  {
    id: 2,
    label: "Name: A-Z",
    value: "asc",
    name: "name",
  },
  {
    id: 3,
    label: "Name: Z-A",
    value: "desc",
    name: "name",
  },
  {
    id: 4,
    label: "Price: low to high",
    value: "asc",
    name: "price",
  },
  {
    id: 5,
    label: "Price: high to low",
    value: "desc",
    name: "price",
  },
];
