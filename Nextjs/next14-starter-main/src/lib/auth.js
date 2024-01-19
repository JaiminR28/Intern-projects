import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

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
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log(user, account, profile);
			if (account.provider === "github") {
				connectToDb();
				try {
					const user = await User.findOne({ email: profile.email });

					console.log("profile: ", profile);
					if (!user) {
						const newUser = new User({
							username: profile.name,
							email: profile.email,
							password: "temp1234",
							img: profile.avatar_url,
						});
						await newUser.save();
					}
				} catch (error) {
					new alert(error);
				}
			}
			return true;
		},
	},
});
