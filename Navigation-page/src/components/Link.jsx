import { useContext } from "react";
import NavigationContext from "../contexts/navigationContext";

//* This component will maintain the information on which page is the user In

function Link({ to, children }) {
	const { navigate } = useContext(NavigationContext);

	const handleClick = (event) => {
		event.preventDefault();

		navigate(to);
	};

	return <a onClick={(e) => handleClick(e)}>{children}</a>;
}

export default Link;
