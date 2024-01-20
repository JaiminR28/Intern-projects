import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
	try {
		connectToDb();
		const user = await User.findOne({ username: credentials.username });

		if (!user) {
			throw new Error("Wrong Credentials");
		}

		const isPasswordCorrect = bcrypt.compare(
			user.password,
			credentials.password
		);

		//? THIS IS TEMPORARY ?
		// const isPasswordCorrect = user.password === credentials.password;

		if (!isPasswordCorrect) {
			throw new Error("Password do not match ");
		}

		// console.log("user : ", user);
		return user;
	} catch (error) {
		console.log("error");
		throw new Error("Failed to login!");
	}
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			async authorize(credentials) {
				try {
					// console.log(credentials);
					const user = await login(credentials);
					return user;
				} catch (error) {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (account.provider === "github") {
				connectToDb();
				try {
					const user = await User.findOne({ email: profile.email });

					if (user) return { error: "Username already exists" };

					// console.log(profile);

					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(
						profile.password,
						salt
					);

					const newUser = new User({
						username: profile.name,
						email: profile.email,
						password: hashedPassword,
						img: profile.avatar_url,
					});
					await newUser.save();
				} catch (error) {
					new alert(error);
				}
			}
			return true;
		},
		...authConfig.callbacks,
	},
});
