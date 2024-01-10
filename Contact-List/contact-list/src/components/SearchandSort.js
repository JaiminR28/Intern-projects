import { useContext, useEffect, useState } from "react";
import contactsContext from "../contexts/contacts";
import DropDown from "./DropDown";

function SearchAndSort() {
	const { contacts, setFilteredData } = useContext(contactsContext);

	const [searchQuery, setSearchQuery] = useState("");
	const [tags, setTags] = useState("");

	const categories = [
		{ label: "Mobile", value: "mobile" },
		{ label: "Fax", value: "fax" },
		{ label: "Friends", value: "friends" },
		{ label: "Relatives", value: "relatives" },
		{ label: "Business", value: "business" },
		{ label: "Favorites", value: "favorites" },
		{ label: "Others", value: "others" },
	];

	const filterContacts = () => {
		//~ TO NOTE : we are searching among the parent data that is 'contacts'

		const filtContacts = contacts.filter((contact) => {
			const fullName =
				`${contact.first_name} ${contact.last_name}`.toLowerCase();
			// console.log("fullName", fullName);
			const isMatch = fullName.includes(searchQuery.toLowerCase());

			// console.log(isMatch);
			// Seleting Based on Tags

			if (tags) {
				console.log(tags);
				console.log(contact.categories);
				return isMatch && contact.categories?.includes(tags);
			}

			return isMatch;
		});

		console.log(filtContacts);

		//! this is the mistake we do not have to set this to data
		setFilteredData(filtContacts);
	};

	const handleChange = (option) => {
		setTags(option);
	};

	//TODO: Any better way of updating this Data

	useEffect(() => {
		filterContacts();
	}, [searchQuery, tags]);

	useEffect(() => {
		setFilteredData(contacts);
	}, [contacts]);

	return (
		<div>
			<input
				type="text"
				onChange={(e) => {
					setSearchQuery(e.target.value);
				}}
			/>

			<DropDown
				tag={tags}
				categories={categories}
				onChange={handleChange}
			/>
		</div>
	);
}

export default SearchAndSort;
