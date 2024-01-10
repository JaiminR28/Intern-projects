import "./App.css";
import AddTask from "./components/addRemoveTask/addRemoveTask";
import TodoList from "./components/ShowTask/showTask";

function App() {
	return (
		<div className="container">
			<AddTask />
			<TodoList />
		</div>
	);
}

export default App;
