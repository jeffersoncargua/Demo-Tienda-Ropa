import { useFetch } from "../hooks/useFetch";

async function GetProductos() {
	const verbose = "GET";
	const route = "Producto/GetProductos";

	const response = await useFetch({ verbose: verbose, route: route });

	return response;
}

async function GetProducto(id) {
	const verbose = "GET";
	const route = `Producto/GetProducto/${id}`;

	const response = await useFetch({ verbose: verbose, route: route });

	return response;
}

export { GetProductos, GetProducto };
