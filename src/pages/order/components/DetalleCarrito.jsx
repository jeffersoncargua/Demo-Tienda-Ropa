// Este componente permite mostrar el detalle de la venta que incluye el subtotal, el iva, el descuento
// y total a pagar por los articulos

import { useSelector } from "react-redux";

export const DetalleCarrito = () => {
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const subtotal15 = useSelector((state) => state.cartState.subTotal15);
	const totalIva = useSelector((state) => state.cartState.totalIva);
	const descuento = useSelector((state) => state.cartState.descuento);
	const total = useSelector((state) => state.cartState.total);

	return (
		<table className="w-full text-sm text-left">
			<thead className="text-sm">
				<tr className="text-center bg-gray-500 ">
					<th scope="col" className="px-2 py-2.5 rounded-tl-lg">
						Imagen del producto
					</th>
					<th scope="col" className="px-5 py-2.5 border-x">
						Descripcion
					</th>
					<th scope="col" className="px-5 py-2.5 border-x">
						Cantidad
					</th>
					<th scope="col" className="px-3 py-2.5 border-x">
						Precio Unitario
					</th>
					<th scope="col" className="px-5 py-2.5 border-x">
						Descuento
					</th>
					<th scope="col" className="px-8 py-2.5 border-x">
						Total
					</th>
				</tr>
			</thead>
			<tbody>
				{shoppingCart.map((item) => (
					<tr
						key={Math.random()}
						className="hover:bg-green-700/50 bg-gray-500/80 font-semibold"
					>
						<td className="border p-1.5 ">
							<img
								className="w-30 h-24 md:h-30 mx-auto rounded-md"
								src={item.pathImagen}
								alt="Aqui va la imagen"
							/>
						</td>
						<td className="px-2 py-2.5 border">
							<span>{item.descripcion}</span>
						</td>
						<td className="px-2 py-2.5 border text-center">
							<span>{item.cantidad}</span>
						</td>
						<td className="px-2 py-2.5 border text-right">
							<span>$ {item.precioUnitario}</span>
						</td>
						<td className="px-2 py-2.5 border text-right">
							<span>$ {item.descuento}</span>
						</td>
						<td className="px-2 py-2.5 border text-right">
							<span>{`$ ${item.total}`}</span>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot className="border-none">
				<tr className=" ">
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<th
						scope="col"
						className="px-2 py-2.5 border bg-gray-500/80 font-semibold"
					>
						Subtotal
					</th>
					<td className="px-2 py-2.5 border text-right bg-gray-500/80 font-semibold">
						$ {subtotal15.toFixed(2)}
					</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<th
						scope="col"
						className="px-2 py-2.5 border bg-gray-500/80 font-semibold"
					>
						Descuento
					</th>
					<td className="px-2 py-2.5 border text-right bg-gray-500/80 font-semibold">
						$ {descuento.toFixed(2)}
					</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<th
						scope="col"
						className="px-2 py-2.5 border bg-gray-500/80 font-semibold"
					>
						Iva 15%
					</th>
					<td className="px-2 py-2.5 border text-right bg-gray-500/80 font-semibold">
						$ {totalIva.toFixed(2)}
					</td>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<th
						scope="col"
						className="px-2 py-2.5 border bg-gray-500/80 font-semibold"
					>
						Total a Pagar
					</th>
					<td className="px-2 py-2.5 border text-right bg-gray-500/80 font-semibold">
						$ {total.toFixed(2)}
					</td>
				</tr>
			</tfoot>
		</table>
	);
};
