/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./addRemoveSlice";
import { v4 as uuidv4 } from "uuid";

function AddTask() {
	const dispatch = useDispatch();

	// States
	const [inputs, setInputs] = useState({});

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setInputs({ ...inputs, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(
			addTodo({
				id: uuidv4(),
				title: inputs.title,
				time: inputs.timeDate,
			})
		);
	};
	return (
		<div>
			<form name="form" onSubmit={handleSubmit}>
				<h6>Task Heading:</h6>
				<input type="text" name="title" onChange={handleChange} />
				<h6>Select Date / Time:</h6>
				<input
					type="datetime-local"
					name="timeDate"
					onChange={handleChange}
				/>
				<button type="submit" value="submit">
					Add Task
				</button>
			</form>
		</div>
	);
}

export default AddTask;
