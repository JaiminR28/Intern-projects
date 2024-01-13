/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch } from "react-redux";
import { addTodo } from "./addRemoveSlice";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";

function AddTask() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	// States

	const onSubmit = (data) => {
		// e.preventDefault();

		console.log(data);
		dispatch(
			addTodo({
				id: uuidv4(),
				...data,
			})
		);
	};
	return (
		<div>
			<form name="form" onSubmit={handleSubmit(onSubmit)}>
				<h6>Task Heading:</h6>
				<input type="text" {...register("title", { required: true })} />
				<h6>Select Date / Time:</h6>
				<input
					type="datetime-local"
					{...register("timeDate", { required: true })}
				/>
				<button type="submit" value="submit">
					Add Task
				</button>
				{/* errors will return when field validation fails  */}
				{errors.exampleRequired && <span>This field is required</span>}
			</form>
		</div>
	);
}

export default AddTask;
