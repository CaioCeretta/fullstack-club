import Skeleton from '@/app/_components/skeleton'

export function SkeletonTotalRevenueCard() {
  return (
    <div className="flex flex-col space-y-4 rounded-xl bg-white p-6 shadow">
      <Skeleton className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />{' '}
      {/* Title */}
      <Skeleton className="h-8 w-40 animate-pulse rounded-md bg-gray-300" />{' '}
      {/* Value */}
      <Skeleton className="h-10 w-10 animate-pulse rounded-md bg-gray-200" />{' '}
      {/* Icon */}
    </div>
  )
}
