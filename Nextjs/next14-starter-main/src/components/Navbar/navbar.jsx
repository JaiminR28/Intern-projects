import Links from "./links/Links";

function Navbar() {
	return (
		<div className="h-28 flex items-center justify-between">
			<div className="text-3xl font-bold">Logo</div>
			<div>
				<Links />
			</div>
		</div>
	);
}

export default Navbar;
