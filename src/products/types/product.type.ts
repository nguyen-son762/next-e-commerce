import { CategoryDef } from '@/types/category.type'
import { ColorDef } from '@/types/color.type'
import { ImageDef } from '@/types/image.type'
import { SizeDef } from '@/types/size.type'

export type GetProductParamsDef = {
  type?: number
  page?: number
  min_price?: number
  keyword?: string
}

export type ProductDef = {
  product_id: number
  name: string
  price: number
  promotion?: number
  description: number
  category: CategoryDef
  details: ProductDetailDef[]
}

export type ProductDetailDef = {
  product_detail_id: number
  amount: number
  color: ColorDef
  size: SizeDef
  images: ImageDef[]
}
