export const fetchAllProducts = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await fetch("http://127.0.0.1:8000/Products");
			if (response.ok) {
				const data = await response.json();

				if (data) {
					resolve(data);
				}
			}
		} catch (error) {
			reject({ error });
		}
	});
};
