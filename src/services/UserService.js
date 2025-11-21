import { useFetch } from "../hooks/useFetch";

async function RegistrarUsuario(clienteDto) {
	const verbose = "POST";
	const route = "Costumer/CreateCostumer";
	const object = clienteDto;

	const response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
}

async function BurcarUsuario(identificacion) {
	const verbose = "GET";
	const route = "Costumer/GetCostumer/0";
	const query = `?query=${identificacion}`;

	const response = await useFetch({
		verbose: verbose,
		route: route,
		query: query,
	});

	return response;
}

export { RegistrarUsuario, BurcarUsuario };
