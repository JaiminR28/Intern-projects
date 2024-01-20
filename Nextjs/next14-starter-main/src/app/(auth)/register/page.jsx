import RegisterForm from "@/components/registerForm/registerForm";
import { register } from "@/lib/action";
import Link from "next/link";

const RegisterPage = () => {
	return (
		<div className="flex items-center justify-center">
			<div className="w-[500px] bg-[var(--bgSoft)] p-12 flex flex-col text-center gap-7 rounded">
				<form
					className="flex flex-col text-center gap-7"
					action={register}
				>
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

					<Link href="/login">
						Have an account? <b>Login</b>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
