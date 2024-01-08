import { useState } from "react";

import "./App.css";
import DropDownPage from "./pages/DropdownPage";
import Link from "./components/link";

function App() {
	return (
		<div>
			<Link to="/accordion">Go to Accordian</Link>
			<Link to="/dropdown">Go to dropdown</Link>
			<DropDownPage />
		</div>
	);
}

export default App;
