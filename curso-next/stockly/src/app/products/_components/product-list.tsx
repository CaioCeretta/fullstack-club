import { cachedGetProducts } from '@/_data/dal/product/get-products'

const ProductList = async () => {
  const products = await cachedGetProducts()

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}

export default ProductList
