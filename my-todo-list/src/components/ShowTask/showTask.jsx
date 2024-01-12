/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, selectTodos } from "../addRemoveTask/addRemoveSlice";

const TodoList = () => {
	const todos = useSelector(selectTodos);

	const dispatch = useDispatch();

	const handleRemoveTodo = (id) => {
		dispatch(removeTodo(id));
	};

	return (
		<div>
			<h3>Your todo list</h3>
			<ul>
				{todos?.map((todo) => (
					<li key={todo.id}>
						<h4>{todo.title}</h4>
						<p>{todo.time}</p>
						<button onClick={() => handleRemoveTodo(todo.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
