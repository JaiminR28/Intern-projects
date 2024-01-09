import { useContext } from "react";
import NavigationContext from "../contexts/navigationContext";

function useNavigation() {
	return useContext(NavigationContext);
}

export default useNavigation;
