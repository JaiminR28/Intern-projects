// FETCH ALL PRODUCTS

export const fetchAllProducts = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch("http://127.0.0.1:8000/Products");
			if (response.ok) {
				const data = await response.json();
				const totalItems = await response.headers.get("X-Total-Count");

				if (data) {
					resolve({
						data: { products: data, totalItems: +totalItems },
					});
				}
			}
		} catch (error) {
			reject({ error });
		}
	});
};

// FETCH ALL CATEGORIES

export function fetchBrands() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://127.0.0.1:8000/brands");
		const data = await response.json();

		resolve(data);
	});
}

export function fetchCategories() {
	return new Promise(async (resolve) => {
		const response = await fetch("http://127.0.0.1:8000/categories");
		const data = await response.json();

		resolve(data);
	});
}
