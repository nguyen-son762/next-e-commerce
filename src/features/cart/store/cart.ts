import { orderDetailDef } from "@/types/order.type";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { cartRequestDef } from "../types/cart.request";

interface InitialState {
  cart: orderDetailDef[];
  addProductToCart: ({
    isAuth,
    productDetailId,
    amount,
    product,
  }: cartRequestDef) => Promise<any | null>;
}

const useCartStore = create<InitialState>()(
  devtools(
    persist(set => ({
      cart: [],
      async addProductToCart({ product, productDetailId, isAuth, amount }) {
        if (isAuth) {
          return;
        }
        set(state => {
          const newCart = state.cart;
          newCart.push({
            amount,
            product,
            productDetailId,
          });
          return {
            cart: newCart,
          };
        });
      },
    }))
  )
);

export default useCartStore;
