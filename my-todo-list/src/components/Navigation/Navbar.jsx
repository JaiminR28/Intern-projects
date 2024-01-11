import { Link } from "react-router-dom";

function Navbar({ children }) {
	return (
		<div>
			<Link to={"/"}>HomePage</Link>
			<Link to={"/addTask"}> AddTask </Link>
			<div>{children}</div>
		</div>
	);
}

export default Navbar;
