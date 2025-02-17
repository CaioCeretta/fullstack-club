// import { getProducts } from "@/_data/dal/product/get-products";
import { Button } from '@/app/_components/ui/button'
import { PlusIcon } from 'lucide-react'
import { DataTable } from '@/app/_components/ui/data-table'
import { productTableColumns } from '@/app/products/_components/table-columns'
// import type { Product } from "@prisma/client";

/* 
  By creating here like this, everytime the application is rebuilded, we are going to generate a new db connection, because
  each PrismaClient is a connection with our db, so to avoid this, inside the folder lib and the file prisma.ts, we're
  going to do the connection and call it inside where we'll use


const prismaClient = new PrismaClient(); */

const ProductsPage = async () => {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${baseUrl}/api/products`, {
    next: {
      revalidate: 5,
    },
  })

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  const { products, randomNumber } = await response.json()

  // const products: Product[] = data;

  // console.log(randomNumber);

  // const products: Product[] = await response.json();

  /*

  three ways of calling a promise and getting its value as json
  
  1: await the response and then await its transform to json
  
    const responseNumber = await fetch(`${baseUrl}/api/number`);
    const dataNumber = await responseNumber.json();

  2: using then to get the result of the await

   const responseNumber = await fetch(`${baseUrl}/api/number`).then((data) =>
   data.json(),

  3. nesting awaits: 
  
  const responseNumber = await (await fetch(${baseUrl}/api/number)).json(); 
  );

  */

  const responseNumber = await fetch(`${baseUrl}/api/number`)

  const dataNumber = await responseNumber.json()

  const { randomNumber: randomNumber2 } = dataNumber

  return (
    <div className="ml-8 mt-8 w-full space-y-8 bg-white p-8 py-8">
      {/*
      Just a comment in case you forget

      The reason why we have this div saying that the width is full, despite this being the default behavior of a div in
      the HTML, is because there are these cases

      1. Non-block parentes or with restricted width

        - If this div is inside a container with the display:flex, inline-block or grid, its width may not be automatically
        equal to 100% of the available width
        - w-full ensure that it takes all the width of the parent element, even if the default behavior has been changed
      
      2. Restrictions inherited by ancestor elements

        - If the parent of this div have a lower max-width or width, the behavior may vary
        - w-full can ensure that it occupy all the width inside the limits imposed by the parent
      
      3. Flexbox may affect the width

        - Since the display: flex has been applied, the children of this div may try to shrink according to the content,
        depending on the applied properties
        - w-full prevents this from happening and forces the div to remain occupying all the available space

      4 Preventing unexpected stylings

        - If there is any global rule or inherited CSS that define lower max-width or width to the div, w-full will
        ensure that it expands correctly


    */}

      {/*/Left*/}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-medium">
            Random Number from /products: {randomNumber}
          </h1>
          <h1 className="text-xl font-medium">
            Random Number from /number: {randomNumber2}
          </h1>
          <span className="text-xs font-semibold text-slate-500">
            Products Management
          </span>
          <h2 className="text-xl font-semibold">Products</h2>
        </div>
        <Button className="gap-2">
          <PlusIcon size={20} />
          New Product
        </Button>
      </div>
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  )
}

export default ProductsPage
