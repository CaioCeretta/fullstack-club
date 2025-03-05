export interface OrdersPageProps {
  searchParams: {
    cpf: string;
  };
}

export const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) {
    return;
  }

  return (
    <>
      <h1>Orders Page</h1>
    </>
  );
};

export default OrdersPage;
