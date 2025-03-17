import { getProducts } from '@/_data/dal/product/get-products'
import CreateSaleButton from './_components/create-sale-button'
import type { ComboboxOption } from '../_components/ui/combobox'
import { getSales } from '@/_data/dal/sales/get-sales'
import { DataTable } from '../_components/ui/data-table'
import { salesTableColumns } from './_components/table-columns'

const SalesPage = async () => {
  const sales = await getSales()
  const products = await getProducts()

  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }))

  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
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
          productsOptions={productOptions}
        />
      </div>
      <DataTable columns={salesTableColumns} data={tableData} />
    </div>
  )
}

export default SalesPage
