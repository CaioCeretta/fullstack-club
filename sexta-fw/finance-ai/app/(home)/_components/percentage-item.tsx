import type { ReactNode } from 'react'

interface PercentageItemProps {
  title: string
  icon: ReactNode
  value: number
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Icon */}
      <div className="flex items-center gap-2 ">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Valor */}
      <p className="text-sm font-bold">{value}%</p>
    </div>
  )
}

export default PercentageItem
