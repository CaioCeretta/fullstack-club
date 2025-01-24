'use client'

import { useState } from 'react'

export default function DynamicForm() {
	const [fields, setFields] = useState([
		{ id: 1, value: '' },
	])

	const addField = () => {
		setFields([
			...fields,
			{ id: fields.length + 1, value: 'teste' },
		])
	}

	return (
		<div>
			<h1>Dynamic Form</h1>
			<form>
				{fields.map((field) => (
					<div key={field.id}>
						<label>Field {field.id}</label>
						<input
							className=""
							type="text"
							value={field.value}
							onChange={(e) =>
								setFields((prev) =>
									prev.map((f) =>
										f.id === field.id
											? { ...f, value: e.target.value }
											: f
									)
								)
							}
						/>
					</div>
				))}
			</form>
			<button type="button" onClick={addField}>
				Add Field
			</button>
		</div>
	)
}
