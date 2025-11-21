export async function useFetch({
	verbose,
	route,
	object = null,
	query = "",
	token = null,
}) {
	const url = import.meta.env.VITE_API_URL;
	var responseFromApi;

	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authentication: `Bearer ${token}`,
	};

	// const errorRequest = {
	// 	message: "",
	// 	isSuccess: false,
	// 	statusCode: 0,
	// };

	switch (verbose) {
		case "GET":
			await fetch(`${url}/${route + query}`, {
				method: verbose,
				headers: headers,
			})
				.then((result) => (responseFromApi = result.json()))
				.catch(
					(error) =>
						(responseFromApi = {
							message: `Ocurrio un error en el servidor. Error: ${error}`,
							isSuccess: false,
							statusCode: 500,
						}),
				);
			break;

		default:
			await fetch(`${url}/${route + query}`, {
				method: verbose,
				headers: headers,
				body: JSON.stringify(object),
			})
				.then((result) => (responseFromApi = result.json()))
				.catch(
					(error) =>
						(responseFromApi = {
							message: `Ocurrio un error en el servidor. Error: ${error}`,
							isSuccess: false,
							statusCode: 500,
						}),
				);
			break;
	}

	return responseFromApi;
}
