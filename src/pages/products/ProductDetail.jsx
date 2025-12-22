// Este es la pagina que muestra el detalle del producto seleccionado en
// la pagina principal o en la pagina del carrito de compras

import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState, useRef } from "react";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetProducto } from "../../services/ProductService";
import { Loading } from "../../components";

export const ProductDetail = () => {
	const params = useParams();
	const [cantidad, setCantidad] = useState(0);
	const dispatch = useDispatch();
	const [producto, setProducto] = useState({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [itemCart, setItemCart] = useState({});
	const tallaRef = useRef();

	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);

	const productoId = params.id;
	const talla = params.talla;

	const GetProduct = useCallback(async () => {
		setLoading(true);
		const response = await GetProducto(productoId);
		if (response.isSuccess) {
			if (talla !== null) {
				const productIsInShoppingCart = shoppingCart.find(
					(item) =>
						item.codigoPrincipal === response.result.codigoPrincipal &&
						item.talla === talla,
				);

				if (productIsInShoppingCart) {
					setItemCart(productIsInShoppingCart);
					setCantidad(productIsInShoppingCart.cantidad);
					setProducto(productIsInShoppingCart);
				} else {
					setItemCart(response.result);
					setCantidad(0);
					setProducto(response.result);
				}
			} else {
				setItemCart(response.result);
				setCantidad(0);
				setProducto(response.result);
			}
		} else {
			setProducto({});
		}
		setLoading(false);
	}, [shoppingCart, productoId, talla]);

	useEffect(() => {
		GetProduct();
	}, [GetProduct]);

	const handleIncrement = () => {
		if (cantidad < 10) {
			setCantidad((cantidad) => cantidad + 1);
		} else {
			alert("No se puede llevar mas de diez articulos de un mismo producto");
		}
	};

	const handleDecrement = () => {
		if (cantidad === 0) {
			toast.info(
				"La cantidad del producto es cero. No puede llevar cero productos",
			);
		} else {
			setCantidad((cantidad) => cantidad - 1);
		}
	};

	const AddToCart = () => {
		if (cantidad > 0) {
			const item = {
				productoId: productoId,
				codigoPrincipal: producto.codigoPrincipal,
				pathImagen: producto.pathImagen,
				cantidad: cantidad,
				precioUnitario: +producto.precioUnitario.toFixed(2),
				descuento: +(producto.descuento * cantidad).toFixed(2),
				descripcion: `${producto.descripcion} | Talla: ${tallaRef.current.value}`,
				talla: tallaRef.current.value,
				total: +(
					(producto.precioUnitario - producto.descuento) *
					cantidad
				).toFixed(2),
				ventaIva: +(
					(producto.precioUnitario - producto.descuento) *
					cantidad *
					0.15
				).toFixed(2),
			};
			dispatch(addToCart(item));

			toast.success("Se agrego el item al carrito");
			navigate("/");
		} else {
			toast.info(
				"La cantidad del producto debe ser mayor a cero para agregarlo al carrito",
			);
		}
	};

	return (
		<div className="w-[95%] my-10 mx-auto flex flex-col justify-center">
			{producto.id && (
				<div className="my-10 w-full flex flex-col space-y-1">
					<h3 className="text-2xl md:text-4xl font-extrabold text-shadow-lg/80 text-shadow-neutral-500 text-center">
						Detalle del Artículo
					</h3>
					<span className="mx-auto w-[30%] md:w-[15%] h-1.5 bg-blue-700 rounded-b-lg border"></span>
				</div>
			)}
			{loading ? (
				<Loading />
			) : producto.codigoPrincipal ? (
				<div className="w-[60%] mx-auto flex flex-col md:flex-row flex-wrap p-6 border rounded-md bg-amber-50 border-gray-900 shadow-lg/80 shadow-black">
					{/* Es para la imagen */}
					<section className="w-full md:w-1/2 flex items-center">
						<div className="w-[80%] mx-auto overflow-hidden rounded-md hover:delay-200 group hover:border">
							<img
								className="mx-auto border p-4 h-56 grayscale-100 hover:grayscale-0 bg-white rounded-md transform delay-200 ease-in-out duration-200 group-hover:scale-150 hover:cursor-zoom-in"
								src={itemCart.pathImagen}
								//src={ProductoImagen}
								alt="imagen del producto"
							/>
						</div>
					</section>
					{/* Es para el detalle + la cantidad a comprar */}
					<section className="w-full md:w-1/2 p-4 flex flex-col text-xs md:text-sm justify-center items-center space-y-4">
						<h5 className="text-sm md:text-lg text-center font-extrabold underline underline-offset-6">
							{itemCart.descripcion}
						</h5>
						<div>
							<b>Elige la talla: </b>
							<select
								name="talla"
								id="talla"
								ref={tallaRef}
								defaultValue={itemCart.talla}
								className="bg-white border rounded-md w-10"
							>
								<option value="XL">XL</option>
								<option value="X">X</option>
								<option value="M">M</option>
								<option value="S">S</option>
							</select>
						</div>
						<div className="transition delay-150 duration-150 ease-in-out hover:scale-110">
							<b>Precio Unitario: </b>
							<span className="p-2 rounded-md bg-linear-65 hover:font-extrabold from-amber-500 to-amber-700">
								$ {itemCart.precioUnitario}
							</span>
						</div>

						<div className="flex flex-row">
							<button
								type="button"
								onClick={handleDecrement}
								className="w-10 p-1 border flex items-center justify-center bg-gray-500 hover:bg-red-500 rounded-l-lg"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-dash-circle w-5 h-5"
									viewBox="0 0 16 16"
								>
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
								</svg>
							</button>
							<span className="w-10 bg-amber-50 flex items-center justify-center border">
								{cantidad}
							</span>
							<button
								type="button"
								onClick={handleIncrement}
								className="w-10 p-1 border bg-gray-500 flex items-center justify-center hover:bg-green-500 rounded-r-lg"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-plus-circle w-5 h-5"
									viewBox="0 0 16 16"
								>
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
								</svg>
							</button>
						</div>

						<button
							type="button"
							onClick={() => AddToCart()}
							className="flex w-full justify-center px-2 py-2 bg-blue-700 hover:bg-linear-to-r from-blue-500 to-amber-700 group hover:text-white rounded-lg hover:cursor-pointer"
						>
							Agregar Carrito
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-cart-check-fill w-5 h-5 ms-2 group-hover:text-green-500"
								viewBox="0 0 16 16"
							>
								<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708" />
							</svg>
						</button>
					</section>
				</div>
			) : (
				<div className="w-full flex flex-col my-10 space-y-10 text-xs md:text-sm">
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-x-octagon-fill mx-auto w-22 h-22"
							viewBox="0 0 16 16"
						>
							<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
						</svg>
					</span>
					<span className="mx-auto text-lg md:text-xl text-shadow-lg/90 text-shadow-gray-400 underline decoration-4 underline-offset-8 decoration-purple-700">
						No se encontró el artículo. Inténtelo mas tarde.
					</span>
					<button
						type="button"
						onClick={() => navigate("/")}
						className="px-2.5 py-2 rounded-md hover:scale-110 transition delay-100 duration-200 ease-in-out hover:bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 mx-auto bg-green-500 hover:text-white"
					>
						Regresar al Inicio
					</button>
				</div>
			)}
		</div>
	);
};
