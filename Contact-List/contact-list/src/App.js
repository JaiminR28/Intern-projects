import { useContext, useEffect } from "react";
import "./App.css";
import contactsContext from "./contexts/contacts";
import ContactFormPage from "./Pages/ContactFormPage";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/add-contact",
		element: <ContactFormPage />,
	},

	{
		path: "/edit-contact/:id",
		element: <ContactFormPage />,
	},
]);

function App() {
	const { fetchContacts } = useContext(contactsContext);

	useEffect(() => {
		fetchContacts();
		<Navigate to={"/"} />;
	}, []);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
