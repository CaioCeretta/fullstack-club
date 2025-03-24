import { getProducts } from '@/_data/dal/product/get-products'
import CreateSaleButton from './_components/create-sale-button'
import type { ComboboxOption } from '../_components/ui/combobox'
import { getSales } from '@/_data/dal/sales/get-sales'
import { DataTable } from '../_components/ui/data-table'
import { salesTableColumns } from './_components/table-columns'
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/header'

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
    <div className="ml-8 mt-8 w-full space-y-8 overflow-auto bg-white p-8 py-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Sales Management</HeaderTitle>
          <HeaderSubtitle>Sale</HeaderSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSaleButton
            products={products}
            productsOptions={productOptions}
          />
        </HeaderRight>
      </Header>
      <DataTable columns={salesTableColumns} data={tableData} />
    </div>
  )
}

export default SalesPage
