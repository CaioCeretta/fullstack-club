import { LayoutGridIcon, PackageIcon, ShoppingBasket } from 'lucide-react'
import SidebarButton from './sidebar-button'

const SideBar = () => {
  return (
    <div className="text-black-900 w-64 bg-white">
      {/* Imagem, we'll not use the padding in the whole div because one item can be different than other */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">STOCKLY</h1>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>
        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Products
        </SidebarButton>
        <SidebarButton href="/sales">
          <ShoppingBasket size={20} />
          Sales
        </SidebarButton>
      </div>
    </div>
  )
}

export default SideBar
