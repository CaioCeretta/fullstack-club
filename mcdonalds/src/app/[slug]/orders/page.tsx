import { db } from "@/lib/prisma";
import { isValidCpf } from "@/lib/utils";

import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

export interface OrdersPageProps {
  searchParams: {
    cpf: string;
  };
}

export const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return <CpfForm />;
  }

  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerCpf: cpf,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  console.log(orders);

  return (
    <>
      <OrderList orders={orders} />
    </>
  );
};

export default OrdersPage;
