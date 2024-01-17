"use client";
import { useEffect, useState } from "react";

function HydrationTest() {
	const [isClient, setIsClient] = useState(false);

	const a = Math.random();

	useEffect(() => {
		setIsClient(true);
	}, []);
	return <div>{a}</div>;
}

export default HydrationTest;
