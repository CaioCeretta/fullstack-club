interface ProductDetailsPageProps {
	params: {
		id: number
	}
}

/* or

	interface Params {
		id: number
	}

	then, on the component

	const ProductDetailsPage = ({
	params: { id },
}: {params: Params })

*/

const ProductDetailsPage = ({
	params: { id },
}: ProductDetailsPageProps) => {
	console.log(id)
	return <div>ID: {}</div>
}

export default ProductDetailsPage
