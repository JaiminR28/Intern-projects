import Navbar from "../components/Navbar";
import SearchAndSort from "../components/SearchandSort";
import ShowContacts from "../components/showContacts";

function HomePage() {
	return (
		<Navbar>
			<SearchAndSort />
			<ShowContacts />
		</Navbar>
	);
}
export default HomePage;
