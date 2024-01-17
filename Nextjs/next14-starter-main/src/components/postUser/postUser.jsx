// import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

const getData = async (userId) => {
	const res = await fetch(`https://randomuser.me/api/?id=${userId}`);

	if (!res.ok) throw new Error("Network response was not ok");
	return res.json();
};

const PostUser = async ({ userId }) => {
	// FETCH DATA WITH AN API
	// const user = await getData(userId);

	// FETCH DATA WITHOUT AN API
	// const user = await getUser(userId);

	const { results } = await getData(userId);

	// console.log(results[0].name);

	const avatar = results[0].picture.medium;
	const name = `${results[0].name.first} ${results[0].name.last} `;

	return (
		<div className={styles.container}>
			<Image
				className={styles.avatar}
				src={avatar}
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
