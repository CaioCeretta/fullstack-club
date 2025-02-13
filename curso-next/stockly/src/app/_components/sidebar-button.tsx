'use client'

import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'

interface SidebarButtonProps {
  children: React.ReactNode
  href: string
}

const SidebarButton = (props: SidebarButtonProps) => {
  const pathname = usePathname()

  return (
    <Button
      variant={pathname === `${props.href}` ? 'secondary' : 'ghost'}
      className="gap-2"
      asChild
    >
      <Link href={props.href}>{props.children}</Link>
    </Button>
  )
}

export default SidebarButton
