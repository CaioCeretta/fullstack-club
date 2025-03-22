import { getMostSoldProducts } from '@/_data/dal/dashboard/get-most-sold-products'
import MostSoldProductsItem from './most-sold-products-item'

const MostSoldProductsCard = async () => {
  const mostSoldProducts = await getMostSoldProducts()

  return (
    <div className="space-y-7 overflow-y-auto px-6 pb-6">
      <p className="p-6 text-sm font-medium text-slate-900">
        Most Sold Products
      </p>

      {mostSoldProducts.map((mostSoldProduct) => (
        <MostSoldProductsItem
          key={mostSoldProduct.productId}
          product={mostSoldProduct}
        />
      ))}
    </div>
  )
}

export default MostSoldProductsCard
