import "server-only";

import { db } from "@/_lib/prisma";
import type { Product } from "@prisma/client";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};
