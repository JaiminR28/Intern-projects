import { useContext } from "react";
import contactsContext from "../contexts/contacts";

function ShowContacts() {
	const { filteredData } = useContext(contactsContext);

	return (
		<div>
			<table>
				<tr>
					<th>Name</th>
					<th>Email ID.</th>
					<th>Contact No.</th>
				</tr>
				{filteredData.map((contact) => {
					return (
						<tr key={contact.id}>
							<td>{`${contact?.first_name} ${contact?.last_name}`}</td>
							<td>{`${contact?.email}`}</td>
							<td>{`${contact?.contact_no}`}</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
}

export default ShowContacts;
