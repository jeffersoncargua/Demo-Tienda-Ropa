// Este componente permite generar una tarjeta que muestra algunos detalles del articulo y
// un boton para dirigir a la pagina de detalles del producto

import { useNavigate } from "react-router";
import "../style/cardShop.css";

export const CardShop = ({ item }) => {
	const navigate = useNavigate();

	return (
		<div className="relative overflow-hidden cardShopBar z-20 w-[80%] mx-auto md:max-w-sm hover:transition hover:ease-in-out hover:delay-100 hover:duration-150 hover:scale-105 rounded-lg p-2 border bg-amber-50 hover:bg-blue-300 hover:border-2 hover:shadow-md hover:shadow-gray-500 border-black">
			<div className="z-40 mx-auto w-[80%] md:w-[70%]">
				<img
					src={item.pathImagen}
					alt="Aqui va una imagen del producto"
					className="mx-auto z-40 h-48 md:h-52 rounded-md"
				/>
			</div>

			<div className="p-2 flex flex-col justify-center space-y-2 text-xs md:text-sm text-center">
				<span className="text-sm md:text-md font-semibold">
					{item.descripcion}
				</span>
				<span className="text-sm md:text-md font-semibold">Tallas</span>
				<div className="italic flex flex-row items-center justify-center">
					<span className="h-2 w-2 rounded-full bg-amber-700 mx-2"></span> XL
					<span className="h-2 w-2 rounded-full bg-blue-700 mx-2"></span> X
					<span className="h-2 w-2 rounded-full bg-green-700 mx-2"></span> M
					<span className="h-2 w-2 rounded-full bg-purple-700 mx-2"></span> S
				</div>
				<button
					type="button"
					onClick={() => navigate(`productDetail/${item.id}/${null}`)}
					className="z-30 flex justify-center px-1.5 py-2 bg-blue-700 hover:transition hover:delay-100 hover:duration-200 hover:ease-in-out hover:bg-linear-65 from-blue-500 to-amber-700 group hover:text-white rounded-lg hover:cursor-pointer"
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
