// import { getUser } from "@/lib/data";
import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

// const getData = async (userId) => {
// 	const res = await fetch(`https://randomuser.me/api/?id=${userId}`);

// 	if (!res.ok) throw new Error("Network response was not ok");
// 	return res.json();
// };

const PostUser = async ({ userId }) => {
	// FETCH DATA WITH AN API
	// const user = await getData(userId);

	// FETCH DATA WITHOUT AN API
	// const user = await getUser(userId);

	// const { results } = await getData(userId);
	const results = await getUser(userId);

	const avatar = results.img;
	const name = results.username;

	return (
		<div className={styles.container}>
			<Image
				className={styles.avatar}
				src={avatar || "/noavatar.png"}
				alt=""
				width={50}
				height={50}
			/>
			<div className={styles.texts}>
				<span className={styles.title}>Author</span>
				<span className={styles.username}>{name}</span>
			</div>
		</div>
	);
};

export default PostUser;
