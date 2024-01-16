import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
	return (
		<div className="flex flex-col text-center lg:flex lg:gap-28 lg:flex-row">
			<div className="flex-[1] flex flex-col gap-12">
				<h1 className="text-5xl md:text-9xl">
					Creative Thoughts Agency.
				</h1>
				<p className="text-xl">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Vero blanditiis adipisci minima reiciendis a autem assumenda
					dolore.
				</p>
				<div className="flex justify-center lg:flex lg:gap-[20px] lg:justify-start">
					<button className="button bg-[var(--btn)] text-[var(--text)]">
						Learn More
					</button>
					<button className="button">Contact</button>
				</div>
				<div className="brands">
					<Image
						src="/brands.png"
						alt=""
						fill
						className={styles.brandImg}
					/>
				</div>
			</div>
			<div className={styles.imgContainer}>
				<Image src="/hero.gif" alt="" fill className={styles.heroImg} />
			</div>
		</div>
	);
};

export default Home;
