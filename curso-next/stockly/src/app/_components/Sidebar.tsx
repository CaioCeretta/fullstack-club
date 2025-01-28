const SideBar = () => {
	return (
		<div className="w-64 bg-white  text-blue-900">
			{/* Imagem, we'll not use the padding in the whole div because one item can be different than other */}
			<div className="px-8 py-6">
				<h1 className="font-bold text-2xl">STOCKLY</h1>
			</div>

			{/* Buttons */}
			<div className="flex flex-col gap-2 p-2">
				<button className="px-6 py-3">Dashboard</button>
				<button className="px-6 py-3">Products</button>
				<button className="px-6 py-3">Sales</button>
			</div>
		</div>
	)
}

export default SideBar
