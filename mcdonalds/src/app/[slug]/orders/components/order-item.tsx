import type { Order } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import type { OrderListProps } from "./order-list";

export interface OrderItemProps {
  order: OrderListProps;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 py-5">
        <div className="w-fit rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-muted-foreground">
          {order.status}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative aspect-square h-5">
            <Image alt="restaurant logo" src={} fill />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
