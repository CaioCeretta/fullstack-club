import type { ProductStatusDTO } from '@/_data/dal/product/get-products'
import { Badge } from './ui/badge'

export interface ProductStatusBadgeProps {
  status: ProductStatusDTO
}

const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'In Stock'
  } else {
    return 'Out of Stock'
  }
}

export const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status)

  return (
    <Badge
      variant={label === 'In Stock' ? 'primary' : 'destructive'}
      className="gap-1.5"
    >
      {label}
    </Badge>
  )
}

export default ProductStatusBadge
