import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProductoImagen from "../../assets/LogoChompra.png";
import { clearToCart } from "../../redux/cartSlice";
import { useState } from "react";
import { FormPay } from "./components";

export const Order = () => {
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const subtotal = useSelector((state) => state.cartState.subTotal15);
	const totalIva = useSelector((state) => state.cartState.totalIva);
	const descuento = useSelector((state) => state.cartState.descuento);
	const total = useSelector((state) => state.cartState.total);
	const [showFormPay, setShowFormPay] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalProductos = shoppingCart.reduce((suma, item) => {
		return suma + item.cantidad;
	}, 0);

	const HandleBuy = () => {
		setShowFormPay(true);
	};

	const HandleCancel = () => {
		dispatch(clearToCart());
		navigate("/");
	};

	return (
		<div className="w-[95%] flex flex-col mx-auto my-10 space-y-10">
			{/* Titulo del shopping cart */}
			<span className="text-xl text-center font-extrabold">
				Items /&nbsp;
				<span className="text-2xl underline underline-offset-4 text-pink-950">
					{shoppingCart.length}
				</span>
				&nbsp;- Cantidad Productos /&nbsp;
				<span className="text-2xl underline underline-offset-4 text-pink-950">
					{totalProductos}
				</span>
			</span>

			{/* Cuadro de los detalles del carrito */}
			<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs">
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
							<th scope="col" className="px-5 py-2.5 border-x">
								Precio Unitario
							</th>
							<th scope="col" className="px-5 py-2.5 border-x">
								Descuento
							</th>
							<th scope="col" className="px-5 py-2.5 border-x">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{shoppingCart.map((item) => (
							<tr key={Math.random()} className="hover:bg-green-700/50 ">
								<td className="border p-1.5">
									<img
										className="max-w-xs mx-auto rounded-md"
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
								<td className="px-2 py-2.5 border text-center">
									<span>$ {item.precioUnitario}</span>
								</td>
								<td className="px-2 py-2.5 border text-center">
									<span>$ {item.descuento}</span>
								</td>
								<td className="px-2 py-2.5 border text-right">
									<span>{`$ ${item.total}`}</span>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="border-none">
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<th scope="col" className="px-2 py-2.5 border">
								Subtotal
							</th>
							<td className="px-2 py-2.5 border text-right">
								$ {subtotal.toFixed(2)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<th scope="col" className="px-2 py-2.5 border">
								Descuento
							</th>
							<td className="px-2 py-2.5 border text-right">
								$ {descuento.toFixed(2)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<th scope="col" className="px-2 py-2.5 border">
								Iva 15%
							</th>
							<td className="px-2 py-2.5 border text-right">
								$ {totalIva.toFixed(2)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<th scope="col" className="px-2 py-2.5 border">
								Total a Pagar
							</th>
							<td className="px-2 py-2.5 border text-right">
								$ {total.toFixed(2)}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>

			{/* Seccion para procesar el pago */}
			<div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 justify-center md:justify-end md:space-x-4">
				<button
					type="button"
					onClick={() => HandleBuy()}
					className="px-5 py-2 bg-green-400 hover:bg-green-600 rounded-lg hover:text-white flex flex-row justify-center items-center"
				>
					Pagar
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-credit-card w-5 h-5 ms-3"
						viewBox="0 0 16 16"
					>
						<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
						<path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
					</svg>
				</button>
				<button
					type="button"
					onClick={() => HandleCancel()}
					className="px-5 py-2 bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex flex-row justify-center items-center"
				>
					Cancelar Compra
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-x-circle w-5 h-5 ms-3"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
					</svg>
				</button>
			</div>

			{showFormPay && <FormPay setShowFormPay={setShowFormPay} />}
		</div>
	);
};
