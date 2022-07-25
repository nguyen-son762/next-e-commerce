import { api } from "@/apis/api";
import { AxiosResponse } from "axios";
import { ProductEndpointsEnum } from "../constants/product.endpoints";
import { GetProductParamsDef } from "../product";

export const getProductApiByPageAndTypeAndPrice = (
  params: GetProductParamsDef
): Promise<AxiosResponse> => {
  return api.get(ProductEndpointsEnum.GET_LIST, { params });
};

export const getProductDetail = (id: string): Promise<AxiosResponse> => {
  return api.get(ProductEndpointsEnum.GET_DETAIL.replace(":id", id));
};
