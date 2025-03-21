import { cn } from '@/_lib/utils'
import type { ReactNode } from 'react'

export interface SummaryCardComponentsProps {
  children: ReactNode
  className?: string
}

export const SummaryCardIcon = ({
  children,
  className,
}: SummaryCardComponentsProps) => {
  return (
    <div
      className={cn(
        'mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-slate-500 bg-opacity-10 text-slate-500',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const SummaryCardTitle = ({
  children,
  className,
}: SummaryCardComponentsProps) => {
  return (
    <p className={cn(`text-sm font-medium text-slate-500`, className)}>
      {children}
    </p>
  )
}

export const SummaryCardValue = ({
  children,
  className,
}: SummaryCardComponentsProps) => {
  return (
    <p className={cn('text-2xl font-semibold text-slate-900', className)}>
      {children}
    </p>
  )
}

export const SummaryCard = ({
  className,
  children,
}: SummaryCardComponentsProps) => {
  return (
    <div className={cn('rounded-xl bg-white p-6', className)}>{children}</div>
  )
}

export default SummaryCard
