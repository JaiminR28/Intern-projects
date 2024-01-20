"use client";

import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
	const router = useRouter();
	const [state, formAction] = useFormState(login, undefined);
	// console.log("state: ", state);
	useEffect(() => {
		state?.success && router.push("/home");
	}, [state?.success, router]);

	return (
		<form className="flex flex-col text-center gap-7" action={formAction}>
			<input
				className="registrationInput"
				type="text"
				placeholder="username"
				name="username"
			/>
			<input
				className="registrationInput"
				type="password"
				placeholder="password"
				name="password"
			/>
			<button className="p-5 cursor-pointer bg-[var(--btn)] text-[var(--textColor)] font-bold border-none rounded-md">
				Login
			</button>

			<Link href="/register">
				{"Don't have an account?"} <b>Register</b>
			</Link>

			{state?.error}
		</form>
	);
};

export default LoginForm;
