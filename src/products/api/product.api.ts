import { api } from '@/apis/api'
import { AxiosResponse } from 'axios'
import { ProductEndpointsEnum } from '../constants/product.endpoints'
import { GetProductParamsDef } from '../product'

export const getProductApiByPageAndTypeAndPrice = (
  params: GetProductParamsDef
): Promise<AxiosResponse> => {
  const { keyword, type, page, min_price } = params
  let query = {}
  if (keyword) {
    query = { ...query, keyword }
  }
  if (type) {
    query = { ...query, type }
  }
  if (page) {
    query = { ...query, page }
  }
  if (min_price) {
    query = { ...query, min_price }
  }
  return api.get(ProductEndpointsEnum.GET_LIST, { params: query })
}
