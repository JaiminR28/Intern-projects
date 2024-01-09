import "./App.css";
import DropDownPage from "./pages/DropdownPage";

import Route from "./Route";
import AccordionPage from "./pages/AccordionPage";
import Sidebar from "./components/Sidebar";
import ButtonPage from "./pages/ButtonsPage";
import Panel from "./components/Panel";

function App() {
	return (
		<div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
			<Sidebar />
			<div className="col-span-5">
				<Route path="/accordion">
					<AccordionPage />
				</Route>
				<Route path="/">
					<DropDownPage />
				</Route>
				<Route path="/buttons">
					<ButtonPage />
				</Route>
			</div>
		</div>
	);
}

export default App;
