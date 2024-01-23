import { createContext, useState, useEffect } from "react";
import propTypes from "prop-types";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	//~ This useEffect will run only once and will initiate the event Listener for the 'popState' event

	//~ Window Emits a 'popstate' event if the current URL was added using the pushstate.

	//~ the empty argument 'useEffect' is used to perform cleanup when the component unmounts or when certain dependencies change.

	useEffect(() => {
		const handler = () => {
			setCurrentPath(window.location.pathname);
		};

		//! Pushstate does not trigger this event
		window.addEventListener("popstate", handler);

		return () => {
			window.removeEventListener("popstate", handler);
		};
	}, []);

	const navigate = (to) => {
		window.history.pushState({}, "", to);
		setCurrentPath(to);
	};

	return (
		<NavigationContext.Provider value={{ currentPath, navigate }}>
			{children}
		</NavigationContext.Provider>
	);
}

NavigationProvider.propTypes = {
	children: propTypes.object.isRequired,
};

export { NavigationProvider };
export default NavigationContext;
