import { cartEndpointsEnum } from "./constants/cart.endpoints";
import { api } from "@/apis/api";
import { AxiosResponse } from "axios";

export const getCart = async (): Promise<AxiosResponse> => {
  return api.get(cartEndpointsEnum.GET_CART);
};
