import "server-only";

import { db } from "@/_lib/prisma";
import type { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};

export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
  revalidate: 5,
});
