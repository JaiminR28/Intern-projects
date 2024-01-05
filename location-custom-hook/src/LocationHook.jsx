import { useEffect, useState } from "react";

export const useLocation = () => {
	const [location, setLocation] = useState(null);

	useEffect(() => {
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						setLocation({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
							error: null,
						});
					},
					(err) => {
						setLocation({
							latitude: null,
							longitude: null,
							error: err.message,
						});
					}
				);
			} else {
				setLocation({
					latitude: null,
					longitude: null,
					error: "Please turn on your location",
				});
			}
		};

		getLocation();
	}, []);

	return location;
};
