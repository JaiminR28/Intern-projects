import { useContext, useEffect, useState } from "react";
import contactsContext from "../contexts/contacts";

const CATEGORIES = [
	"Mobile",
	"Fax",
	"Friends",
	"Relatives",
	"Business",
	"Favorites",
	"others",
];

function SearchAndSort() {
	const { contacts } = useContext(contactsContext);

	//TODO: declare this data also globally so that it can be shared with the show component

	const [data, setData] = useState(contacts);
	const [searchQuery, setSearchQuery] = useState("");
	const [tags, setTags] = useState([]);

	const filterContacts = () => {
		//! we are searching among the parent data that is 'contacts'

		const filtContacts = contacts.filter((contact) => {
			const fullName =
				`${contact.first_name} ${contact.last_name}`.toLowerCase();
			// console.log("fullName", fullName);
			const isMatch = fullName.includes(searchQuery.toLowerCase());

			// Seleting Based on Tags

			// if (tags.length > 0)
			// 	isMatch &&
			// 		tags.every((tag) => contact.categories?.includes(tag));

			return isMatch;
		});

		console.log(filtContacts);
		//! this is the mistake we do not have to set this to data
		setData(filtContacts);
	};

	useEffect(() => {
		filterContacts();
	}, [searchQuery]);

	useEffect(() => {
		setData(contacts);
	}, [contacts]);

	return (
		<div>
			<input
				type="text"
				onChange={(e) => {
					setSearchQuery(e.target.value);
				}}
			/>
		</div>
	);
}

export default SearchAndSort;
