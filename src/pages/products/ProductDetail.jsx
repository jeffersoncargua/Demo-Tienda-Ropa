import { useNavigate, useParams } from "react-router";
//import ProductoImagen from "../../assets/LogoChompra.png";
import { useCallback, useEffect, useState } from "react";
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

	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);

	const productoId = params.id;

	// const products = [
	// 	{
	// 		productoId: "01",
	// 		cantidad: 0,
	// 		precioUnitario: 10.5,
	// 		descuento: 0.0,
	// 		descripcion: "Chompa 1",
	// 		total: (10.5 - 0.0) * 1,
	// 		ventaIva: 10.5 * 0.15 * 1,
	// 	},
	// 	{
	// 		productoId: "02",
	// 		cantidad: 0,
	// 		precioUnitario: 9.5,
	// 		descuento: 0.0,
	// 		descripcion: "Chompa 2",
	// 		total: (9.5 - 0.0) * 1,
	// 		ventaIva: 9.5 * 0.15 * 1,
	// 	},
	// 	{
	// 		productoId: "03",
	// 		cantidad: 0,
	// 		precioUnitario: 13.5,
	// 		descuento: 0.0,
	// 		descripcion: "Chompa 3",
	// 		total: (13.5 - 0.0) * 1,
	// 		ventaIva: 13.5 * 0.15 * 2,
	// 	},
	// 	{
	// 		productoId: "04",
	// 		cantidad: 0,
	// 		precioUnitario: 15.5,
	// 		descuento: 0.0,
	// 		descripcion: "Chompa 4",
	// 		total: (15.5 - 0.0) * 1,
	// 		ventaIva: 15.5 * 0.15 * 2,
	// 	},
	// ];

	const GetProduct = useCallback(async() => {
		setLoading(true);
		const response = await GetProducto(productoId);
		if (response.isSuccess) {
			const productIsInShoppingCart = shoppingCart.find(
				(item) => item.codigoPrincipal === response.result.codigoPrincipal,
			);
			if (productIsInShoppingCart) {
				setItemCart(productIsInShoppingCart);
				
				setCantidad(productIsInShoppingCart.cantidad);
			} else {
				setItemCart(response.result);
				setCantidad(0);
			}
			setProducto(response.result);
		} else {
			setProducto({});
		}
		setLoading(false);
	},[shoppingCart, productoId])

	useEffect(() => {
		GetProduct();
	}, []);

	const handleIncrement = () => {
		if (cantidad < 10) {
			setCantidad((cantidad) => cantidad + 1);
		} else {
			alert("No se puede llevar mas de diez articulos de un mismo producto");
		}
	};

	const handleDecrement = () => {
		if (cantidad === 0) {
			alert("La cantidad del producto es cero. No puede llevar cero productos");
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
				descripcion: producto.descripcion,
				total: +((producto.precioUnitario - producto.descuento) * cantidad).toFixed(2),
				ventaIva: +((producto.precioUnitario - producto.descuento) * cantidad  * 0.15).toFixed(2) ,
			};

			console.log(item);
			dispatch(addToCart(item));

			toast.success("Se agrego el item al carrito");
			navigate("/");
		} else {
			alert(
				"La cantidad del producto debe ser mayor a cero para agregarlo al carrito",
			);
		}
	};

	return (
		<div className="w-[95%] my-10 mx-auto flex flex-col justify-center">
			{loading ? (
				<Loading />
			) : (
				<div className="w-[60%] mx-auto flex flex-col md:flex-row flex-wrap p-2 border rounded-md border-gray-900 shadow shadow-xl/30 shadow-blue-100">
					{/* Es para la imagen */}
					<section className="w-full md:w-1/2 flex items-center">
						<img
							className="w-[80%] h-56 mx-auto rounded-md"
							src={itemCart.pathImagen}
							alt="imagen del producto"
						/>
					</section>
					{/* Es para el detalle + la cantidad a comprar */}
					<section className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center space-y-2">
						<h5 className="text-lg text-center font-semibold">
							{itemCart.descripcion}
						</h5>
						<span>
							<b>Tallas en: </b>XL | X | M | S
						</span>
						<span>
							<b>Precio Unitario: </b>$ {itemCart.precioUnitario}
						</span>

						<div className="flex flex-row">
							<button
								type="button"
								onClick={handleDecrement}
								className="w-10 p-2 bg-gray-500 hover:bg-red-500 rounded-l-lg"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-dash-circle"
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
								className="w-10 p-2 bg-gray-500 hover:bg-green-500 rounded-r-lg"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-plus-circle"
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
							className="flex w-full justify-center px-2 py-2 bg-blue-700 hover:bg-blue-600 group hover:text-white rounded-lg hover:cursor-pointer"
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
			)}
		</div>
	);
};
