/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, selectTodos } from "../addRemoveTask/addRemoveSlice";
import styles from "./showTask.module.css";

const TodoList = () => {
	const todos = useSelector(selectTodos);

	const dispatch = useDispatch();

	const handleRemoveTodo = (id) => {
		dispatch(removeTodo(id));
	};

	return (
		<div className={styles.showtask}>
			<h3>Your todo list</h3>

			<ul className={styles.listMenu}>
				{todos?.map((todo) => (
					<li className={styles.listContainer} key={todo.id}>
						<h4>{todo.title}</h4>
						<p>{todo.timeDate}</p>
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
