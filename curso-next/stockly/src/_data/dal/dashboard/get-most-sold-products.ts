import { db } from '@/_lib/prisma'
import type { ProductStatusDTO } from '../product/get-products'

export interface MostSoldProductsDTO {
  productId: string
  name: string
  totalSold: number
  price: number
  status: ProductStatusDTO
}

export async function getMostSoldProducts(): Promise<MostSoldProductsDTO[]> {
  /* **SQL Group By Reminder**

    When SUM("SaleProduct", "quantity") is used, we are adding every sold quantity of each product. but for the database
    to understand how to do this sum correctly, we need to say how the records are being grouped.

    What happens in the group by is
    1. the database will group all the records that have the same product.name and the same
    product.price

    2. For each group, it will sum the saleProduct.quantity, i. e., the quantity of the product that has been sold.

    3. He then returns a single result for each group, with product name, the sum of the sold quantity and the price

    The reason we had to include the product.price in the group by is because in some db, every sale that is not used
    inside the aggregate function, such as SUM, COUNT, etc, needs to be in the group by

    This avoids ambiguity, because if we had two products with the same name, but different prices, db would know how to
    aggregate them correctly
  
  */

  /* The generic {name: string; totalSold: number}[]> says that the expected return from that mostSoldProductsQuery, has
  this typing */

  const mostSoldProducts = await db.$queryRaw<
    {
      productId: string
      name: string
      totalSold: number
      price: number
      stock: number
    }[]
  >`
    SELECT 
      "Product"."id" as productId,
      "Product"."name",
      SUM("SaleProduct"."quantity") AS "totalSold",
      "Product"."price", "Product"."stock"
      FROM "SaleProduct"
      JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
      GROUP BY "Product"."id", "Product"."name", "Product"."price", "Product"."stock"
      ORDER BY "totalSold" DESC
      LIMIT 10; 
  `

  return mostSoldProducts.map((product) => ({
    ...product,
    totalSold: Number(product.totalSold),
    price: Number(product.price),
    status: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
  }))
}
