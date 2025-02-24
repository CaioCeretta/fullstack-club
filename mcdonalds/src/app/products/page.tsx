import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ProductsPage = () => {
	return (
		<div className="p-5 border border-red-700 rounded-xl">
			<h1 className="text-red-500">Products Page</h1>
			<Button>FSW 7.0</Button>
			<Input placeholder="Bora fechar esse projeto" />
		</div>
	)
}

export default ProductsPage
