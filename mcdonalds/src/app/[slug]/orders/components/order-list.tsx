import { OrderStatus, type Prisma } from "@prisma/client";
import clsx from "clsx";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getStatusLabel } from "@/lib/utils";
import { formatCurrency } from "@/utils/format";

export interface OrderListProps {
  orders: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>[];
}

export const OrderList = async ({ orders }: OrderListProps) => {
  return (
    <div className="space-y-6 p-6">
      <Button size={"icon"} variant={"secondary"} className="rounded-full">
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />

        <h2 className="text-lg font-semibold">My Orders </h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 py-5">
            <div
              className={clsx(
                "w-fit rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground",
                order.status === OrderStatus.FINISHED
                  ? "bg-green-400"
                  : "bg-gray-300 text-gray-500",
              )}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative aspect-square h-5">
                <Image
                  alt={order.restaurant.name}
                  src={order.restaurant.avatarImageUrl}
                  fill
                  className="rounded-sm"
                />
              </div>
              <span>{order.restaurant.name}</span>
            </div>
            <Separator />
            <div className="space-y-2">
              {order.orderProducts.map((orderProduct) => (
                <div key={orderProduct.id} className="flex items-center gap-2">
                  <div className="h5 flex w-5 items-center justify-center rounded-full bg-gray-400 p-1 text-xs font-semibold text-white">
                    {orderProduct.quantity}
                  </div>
                  <p className="text-sm">{orderProduct.product.name}</p>
                </div>
              ))}
            </div>
            <Separator />
            <p className="text-sm">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
        // <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export default OrderList;
