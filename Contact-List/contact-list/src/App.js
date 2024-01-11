import { useContext, useEffect } from "react";
import "./App.css";
import contactsContext from "./contexts/contacts";
import SearchAndSort from "./components/SearchandSort";
import ShowContacts from "./components/showContacts";
import AddContact from "./components/AddContact";

function App() {
	const { contacts, fetchContacts } = useContext(contactsContext);

	useEffect(() => {
		fetchContacts();
	}, []);

	return (
		<div className="App">
			<SearchAndSort />
			<ShowContacts />
			<AddContact />
		</div>
	);
}

export default App;
