import { Children, createContext } from "react";

const NavigationContext = createContext();

function NavigationProvider() {
	return <NavigationContext.Provider value={}>{Children}</NavigationContext.Provider>;
}

export { NavigationProvider };
export default Provider;
