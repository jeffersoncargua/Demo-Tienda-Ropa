// Esta pagina se muestra cuando el carrito de compras esta vacio

import { useNavigate } from "react-router";

export const EmptyCart = () => {
	const navigate = useNavigate();

	return (
		<div className="w-full flex items-center">
			<div className="w-[80%] sm:w-[70%] md:w-[60%] mx-auto bg-gray-500/80 flex flex-col my-5 space-y-5 rounded-lg shadow-lg shadow-black">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					className="bi bi-cart-x-fill w-[50%] h-[50%] mx-auto text-black hover:text-amber-50"
					viewBox="0 0 16 16"
				>
					<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708" />
				</svg>

				<p className="font-semibold text-center text-sm md:text-lg underline decoration-2 underline-offset-8 decoration-purple-700">
					Su carrito de compras no contiene ningún artículo
				</p>
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex flex-row items-center mx-auto rounded-lg mb-5 bg-amber-500 text-xs md:text-sm px-2 py-1.5 hover:text-white hover:border-2 hover:border-black"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-house-door-fill w-5 h-5 me-3"
						viewBox="0 0 16 16"
					>
						<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
					</svg>
					Regresar al inicio
				</button>
			</div>
		</div>
	);
};