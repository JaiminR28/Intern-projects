"use server";
import { revalidatePath } from "next/cache";
import { Post } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";

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

export const deletePost = async (formData) => {
	const { id } = Object.fromEntries(formData);

	try {
		connectToDb();

		await Post.findOneAndDelete(formData);
		console.log("Deleted to DB");
		revalidatePath("/blog");
	} catch (error) {
		return { error: "Something went wrong while sending data" };
	}
};

export const handleGithubLogin = async () => {
	await signIn("github");
};

export const handleLogout = async () => {
	await signOut("github");
};
