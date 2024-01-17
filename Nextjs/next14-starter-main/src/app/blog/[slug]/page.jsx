import Image from "next/image";
import styles from "./singlePage.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/postUser";

function FirstPage() {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image src="/hero.png" alt="" fill className={styles.img} />
			</div>

			<div className={styles.textContainer}>
				<h1 className={styles.title}>This will be the Post title</h1>
				<div className={styles.detail}>
					<Suspense fallback={<div>Loading...</div>}></Suspense>

					<div className={styles.detailText}>
						<span className={styles.detailTitle}>Published</span>
						<span className={styles.detailValue}>120000</span>
					</div>
				</div>
				<div className={styles.content}>desc</div>
			</div>
		</div>
	);
}

export default FirstPage;
