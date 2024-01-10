import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./components/addRemoveTask/addRemoveSlice";

const store = configureStore({
	reducer: {
		todos: todoReducer,
	},
});

export default store;
