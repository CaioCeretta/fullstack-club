
import { notFound } from "next/navigation"

import { db } from "@/lib/prisma"

import ProductHeader from "./_components/products-header"


interface ProductPageProps { 
  params: {
    productId: string,
    slug: string
  }
}

const ProductPage = async ({params}: ProductPageProps) => {

  const { slug, productId }  = await params

  console.log(productId)

  const product = await db.product.findUnique({
    where: {
      id: productId
    },
  })

  if(!product) {
    return notFound()
  }



  return (
    <>
      <ProductHeader product={product} />
      <h1>Product Page</h1>
      {slug}
      {productId}
    </>
  );
}
 
export default ProductPage;