import Image from "next/image";
import styles from "./singlePage.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";

const getData = async (slug) => {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${slug}`
	);

	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
};

const FirstPage = async ({ params }) => {
	const { slug } = params;

	// const post = await getData(slug);
	const post = await getPost(slug);

	return (
		<div className="flex gap-24">
			<div className="flex-[1] relative h-[calc(100vh-2rem)]">
				<Image
					src="https://images.unsplash.com/photo-1696912162124-9385f24a0e7b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					fill
					className={styles.img}
				/>
			</div>

			<div className="flex-[2] flex flex-col gap-10	">
				<h1 className="text-6xl">{post.title}</h1>
				<div className="flex flex-row gap-4">
					<Suspense fallback={<div>Loading...</div>}></Suspense>
					<PostUser userId={post.userId} />
					<div>
						<div className="flex flex-col gap-2">
							<span className="text-gray-400 font-bold">
								Published
							</span>
							<span className="font-[500]">06.11.24</span>
						</div>
					</div>
				</div>
				<div className="text-xl">{post.desc}</div>
			</div>
		</div>
	);
};

export default FirstPage;
