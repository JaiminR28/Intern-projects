import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ children }) {
	return (
		<>
			<nav className="navbar">
				<div className="navbar-left">
					<h1 className="logo">Todo List</h1>
				</div>
				<div className="navbar-right">
					<Link className="link" to={"/"}>
						HomePage
					</Link>
					<Link className="link" to={"/addTask"}>
						{" "}
						AddTask{" "}
					</Link>
				</div>
			</nav>
			<div>{children}</div>
		</>
	);
}

export default Navbar;
