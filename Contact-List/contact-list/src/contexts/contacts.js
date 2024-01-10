import { createContext, useState } from "react";
import axios from "axios";

const contactsContext = createContext();

function ContactsProvider({ children }) {
	const [contacts, setContacts] = useState([]);

	const fetchContacts = async () => {
		const response = await axios.get("http://localhost:3006/contacts");
		setContacts(response.data);
	};

	const deleteContact = async (id) => {
		const data = await axios.delete(
			`http://localhost:3006/contacts/:${id}`
		);
		console.log(data);
	};

	// const createContact = async(id) => {
	//     const
	// }

	const valuesToShare = {
		contacts,
		fetchContacts,
		deleteContact,
	};

	return (
		<contactsContext.Provider value={valuesToShare}>
			{children}
		</contactsContext.Provider>
	);
}

export { ContactsProvider };

export default contactsContext;
