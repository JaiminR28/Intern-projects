import { useContext, useEffect, useState } from "react";
import contactsContext from "../contexts/contacts";
import DropDown from "../layouts/DropDown";

function SearchAndSort() {
	const { contacts, setFilteredData } = useContext(contactsContext);

	const [searchQuery, setSearchQuery] = useState("");
	const [tags, setTags] = useState("");

	const categories = [
		{ label: "None", value: "none" },
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
				// console.log(tags);
				// console.log(contact.categories);
				return isMatch && contact.categories?.includes(tags);
			}

			return isMatch;
		});

		// console.log(filtContacts);

		//! this is the mistake we do not have to set this to 'Filterdata'
		setFilteredData(filtContacts);
	};

	const handleChange = (option) => {
		if (option === "none") setTags("");
		else setTags(option);
	};

	//TODO: Any better way of updating this Data

	useEffect(() => {
		filterContacts();
	}, [searchQuery, tags]);

	useEffect(() => {
		setFilteredData(contacts);
	}, [contacts]);

	return (
		<nav className="level">
			<div className="level-left">
				<div className="level-item">
					<p className="subtitle is-5">
						<strong>Contact List</strong>
					</p>
				</div>
				<div className="level-item">
					<div className="field has-addons">
						<p className="control">
							<input
								className="input"
								type="text"
								placeholder="Find a Contact"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</p>
					</div>
				</div>
			</div>

			<div className="level-right">
				<DropDown
					onChange={handleChange}
					categories={categories}
					text={"Filter"}
				/>
			</div>
		</nav>
	);
}

export default SearchAndSort;
