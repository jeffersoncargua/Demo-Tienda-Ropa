import { useFetch } from "../hooks/useFetch";

async function GetProductos({ search = "", pageSize = 4, pageNumber = 1 }) {
	const verbose = "GET";
	const route = "Producto/GetProductos";
	const query = `?query=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`;

	const response = await useFetch({
		query: query,
		verbose: verbose,
		route: route,
	});

	return response;
}

async function GetCantProducts() {
	const verbose = "GET";
	const route = "Producto/GetCantProductos";

	const response = await useFetch({ verbose: verbose, route: route });

	return response;
}

async function GetProducto(id) {
	const verbose = "GET";
	const route = `Producto/GetProducto/${id}`;

	const response = await useFetch({ verbose: verbose, route: route });

	return response;
}

export { GetProductos, GetCantProducts, GetProducto };
