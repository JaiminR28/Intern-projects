import { useContext, useEffect } from "react";
import "./App.css";
import contactsContext from "./contexts/contacts";
import SearchAndSort from "./components/SearchandSort";

function App() {
	const { contacts, fetchContacts } = useContext(contactsContext);

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<div className="App">
			<div>Hello World</div>
			<SearchAndSort />
		</div>
	);
}

export default App;
