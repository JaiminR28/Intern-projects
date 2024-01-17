const users = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Jane" },
];

const posts = [
	{ id: 1, title: "Post 1", body: "......", userld: 1 },
	{ id: 2, title: "Post 1", body: "......", userld: 2 },
];

export const getPosts = async () => {
	return posts;
};

export const getPost = async (id) => {
	const post = posts.find((post) => post.id === parseInt(id));
	return post;
};

export const getUsers = async () => {
	return users;
};

export const getUser = async (id) => {
	return users.find((post) => post.id === id);
};
