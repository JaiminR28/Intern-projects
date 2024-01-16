import Link from "next/link";

function NotFound() {
	return (
		<div>
			<h2>Not Found</h2>
			<p>Soory the page you are lookig for does not exsist</p>
			<Link href="/">Return Home</Link>
		</div>
	);
}

export default NotFound;
