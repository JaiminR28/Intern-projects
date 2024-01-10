import Link from "./link";

function Sidebar() {
	const links = [
		{
			label: "Dropdown",
			path: "/dropdown",
		},
		{
			label: "Accordion",
			path: "/accordion",
		},
		{
			label: "Buttons",
			path: "/buttons",
		},
		{
			label: "Modal",
			path: "/modal",
		},
		{
			label: "Table",
			path: "/table",
		},
	];

	const renderLinks = links.map((link) => {
		return (
			<Link
				key={link.label}
				to={link.path}
				className="mb-3"
				activeClassName="font-bold border-l-4 border-blue-500 pl-2"
			>
				{link.label}
			</Link>
		);
	});

	return (
		<div className="flex flex-col mr-4  sticky top-0  items-start">
			{renderLinks}
		</div>
	);
}

export default Sidebar;
