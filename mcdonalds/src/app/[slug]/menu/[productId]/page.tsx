import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./_components/products-header";
import ProductDetails from "./product-details";

interface ProductPageProps {
  params: {
    productId: string;
    slug: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId, slug } = await params;

  /* const restaurant = await db.restaurant.findUnique({
    where: {
      slug
    }
  })

  instead of doing another call to the db, we can simply say on the product query, that is going to include the restaurant
  which it is linked to
 */
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
