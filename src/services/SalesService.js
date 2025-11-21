import { useFetch } from "../hooks/useFetch";

async function GenerarVenta(ventaDto) {
	const route = "Venta/GenerarVenta";
	const verbose = "POST";
	const object = ventaDto;

	const response = await useFetch({
		verbose: verbose,
		route: route,
		object: object,
	});

	return response;
}

export { GenerarVenta };
