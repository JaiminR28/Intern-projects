"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// THIS IS A CLIENT SIDE PAGE
function NavigationPageTest() {
	const router = useRouter();

	const pathName = usePathname();
	const query = useSearchParams();

	const q = query.get("q");

	const handleClick = () => {
		console.log("clicked");
		router.refresh();
	};

	return (
		<div>
			<Link href="/" prefetch={false}>
				Click Here
			</Link>
			<button onClick={handleClick}>Write and redirect</button>
		</div>
	);
}

export default NavigationPageTest;
