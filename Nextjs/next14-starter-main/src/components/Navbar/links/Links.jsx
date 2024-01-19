"use client";

import { useState } from "react";
import styles from "./Links.module.css";
import NavLink from "./navLinks/navLinks";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

function Links({ session }) {
	const [open, setOpen] = useState(false);
	const links = [
		{
			title: "Home",
			path: "/",
		},
		{
			title: "About",
			path: "/about",
		},
		{
			title: "Contact",
			path: "/contact",
		},
		{
			title: "Blog",
			path: "/blog",
		},
	];
	// TEMPORARY
	// const sessions = true;
	// const isAdmin = false;

	return (
		<div className={styles.container}>
			<div className="hidden md:flex md:items-center gap-2">
				{links.map((link) => (
					<NavLink item={link} key={link.title} />
				))}
				{session?.user ? (
					<>
						{session.user?.isAdmin && (
							<NavLink
								item={{ title: "Admin", path: "/admin" }}
							/>
						)}
						<form action={handleLogout}>
							<button className={styles.logout}>Logout</button>
						</form>
					</>
				) : (
					<div>
						<NavLink item={{ title: "Login", path: "/login" }} />
					</div>
				)}
			</div>
			<Image
				className={styles.menuButton}
				src="/menu.png"
				alt=""
				width={30}
				height={30}
				onClick={() => setOpen((prev) => !prev)}
			/>
			{open && (
				<div className={styles.mobileLinks}>
					{links.map((link) => (
						<NavLink item={link} key={link.title} />
					))}
				</div>
			)}
		</div>
	);
}

export default Links;
