// Esse layout será aplicado apenas na pasta products e seus filhos

import type { ReactNode } from 'react'

const ProductsLayout = ({
	children,
}: {
	children: ReactNode
}) => {
	return (
		<div>
			<h1>Products Layout</h1>
			{children}
		</div>
	)
}

export default ProductsLayout
