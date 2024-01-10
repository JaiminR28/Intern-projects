import { useLocation } from "./LocationHook";

function App() {
	const location = useLocation();
	return (
		<div>
			{location?.error ? <h4>{location.error}</h4> : ""}
			{location ? (
				<p>
					Your current location is{" "}
					<strong>
						{location?.latitude} {location?.longitude}{" "}
					</strong>
				</p>
			) : (
				""
			)}
		</div>
	);
}

export default App;
