import { useContext } from "react";
import NavigationContext from "./src/contexts/navigationContext";

function Route({ path, children }) {
	const { currentPath } = useContext(NavigationContext);

	if (path === currentPath) {
		return children;
	}

	return null;
}

export default Route;
