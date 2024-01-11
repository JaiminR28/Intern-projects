import { useContext, useState } from "react";
import DropDown from "./DropDown";
import contactsContext from "../contexts/contacts";

function AddContact() {
	const { createContact } = useContext(contactsContext);

	const [inputs, setInput] = useState({
		first_name: "",
		last_name: "",
		email: "",
		contact_no: "",
	});
	// let tags = "";

	// TODO: this is repeated from the searchAndSort page.
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

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;

		setInput({ ...inputs, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Clicked");
		console.log(inputs);

		// This is temporary
		// const sendData = {};

		createContact(inputs);
		// setContacts({ ...contacts, inputs });
	};

	const handleTags = (tag) => {
		console.log(tag);
		const newInput = { ...inputs, categories: tag };
		setInput(newInput);
		// inputs.categories = tag;
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="field">
				<label className="label">First Name</label>
				<div className="control">
					<input
						className="input"
						name="first_name"
						value={inputs.first_name}
						required
						type="text"
						placeholder=""
						onChange={handleChange}
					/>
				</div>

				<label className="label">Last Name</label>
				<div className="control">
					<input
						className="input"
						type="text"
						placeholder=""
						value={inputs.last_name}
						name="last_name"
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="field">
				<label className="label">Email</label>
				<div className="control has-icons-left has-icons-right">
					<input
						className="input"
						type="email"
						value={inputs.email}
						placeholder="Email input"
						name="email"
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="filed">
				<label className="label">Contact No.</label>
				<div className="control">
					<input
						className="input"
						type="tel"
						placeholder="Enter your contact Number"
						value={inputs.contact_no}
						name="contact_no"
						required
						onChange={handleChange}
					/>
				</div>
			</div>

			<div className="field">
				<label className="label">Category</label>
				<div className="control">
					<DropDown
						categories={categories}
						text="Categories"
						onChange={handleTags}
					/>
				</div>
			</div>

			<div className="field is-grouped">
				<div className="control">
					<button
						type="submit"
						value="submit"
						className="button is-link"
					>
						Submit
					</button>
				</div>
				<div className="control">
					<button className="button is-link is-light">Cancel</button>
				</div>
			</div>
		</form>
	);
}

export default AddContact;
