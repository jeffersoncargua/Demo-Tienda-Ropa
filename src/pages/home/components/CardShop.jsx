//import ProductoImagen from "../../../assets/LogoChompra.png";
import { useNavigate } from "react-router";
//import { addToCart } from "../../../redux/cartSlice";

export const CardShop = ({ item }) => {
	//const dispatch = useDispatch();
	const navigate = useNavigate();

	// const AddToCart = (item) => {
	// 	dispatch(addToCart(item));
	// };

	return (
		<div className="w-[80%] mx-auto md:w-sm lg:w-xs hover:shadow-2xs hover:shadow-gray-500 hover:scale-105 rounded-lg p-2 border border-black">
			<img src={item.pathImagen} alt="Aqui va una imagen del producto" className="mx-auto w-[70%] md:w-full h-48 md:h-52" />
			<div className="p-2 flex flex-col justify-center space-y-2 text-sm text-center">
				<span className="text-sm font-semibold">{item.descripcion}</span>
				<span className="italic">XL | X | M | S</span>
				<button
					type="button"
					// onClick={() => AddToCart(item)}
					onClick={() => navigate(`productDetail/${item.id}`)}
					className="flex justify-center px-1.5 py-2 bg-blue-700 hover:bg-blue-600 group hover:text-white rounded-lg hover:cursor-pointer"
				>
					Ver detalles
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-box-arrow-right w-5 h-5 ms-2"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
						/>
						<path
							fillRule="evenodd"
							d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
