"use server";
import type { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndNumbers = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      customerName: input.customerName,
      customerCpf: input.customerCpf,
      consumption_method: input.consumptionMethod,
      status: "PENDING",
      orderProducts: {
        createMany: {
          data: productsWithPricesAndNumbers,
        },
      },
      total: productsWithPricesAndNumbers.reduce(
        (acc, prod) => acc + prod.price * prod.quantity,
        0,
      ),
      restaurantId: restaurant.id,
    },
  });

  redirect(`/${input.slug}/orders`);
};
