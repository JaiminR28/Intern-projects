import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ children }) {
	return (
		<>
			<nav className={styles.navbar}>
				<div className={styles.navbarLeft}>
					<h1 className={styles.logo}>Todo List</h1>
				</div>
				<div className={styles.navbarRight}>
					<Link className={styles.link} to={"/"}>
						HomePage
					</Link>
					<Link className={styles.link} to={"/addTask"}>
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
