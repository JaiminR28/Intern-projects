import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NavigationProvider } from "./contexts/navigationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<NavigationProvider>
			<App />
		</NavigationProvider>
	</React.StrictMode>
);
