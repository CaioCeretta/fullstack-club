import type { MostSoldProductDTO } from '@/_data/dal/dashboard/get-dashboard'
import ProductStatusBadge from '@/app/_components/product-status-badge'
import { formatCurrency } from '@/helpers/currency'

export interface MostSoldProductsItemProps {
  product: MostSoldProductDTO
}

export const MostSoldProductsItem = ({
  product,
}: MostSoldProductsItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <ProductStatusBadge status={product.status} />
        <p className="font-semibold">{product.name}</p>
        <p className="font-medium text-slate-500">
          {formatCurrency(product.price)}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">{product.totalSold}</p>
      </div>
    </div>
  )
}

export default MostSoldProductsItem
