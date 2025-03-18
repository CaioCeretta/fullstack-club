import 'server-only'

import { db } from '@/_lib/prisma'
import { unstable_cache } from 'next/cache'

export interface SaleProductDTO {
  productId: string
  name: string
  quantity: number
  unitPrice: number
}

export interface SaleDTO {
  id: string
  productNames: string
  productsQuantity: number
  totalAmount: number
  date: Date
  saleProducts: SaleProductDTO[]
}

export const getSales = async (): Promise<SaleDTO[]> => {
  const sales = await db.sale.findMany({
    include: {
      saleProducts: {
        include: { product: true },
      },
    },
  })

  return sales.map(
    (sale): SaleDTO => ({
      id: sale.id,
      date: sale.date,
      productNames: sale.saleProducts
        .map((saleProduct) => {
          return saleProduct.product.name
        })
        .join(' • '),
      totalAmount: sale.saleProducts.reduce(
        (acc, saleProduct) =>
          acc + Number(saleProduct.unitPrice) * saleProduct.quantity,
        0,
      ),
      productsQuantity: sale.saleProducts.reduce(
        (acc, saleProduct) => acc + saleProduct.quantity,
        0,
      ),
      saleProducts: sale.saleProducts.map(
        (saleProduct): SaleProductDTO => ({
          name: saleProduct.product.name,
          quantity: saleProduct.quantity,
          unitPrice: Number(saleProduct.unitPrice),
          productId: saleProduct.product.id,
        }),
      ),
    }),
  )
}

export const getCachedSales = unstable_cache(getSales, ['getSales'], {
  tags: ['get-sales'],
  revalidate: 60,
})
