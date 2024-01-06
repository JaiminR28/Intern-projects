import { useEffect, useState } from "react";

import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.body.onclick = () => {
			console.log(count);
		};
	}, []);
	return (
		<>
			<div>
				{count}
				<button onClick={() => setCount(count + 1)}>Counter </button>
			</div>
		</>
	);
}

export default App;
