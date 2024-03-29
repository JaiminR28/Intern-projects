"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/lib/action";

const RegisterForm = () => {
	const router = useRouter();
	const [state, formAction] = useFormState(register, undefined);
	console.log("state :", state);
	useEffect(() => {
		state?.success && router.push("/login");
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
				type="email"
				placeholder="email"
				name="email"
			/>
			<input
				className="registrationInput"
				type="password"
				placeholder="password"
				name="password"
			/>
			<input
				className="registrationInput"
				type="password"
				placeholder="password again"
				name="passwordRepeat"
			/>

			<button className="p-5 cursor-pointer bg-[var(--btn)] text-[var(--textColor)] font-bold border-none rounded-md">
				Register
			</button>
			{state?.error}
			<Link href="/login">
				Have an account? <b>Login</b>
			</Link>
		</form>
	);
};

export default RegisterForm;
