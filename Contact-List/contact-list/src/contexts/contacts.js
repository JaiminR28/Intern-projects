import { createContext, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const contactsContext = createContext();

function ContactsProvider({ children }) {
	const [contacts, setContacts] = useState([]);
	const [filteredData, setFilteredData] = useState(contacts);

	// const navigate = useNavigate();

	const fetchContacts = async () => {
		const response = await axios.get("http://localhost:3006/contacts");
		setContacts(response.data);
	};

	const deleteContact = async (id) => {
		await axios.delete(`http://localhost:3006/contacts/${id}`);

		const updatedContacts = contacts.filter((contact) => contact.id !== id);
		setContacts(updatedContacts);
	};

	const createContact = async (newContact) => {
		const response = await axios.post("http://localhost:3006/contacts", {
			...newContact,
		});

		const updatedContacts = [...contacts, response.data];
		setContacts(updatedContacts);
	};

	const findContactById = (inputId) => {
		console.log(contacts);
		const data = contacts.find((contact) => contact.id === inputId);
		return data;
	};

	const editContact = async (contact) => {
		console.log(contact);
		const { id } = contact;
		console.log(id);
		const data = await axios.patch(`http://localhost:3006/contacts/${id}`, {
			...contact,
		});
	};

	const valuesToShare = {
		contacts,
		setContacts,
		fetchContacts,
		createContact,
		deleteContact,
		filteredData,
		setFilteredData,
		findContactById,
		editContact,
	};

	return (
		<contactsContext.Provider value={valuesToShare}>
			{children}
		</contactsContext.Provider>
	);
}

export { ContactsProvider };

export default contactsContext;
