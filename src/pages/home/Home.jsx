import { useCallback, useEffect, useState } from "react";
import { CardShop } from "./components";
import { GetProductos } from "../../services/ProductService";
import { Loading } from "../../components";

// const item = {
// 	productoId: "01",
// 	cantidad: 0,
// 	precioUnitario: 10.5,
// 	descuento: 0.0,
// 	descripcion: "Chompa 1",
// 	total: (10.5 - 0.0) * 1,
// 	ventaIva: 10.5 * 0.15 * 1,
// };

// const item2 = {
// 	productoId: "02",
// 	cantidad: 0,
// 	precioUnitario: 9.5,
// 	descuento: 0.0,
// 	descripcion: "Chompa 2",
// 	total: (9.5 - 0.0) * 1,
// 	ventaIva: 9.5 * 0.15 * 1,
// };

// const item3 = {
// 	productoId: "03",
// 	cantidad: 0,
// 	precioUnitario: 13.5,
// 	descuento: 0.0,
// 	descripcion: "Chompa 3",
// 	total: (13.5 - 0.0) * 1,
// 	ventaIva: 13.5 * 0.15 * 2,
// };

// const item4 = {
// 	productoId: "04",
// 	cantidad: 0,
// 	precioUnitario: 15.5,
// 	descuento: 0.0,
// 	descripcion: "Chompa 4",
// 	total: (15.5 - 0.0) * 1,
// 	ventaIva: 15.5 * 0.15 * 2,
// };

export const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const GetAllProducts = useCallback(async () => {
		setLoading(true);
		var response = await GetProductos();
		if (response.isSuccess) {
			setProducts(response.result);
		} else {
			setProducts([]);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		GetAllProducts();
	}, [GetAllProducts]);

	return (
		<div className="p-4 w-[95%] mx-auto">
			{loading && <Loading />}

			<div className={`w-full flex flex-col ${loading && "hidden"}`}>
				<div className={`w-full flex flex-col justify-center p-4 space-y-1`}>
					<h1 className="text-xl font-extrabold text-center">
						Tienda de Ropa Xtreme
					</h1>
					<span className="w-[15%] h-1 mx-auto rounded-2xl bg-blue-600 shadow shadow-amber-50"></span>
				</div>

				{/* Esta Seccion es de chompas */}
				<section className="w-full mx-auto flex flex-wrap justify-center gap-4">
					{products.length > 0 ? (
						products.map((item) => (
							<CardShop key={item.codigoPrincipal} item={item} />
						))
					) : (
						<span className="text-semibold text-2xl text-center">
							No se encontraron registros de los productos. Inténtalo más tarde.
						</span>
					)}
				</section>
			</div>
		</div>
	);
};
