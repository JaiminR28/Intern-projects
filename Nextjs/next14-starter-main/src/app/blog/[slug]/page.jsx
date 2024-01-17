import Image from "next/image";
import styles from "./singlePage.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/postUser";

function FirstPage({ params }) {
	console.log(params);
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
				<h1 className="text-6xl">This will be the Post title</h1>
				<div className="flex flex-col gap-2	">
					<Suspense fallback={<div>Loading...</div>}></Suspense>
					<Image
						className="object-cover rounded-[80%] h-12 w-12"
						src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt=""
						width={50}
						height={50}
					/>
					<div className="flex flex-col gap-3">
						<span className="text-gray-400 font-bold ">Author</span>
						<span className="font-medium">jaimin rathwa</span>
					</div>
				</div>
				<div className="text-xl">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Nisi vero impedit, corrupti, nobis voluptatem ad molestias
					sunt rem repudiandae doloremque nesciunt eius minima est
					exercitationem doloribus. Voluptatibus, officiis nemo!
				</div>
			</div>
		</div>
	);
}

export default FirstPage;
