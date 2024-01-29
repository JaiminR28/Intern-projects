import Image from "next/image";

function Loading() {
	return (
		<div className="ml-[50%]">
			<Image src="/loading.gif" alt="" width={150} height={150} />
			<p>Loading...</p>
		</div>
	);
}

export default Loading;
