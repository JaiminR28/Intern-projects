import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AddTask from "./components/addRemoveTask/addRemoveTask";
import TodoList from "./components/ShowTask/showTask";
import Navbar from "./components/Navigation/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Navbar>
				<TodoList />,
			</Navbar>
		),
	},
	{
		path: "/addTask",
		element: (
			<Navbar>
				<AddTask />,
			</Navbar>
		),
	},
]);

function App() {
	return (
		<div className="container">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
