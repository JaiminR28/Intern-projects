import { useContext } from "react";
import NavigationContext from "./contexts/navigationContext";

// We are creating this Route component so that on clicking the Link comp. the set currentPath is same as the path set by the Route than return enclosed component.

function Route({ path, children }) {
	const { currentPath } = useContext(NavigationContext);

	if (path === currentPath) {
		return children;
	}

	return null;
}

export default Route;
