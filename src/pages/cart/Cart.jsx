// Esta pagina muestra los articulos agregados por el usuario ql carrito de compras

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router";

export const Cart = () => {
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const total = useSelector((state) => state.cartState.total);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<div className="w-[95%] flex flex-col mx-auto my-10 space-y-10">
			{/* Detalle del shopping cart */}
			<div className={`w-full flex flex-col justify-center p-4 space-y-1.5`}>
				<h1 className="text-2xl md:text-4xl text-shadow-lg/80 text-shadow-neutral-500 text-center font-extrabold">
					Detalle de la venta:
				</h1>
				<span className="w-[30%] md:w-[15%] h-1.5 mx-auto rounded-b-2xl bg-blue-600 border"></span>
			</div>

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
								Total
							</th>
							<th scope="col" className="px-2 py-2.5 rounded-tr-lg">
								Acciones
							</th>
						</tr>
					</thead>
					<tbody>
						{shoppingCart.map((item) => (
							<tr
								key={Math.random()}
								className="hover:bg-green-700/50 bg-gray-500/80 font-semibold"
							>
								<td className="border p-1.5">
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
								<td className="px-2 py-2.5 border text-center">
									<span>{item.precioUnitario}</span>
								</td>
								<td className="px-2 py-2.5 border text-right">
									<span>$ {item.total}</span>
								</td>
								<td className="px-2 py-2.5 border">
									<div className="flex justify-center items-center gap-3 flex-wrap text-xs md:text-sm">
										<button
											type="button"
											onClick={() =>
												navigate(
													`/productDetail/${item.productoId}/${item.talla}`,
												)
											}
											className="px-2.5 py-2 bg-blue-600 hover:bg-blue-700 hover:text-white rounded-md flex flex-row items-center hover:border-2 hover:border-black font-semibold"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												className="bi bi-exposure w-5 h-5 me-2"
												viewBox="0 0 16 16"
											>
												<path d="M8.5 4a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0V7h2a.5.5 0 0 0 0-1h-2zm-3 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
												<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8" />
											</svg>
											Cambiar cantidad
										</button>
										<button
											type="button"
											onClick={() => {
												dispatch(removeToCart(item));
												toast.info("Se elimino el item del carrito");
											}}
											className="px-2.5 py-2 bg-red-600 hover:bg-red-700 hover:text-white rounded-md flex flex-row items-center hover:border-2 hover:border-black font-semibold"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												className="bi bi-cart-x w-5 h-5 me-2"
												viewBox="0 0 16 16"
											>
												<path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
												<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
											</svg>
											Quitar del carrito
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Seccion para ir a pagar */}
			{shoppingCart.length > 0 && (
				<div className="flex flex-row items-center justify-center md:justify-end space-x-4 text-xs md:text-sm">
					<Link
						to={"/order"}
						className="bg-green-600 hover:bg-green-700 hover:text-white rounded-lg flex flex-row justify-center items-center px-5 py-2  hover:border-2 hover:border-black font-semibold"
					>
						Ir a Pagar: ${total.toFixed(2)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-cash-coin w-5 h-5 ms-2.5"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
							/>
							<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
							<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
							<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
						</svg>
					</Link>
					<Link
						to={"/"}
						className="bg-yellow-300 hover:bg-yellow-600 hover:text-white rounded-lg flex flex-row justify-center items-center px-5 py-2  hover:border-2 hover:border-black font-semibold"
					>
						Seguir Comprando
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-cart-fill w-5 h-5 ms-2"
							viewBox="0 0 16 16"
						>
							<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
						</svg>
					</Link>
				</div>
			)}
		</div>
	);
};
