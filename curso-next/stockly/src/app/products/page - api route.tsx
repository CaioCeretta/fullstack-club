import { Button } from '@/app/_components/ui/button'
import { PlusIcon } from 'lucide-react'
import { DataTable } from '../_components/ui/data-table'
import { productTableColumns } from './_components/table-columns'
import ProductList from './_components/product-list'

const ProductsPage = async () => {
  const baseUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL

  const response = await fetch(`${baseUrl}/api/products`)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`)
  }

  const { products } = await response.json()

  return (
    <div className="ml-8 mt-8 w-full space-y-8 bg-white p-8 py-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Products Management
          </span>
          <h2 className="text-xl font-semibold">Products</h2>
        </div>
        <Button className="gap-2">
          <PlusIcon size={20} />
          New Product
        </Button>
      </div>
      <ProductList />
      <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  )
}

export default ProductsPage
