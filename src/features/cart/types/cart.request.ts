import { ProductDef } from "@/features/products/product";

export type cartRequestDef = {
  isAuth: boolean;
  productDetailId: number;
  amount: number;
  product?: ProductDef;
};
