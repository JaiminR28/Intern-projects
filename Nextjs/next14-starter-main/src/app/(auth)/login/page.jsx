import LoginForm from "@/components/loginForm/loginForm";
import { handleGithubLogin, login } from "@/lib/action";

const LoginPage = async () => {
	return (
		<div className="flex items-center justify-center">
			<div className="w-[500px] bg-[var(--bgSoft)] p-12 flex flex-col text-center gap-7 rounded">
				<form action={handleGithubLogin}>
					<button className="w-full p-5 cursor-pointer bg-white text-black font-bold border-none rounded">
						Login with Github
					</button>
				</form>
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
