import { useContext } from "react";
import NavigationContext from "../contexts/navigationContext";

function Link({ to, children }) {
	const { currentPath, navigate } = useContext(NavigationContext);
	const handleClick = (event) => {
		event.preventDefault();

		navigate(to);
	};

	return <a onClick={(e) => handleClick(e)}>{children}</a>;
}

export default Link;
