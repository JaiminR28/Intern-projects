import { Link } from "react-router-dom";
import { useContext } from "react";
import contactsContext from "../contexts/contacts";

function ShowContacts() {
	const { filteredData, deleteContact } = useContext(contactsContext);

	const renderedData = filteredData.map((contact) => {
		return (
			<tr key={contact.id}>
				<td>
					{`${contact.first_name ? contact.first_name : ""} ${
						contact.last_name ? contact.last_name : ""
					}`}{" "}
				</td>
				<td>{`${contact.email ? contact.email : ""}`}</td>
				<td>{`${contact.contact_no ? contact.contact_no : ""}`}</td>
				<td>
					<button onClick={() => deleteContact(contact.id)}>
						{" "}
						Delete Contact
					</button>{" "}
				</td>
				<td>
					<Link to={`/edit-contact/${contact.id}`}>
						<button>Edit Contact</button>
					</Link>
				</td>
			</tr>
		);
	});

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email ID.</th>
						<th>Contact No.</th>
					</tr>
				</thead>
				<tbody>{renderedData}</tbody>
			</table>
		</div>
	);
}

export default ShowContacts;
