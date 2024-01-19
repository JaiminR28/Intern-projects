import { addPost, deletePost } from "@/lib/action";

function ServerActionTest() {
	return (
		<div>
			<form className="flex flex-col gap-6 w-[48rem]" action={addPost}>
				<input
					className="text-black"
					type="text"
					name="title"
					id=""
					placeholder="title"
				/>
				<input
					className="text-black"
					type="text"
					name="desc"
					placeholder="desc"
				/>
				<input
					className="text-black"
					type="text"
					name="slug"
					id=""
					placeholder="slug"
				/>
				<input
					className="text-black"
					type="text"
					name="userId"
					id=""
					placeholder="userId"
				/>
				<input
					className="text-black"
					type="text"
					name="img"
					id=""
					placeholder="img"
				/>
				<button>Create</button>
			</form>

			<form action={deletePost}>
				<input type="text" placeholder="postId" name="id" />
				<button>Delete</button>
			</form>
		</div>
	);
}

export default ServerActionTest;
