import { getProducts } from '@/_data/dal/product/get-products'
import CreateSaleButton from './_components/create-sale-button'
import type { ComboboxOption } from '../_components/ui/combobox'

const SalesPage = async () => {
  const products = await getProducts()

  const productsOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))

  return (
    <div className="ml-8 mt-8 w-full space-y-8 bg-white p-8 py-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Sales Management
          </span>
          <h2 className="text-xl font-semibold">Sales</h2>
        </div>
        <CreateSaleButton
          products={products}
          productsOptions={productsOptions}
        />
      </div>
    </div>
  )
}

export default SalesPage
