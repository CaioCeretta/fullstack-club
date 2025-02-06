import { Product } from "@prisma/client";

const ProductList = async () => {
  const response = await fetch(`http://localhost:3000/api/products`);

  const { products }: { products: Product[] } = await response.json();

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
