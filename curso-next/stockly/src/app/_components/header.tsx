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
    <span className={`${className}text-xs font-semibold text-slate-500`}>
      {children}
    </span>
  )
}

export const HeaderLeft = ({ children, className }: HeaderComponentProps) => {
  return <div className={`${className} space-y-2`}>{children}</div>
}

export const HeaderRight = ({ children, className }: HeaderComponentProps) => {
  return <div className={`${className}`}>{children}</div>
}

export const Header = ({ children, className }: HeaderComponentProps) => {
  return (
    <div className={`${className} flex w-full items-center justify-between`}>
      {children}
    </div>
  )
}

export default Header
