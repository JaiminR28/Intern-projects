// import HydrationTest from "@/components/hydration/hydration";
// import dynamic from "next/dynamic";
import Image from "next/image";

// const HydrationTestNoSSR = dynamic(
// 	() => import("@/components/hydration/hydration"),
// 	{
// 		ssr: false,
// 	}
// );

function Contact() {
	return (
		<div className="flex items-center gap-24">
			<div className="flex-[1] relative h-[500px]">
				<Image
					className="object-contain"
					src="/contact.png"
					alt=""
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 44vw"
				/>
			</div>
			<div className="flex-[1]">
				{/*<HydrationTestNoSSR />*/}
				<form className="form" action="">
					<input
						className="input"
						type="text"
						placeholder="Name and Surname"
						name=""
						id=""
					/>
					<input
						className="input"
						type="email"
						placeholder="Email"
						name=""
						id=""
					/>
					<input
						className="input"
						type="tel"
						placeholder="Phone. no (Optional)"
						name=""
						id=""
					/>
					<textarea
						className="input"
						name=""
						id=""
						cols="30"
						rows="10"
						placeholder="Message"
					></textarea>
					<button className="p-5 bg-[var(--btn)] text-[var(--text)] font-bold border-none rounded-md cursor-pointer">
						Send
					</button>
				</form>
			</div>
		</div>
	);
}

export default Contact;
