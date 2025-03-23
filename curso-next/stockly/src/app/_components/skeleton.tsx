import { cn } from '@/_lib/utils'

export interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(`animate-pulse rounded-md bg-gray-200`, className)}
    ></div>
  )
}

export default Skeleton
