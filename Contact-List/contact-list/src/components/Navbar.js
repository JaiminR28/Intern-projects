import { Link } from "react-router-dom";

function Navbar({ children }) {
	return (
		<div className="container">
			<nav>
				<Link to="/">HomePage</Link>
				<Link to="/add-contact">Add Contact</Link>
			</nav>
			<main>{children}</main>
		</div>
	);
}

export default Navbar;
