import { useContext, useEffect } from "react";
import "./App.css";
import contactsContext from "./contexts/contacts";
import SearchAndSort from "./components/SearchandSort";
import ShowContacts from "./components/showContacts";

function App() {
	const { contacts, fetchContacts } = useContext(contactsContext);

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<div className="App">
			<h1>Contacts</h1>
			<SearchAndSort />
			<ShowContacts />
		</div>
	);
}

export default App;
