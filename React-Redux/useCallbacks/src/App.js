import { useEffect, useContext } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";
import BooksContext from "./context/books";

function App() {
	const { fetchBooks } = useContext(BooksContext);

	//* this is a bad practice !!
	//* bocs we are keeping the function itself as the dependency due to which on every render the function creates a new reference in the memory
	// * thus creating an infinte loop of re-renders 🤯🤯.

	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return (
		<div className="app">
			<h1>Reading List</h1>
			<BookList />
			<BookCreate />
		</div>
	);
}

export default App;
