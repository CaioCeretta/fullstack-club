import 'server-only'

import { db } from '@/_lib/prisma'
import { unstable_cache } from 'next/cache'

export interface SaleDTO {
  id: string
  productNames: string
  productsQuantity: number
  totalAmount: number
  date: Date
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
    }),
  )
}

export const getCachedSales = unstable_cache(getSales, ['getSales'], {
  tags: ['get-sales'],
  revalidate: 60,
})
