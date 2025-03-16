import { PrismaClient } from '@prisma/client'

/*
  Explanation of what this file is doing

  1.  global CachedPrisma
  
    - Define a cachedPrisma variable that will store the instance of Prisma Client

    - The declaration "declare global" EXTENDS the global scope from Node.js, ensuring that cachedPrisma will be recognized
    by TS

  2. Creation of Prisma Client with Extensions

    - The function createPrismaClient returns an instance of PrismaClient, but with a extension hook $extends()
    - $extends is a method from PrismaClient that allow us to change the behavior of the queries return, so

      1. Result: We want't to modify the results of the prisma queries
      2. Product: We are changing the Product model defined in the schema.prisma
      3. Status: Creating a new virtual field named status
      4. needs: { stock: true }: The status can only be calculated if stock is loaded in the query
      5. compute(product) -> Defines the logic of the new field

      In practice, this means that everytime we fetch a product with stock, we can access the status directly, without
      needing to calculate it manually

    3. Creating and storing the prisma instance

      Now we are ecreating and storing the prisma, by saying

      let prisma: ReturnType<typeof createPrismaClient>

      here we create the variable prisma that will be used to store the instance of prisma

    4. Verifying the execution environment

      if (process.env.NODE_ENV === "production") {
        prisma = createPrismaClient();
      }

      if we are in production, we create a new instance of prisma, with no global caching
    
      5. Managing the cache in the development environment

        else {
          if (!global.cachedPrisma) {
            global.cachedPrisma = createPrismaClient();
          }
          prisma = global.cachedPrisma; 
        }

        here we verify if there is already a global.cachedPrisma, if not, we create a new instance and store globally

        if yes, we reuse the same instance


*/

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof createPrismaClient>
}

const createPrismaClient = () => {
  return new PrismaClient()
}

// const createPrismaClient = () => {
//   return new PrismaClient().$extends({
//     result: {
//       product: {
//         status: {
//           needs: { stock: true },
//           compute(product) {
//             if (product.stock <= 0) {
//               return 'OUT_OF_STOCK'
//             } else {
//               return 'IN_STOCK'
//             }
//           },
//         },
//       },
//     },
//   })
// }

/*  
  Explanation of the status column

    The $extends used, is basically to create this generated column, that prisma calls "computed fields", a computed field
  is basically a column that is derived from another column, so here we have the status column, and that status depends
  on the stock, because we saw on figma, that the status of the product will be 'Em Estoque' OR 'Esgotado', and this column
  is basically a derivation of the stock column, so in this case, is better for us to dynamically generate this column than
  for us to keep updating the column everytime the stock changes. This can leave an opening for us to manually change the
  stock but forget about changing the availability of the product. So when we have a column that directly derives from
  another column, is better to use a generated column.

    So here we are saying that a product will have a column status, on the product: { status: {...}}, and this column
  needs the stock column, and the everything in the compute will be the result of the status colum. So it will compute
  each product, see its stock, and return the value
*/

let prisma: ReturnType<typeof createPrismaClient>
if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient()
  }

  prisma = global.cachedPrisma
}

export const db = prisma
