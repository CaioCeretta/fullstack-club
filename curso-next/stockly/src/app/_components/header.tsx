import { cn } from '@/_lib/utils'
import type { ReactNode } from 'react'

interface HeaderComponentProps {
  children: ReactNode
  className?: string
}

export const HeaderTitle = ({ children, className }: HeaderComponentProps) => {
  return <h2 className={`${className} text-xl font-semibold`}>{children}</h2>
}

export const HeaderSubtitle = ({
  children,
  className,
}: HeaderComponentProps) => {
  return (
    <span className={cn(`text-xs font-semibold text-slate-500`, className)}>
      {children}
    </span>
  )
}

export const HeaderLeft = ({ children, className }: HeaderComponentProps) => {
  return <div className={cn('space-y-2', className)}>{children}</div>
}

export const HeaderRight = ({ children, className }: HeaderComponentProps) => {
  return <div className={cn(className)}>{children}</div>
}

export const Header = ({ children, className }: HeaderComponentProps) => {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      {children}
    </div>
  )
}

export default Header
