import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todos",
	initialState: {
		list: [],
	},
	reducers: {
		addTodo: (state, action) => {
			state.list.push(action.payload);
		},
		removeTodo: (state, action) => {
			state.list = state.list.filter(
				(todo) => todo.id !== action.payload
			);
		},
	},
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const selectTodos = (state) => {
	return state.todos.list;
};
export default todoSlice.reducer;
