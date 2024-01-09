import "./App.css";
import DropDownPage from "./pages/DropdownPage";
import Link from "./components/link";
import Route from "./Route";
import AccordionPage from "./pages/AccordionPage";

function App() {
	return (
		<div>
			<Link to="/accordion">Go to Accordian</Link>
			<Link to="/dropdown">Go to dropdown</Link>
			<div>
				<Route path="/accordion">
					<AccordionPage />
				</Route>
				<Route path="/dropdown">
					<DropDownPage />
				</Route>
			</div>
		</div>
	);
}

export default App;
