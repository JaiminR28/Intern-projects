import { handleGithubLogin, login } from "@/lib/action";
import Link from "next/link";

const LoginPage = async () => {
	return (
		<div className="flex items-center justify-center">
			<div className="w-[500px] bg-[var(--bgSoft)] p-12 flex flex-col text-center gap-7 rounded">
				<form action={handleGithubLogin}>
					<button className="w-full p-5 cursor-pointer bg-white text-black font-bold border-none rounded">
						Login with Github
					</button>
				</form>
				<form
					className="flex flex-col text-center gap-7"
					action={login}
				>
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
					<button>Login</button>

					<Link href="/register">
						{"Don't have an account?"} <b>Register</b>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
