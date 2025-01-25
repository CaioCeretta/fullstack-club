interface ProductDetailsPageProps {
	params: {
		id: number
	}
}

const ProductDetailsPage = ({
	params: { id },
}: ProductDetailsPageProps) => {
	return <div>ID: {id}</div>
}

export default ProductDetailsPage
