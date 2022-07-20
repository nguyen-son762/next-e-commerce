import { Box } from '@mui/material'
import { memo } from 'react'
import { ProductDef } from '../product'
import Product from './Product'

interface Iprops {
  products: ProductDef[]
}

function Products({ products }: Iprops) {
  const renderProducts = () => {
    if (!products.length) {
      return null
    }
    return products.map((product) => {
      return <Product key={product.product_id} product={product}></Product>
    })
  }
  return <Box>{renderProducts()}</Box>
}

export default memo(Products)
