import classNames from "classnames";
import useNavigation from "../hooks/useNavigation";

//* This component will maintain the information on which page is the user In

function Link({ to, children, className, activeClassName }) {
	const { navigate, currentPath } = useNavigation();

	const classes = classNames(
		"text-blue-500 ",
		"p-2",
		"inline",
		className,
		currentPath === to && activeClassName
	);
	// console.log(classes);

	const handleClick = (event) => {
		// console.log(event);
		if (event.metaKey || event.ctrlKey) return;
		event.preventDefault();

		navigate(to);
	};

	return (
		<a className={classes} onClick={(e) => handleClick(e)}>
			{children}
		</a>
	);
}

export default Link;
