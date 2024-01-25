import Image from "next/image";
import Link from "next/link";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Header() {
	return (
		<nav className="bg-gray-800 px-8 py-3">
			<div className="container mx-auto flex items-center justify-between">
				{/* Logo */}
				<div className="flex items-center">
					<Link href="/">
						<h1 className="text-white ">Logo</h1>
					</Link>
					{/* Add Product Button */}
					<Link href="/add-product">
						<button className="bg-gray-900 text-white py-2 px-4 rounded ml-12 hover:bg-gray-600 transition-all">
							Add Product
						</button>
					</Link>

					{/* Navigation Links */}
					<div className="ml-6">
						<Link href="/">
							<p className="text-white hover:border-b-2 border-gray-50">
								Home
							</p>
						</Link>
					</div>
				</div>

				{/* User Profile (Replace with your user authentication logic) */}
				<div className="flex items-center">
					{/* Replace with user profile information or authentication state */}
					<span className="text-white mr-2">Hello, User</span>
					<Image
						className="w-10 rounded-[50%]"
						src="/noavatar.png"
						alt=""
						width={50}
						height={50}
					/>
				</div>
			</div>
		</nav>
	);
}

export default Header;
