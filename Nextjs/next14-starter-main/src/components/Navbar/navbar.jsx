import { auth } from "@/lib/auth";
import Links from "./links/Links";

async function Navbar() {
	const session = await auth();

	console.log("session", session);
	return (
		<div className="h-28 flex items-center justify-between">
			<div className="text-3xl font-bold">Logo</div>
			<div>
				<Links session={session} />
			</div>
		</div>
	);
}

export default Navbar;
