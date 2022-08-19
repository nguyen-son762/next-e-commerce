import { ProductDef } from "@/features/products/product";
import { ColorDef } from "./color.type";
import { SizeDef } from "./size.type";

export type orderDetailDef = {
  order_id?: number;
  status?: number;
  amount: number;
  email?: string;
  address?: string;
  created_at?: Date;
  updated_at?: Date;
  product?: ProductDef;
  size?: SizeDef;
  color?: ColorDef;
  productDetailId: number;
};
