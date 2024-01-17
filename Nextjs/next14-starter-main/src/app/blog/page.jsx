import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";

const getData = async () => {
	// const res = await fetch("https://jsonplaceholder.typicode.com/posts");

	// if (!res.ok) throw new Error("Could not fetch data");
	// else return res.json();

	return await fetch("https://jsonplaceholder.typicode.com/posts", {
		next: { revalidate: 3600 },
	}).then((response) => {
		if (!response.ok) throw new Error("Could not fetch data");
		return response.json();
	});
};

const Blog = async () => {
	// FETCH DATA USING AN API
	// const posts = await getData();

	// FETCH DATA WITHOUT USING API
	const posts = await getPosts();

	return (
		<div className={styles.container}>
			{posts.map((post) => (
				<div className={styles.post} key={post.id}>
					<PostCard post={post} />
				</div>
			))}
		</div>
	);
};

export default Blog;
