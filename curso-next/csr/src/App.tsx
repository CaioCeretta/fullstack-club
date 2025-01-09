import { useEffect, useState } from 'react'
import './App.css'

function App() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [tasks, setTasks] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const fetchTasks = async () => {
			setLoading(true)
			await new Promise((resolve) =>
				setTimeout(resolve, 3000)
			)
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/todos?_limit=10'
			)

			const data = await response.json()

			setTasks(data)
			setLoading(false)
		}

		fetchTasks()
	}, [])

	return (
		<>
			<div>
				{loading && <div>Loading...</div>}
				{tasks.map((task) => (
					<div key={task.id}>{task.title}</div>
				))}
			</div>
		</>
	)
}

export default App
