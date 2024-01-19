import { Post, User } from "./models";
import { unstable_noStore as noStore } from "next/cache";
import { connectToDb } from "./utils";

// TEMPORARY DATA
// const users = [
// 	{ id: 1, name: "John" },
// 	{ id: 2, name: "Jane" },
// ];

// const posts = [
// 	{ id: 1, title: "Post 1", body: "......", userId: 1 },
// 	{ id: 2, title: "Post 2", body: "......", userId: 1 },
// 	{ id: 3, title: "Post 3", body: "......", userId: 2 },
// 	{ id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async () => {
	try {
		connectToDb();
		const posts = await Post.find();
		return posts;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch posts !");
	}
};

export const getPost = async (slug) => {
	noStore();
	try {
		connectToDb();
		const posts = await Post.findOne({ slug });
		return posts;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to find Post");
	}
};

export const getUser = async (id) => {
	try {
		connectToDb();
		const user = await User.findById(id);
		return user;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to fetch users !");
	}
};

export const getUsers = async () => {
	try {
		connectToDb();
		const users = await User.find();
		return users;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to find User");
	}
};
