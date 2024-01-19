import Image from "next/image";
import styles from "./singlePage.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/postUser";
import { getPost } from "@/lib/data";
import Link from "next/link";

const getData = async (slug) => {
	const res = await fetch(`http://localhost:3000/api/blog/${slug}`);

	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
};

export const generateMetadata = async ({ params }) => {
	const { slug } = params;

	const post = await getData(slug);

	// const post = await getPost(slug);

	return {
		title: post.title,
		description: post.desc,
	};
};

const SinglePostPage = async ({ params }) => {
	const { slug } = params;

	// const post = await getData(slug);

	const post = await getPost(slug);

	return (
		<div className="flex gap-24">
			<div className="flex-[1] relative h-[calc(100vh-2rem)]">
				<Image src={post.img} alt="" fill className={styles.img} />
			</div>

			<div className="flex-[2] flex flex-col gap-10	">
				<h1 className="text-6xl">{post.title}</h1>
				<div className="flex flex-row gap-4">
					{post && (
						<Suspense fallback={<div>Loading...</div>}>
							<PostUser userId={post.userId} />
						</Suspense>
					)}
					<div>
						<div className="flex flex-col gap-2">
							<span className="text-gray-400 font-bold">
								Published
							</span>
							<span className="font-[500]">
								{post.createdAt?.toString().slice(4, 15)}
							</span>
						</div>
					</div>
				</div>
				<div className="text-xl">{post.desc}</div>
			</div>
			<div>
				<Link href="/blog">
					<button>Back</button>
				</Link>
			</div>
		</div>
	);
};

export default SinglePostPage;
