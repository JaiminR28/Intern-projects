"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";
import { redirect } from "next/dist/server/api-utils";

//~ ///////////////////////
//~ ADDING A NEW POST
//~ ///////////////////////

export const addPost = async (formData) => {
	const { title, desc, slug, userId, img } = Object.fromEntries(formData);

	try {
		connectToDb();
		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
			img,
		});

		await newPost.save();
		console.log("Saved to DB");
		revalidatePath("/blog");
	} catch (error) {
		return { error: "Something went wrong while sending data" };
	}
};

//~ ///////////////////////
//~ DELETING A POST
//~ ///////////////////////

export const deletePost = async (formData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();

		await Post.findOneAndDelete(id);
		console.log("Deleted to DB");
		revalidatePath("/blog");
	} catch (error) {
		return { error: "Something went wrong while sending data" };
	}
};

//~ ///////////////////////
//~ HANDLING LOGIN
//~ ///////////////////////

export const handleGithubLogin = async () => {
	await signIn("github");
};

//~ ///////////////////////
//~ HANDLING LOGOUT
//~ ///////////////////////

export const handleLogout = async () => {
	await signOut("github");
};

//~ ///////////////////////
//~ ADDING A USER
//~ ///////////////////////

export const register = async (previousState, formData) => {
	const { email, password, username, passwordRepeat, img } =
		Object.fromEntries(formData);

	console.log(" img: ", img);

	if (password !== passwordRepeat)
		return { error: "Password do not match !!" };

	try {
		connectToDb();
		const user = await User.findOne({ email });

		if (user) {
			// revalidatePath("/login");
			return { error: "User already exsists" };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			img,
		});

		await newUser.save();
		console.log("saved to db");
		return { success: true };
	} catch (error) {
		// console.log(error);
		return { error: "Not able to create a new User !!" };
	}
};

//~ ///////////////////////
//~ LOGGING A USER
//~ ///////////////////////

export const login = async (previousState, formData) => {
	console.log("previousState : ", previousState);
	const { password, username } = Object.fromEntries(formData);
	try {
		await signIn("credentials", { username, password });
	} catch (err) {
		console.log(err);

		if (err.message.includes("CredentialsSignin")) {
			return { error: "Invalid username or password" };
		}
		throw err;
	}
};
