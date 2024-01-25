import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

const PORT = process.env.PORT;

const getData = async () => {
	// 	// const res = await fetch("https://jsonplaceholder.typicode.com/posts");

	// 	// if (!res.ok) throw new Error("Could not fetch data");
	// 	// else return res.json();

	// 	return await fetch("https://jsonplaceholder.typicode.com/posts", {
	return await fetch(`http://localhost:${PORT}/api/blog`, {
		next: { revalidate: 3600 },
	}).then((response) => {
		if (!response.ok) throw new Error("Could not fetch blog data");

		return response.json();
	});
};

const Blog = async () => {
	const posts = await getData();

	// const posts = await getPosts();

	return (
		<div className={styles.container}>
			{posts?.map((post) => (
				<div className={styles.post} key={post.title}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default Blog;
