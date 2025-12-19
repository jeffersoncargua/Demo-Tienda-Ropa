import { useState } from "react";
import LogoChompa from "../assets/LogoChompra.png";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export const Header = () => {
	const [showMenu, setShowMenu] = useState(false);

	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);

	return (
		<header className="w-full flex flex-col bg-black rounded-b-md">
			<div className="flex justify-center m-3">
				<img
					className="rounded-lg max-w-2xs md:max-w-xs shadow-sm shadow-white"
					src={LogoChompa}
					alt="Aqui va el logo de la chompa"
				/>
			</div>
			<nav className="w-full relative max-md:bg-amber-50 ">
				{/* Cuando la pantalla se haga pequeña aparece el boton de hambuerguesa */}
				<button
					type="button"
					onClick={() => setShowMenu(!showMenu)}
					className="bg-gray-400 flex justify-self-start m-2 p-2 rounded-md md:hidden focus:ring-2 focus:ring-blue-600 hover:cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-list w-8 h-8"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
						/>
					</svg>
				</button>
				{/* Cuando la pantalla se vuelva pequeña esto desaparece y vuelve a aparecer cuando se presione el boton de hamburguesa */}
				<ul
					className={`bg-amber-300 md:bg-amber-500 rounded-md w-full md:space-x-4 p-2 ${!showMenu ? "max-md:-translate-x-full overflow-x-hidden max-md:min-h-screen" : "max-md:translate-x-0 max-md:min-h-[1755px]"} z-50 max-md:absolute transition-transform delay-200 duration-300 md:min-h-full flex flex-col justify-start space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between`}
				>
					<li className="flex justify-center bg-amber-200/25 max-md:hover:bg-amber-200 md:bg-transparent p-2 md:p-0 border rounded-lg md:border-0 md:m-0 md:hover:text-white md:hover:font-semibold">
						<Link
							to={"/"}
							onClick={() => setShowMenu(!showMenu)}
							className="hover:cursor-pointer md:ms-2"
						>
							Inicio
						</Link>
					</li>
					<li className="flex md:space-x-8 justify-center items-center bg-amber-200/25 max-md:hover:bg-amber-200 md:bg-transparent p-2 md:p-0 border rounded-lg md:border-0 md:m-0 ">
						<Link
							to="register"
							onClick={() => setShowMenu(!showMenu)}
							className="hover:cursor-pointer md:hover:text-white md:hover:font-semibold"
						>
							Registrarse
						</Link>
						<Link
							to="cart"
							className={`relative h-10 w-10 rounded-full  bg-amber-50 hidden md:flex md:items-center md:justify-center hover:cursor-pointer group ${shoppingCart.length > 0 ? 'hover:bg-green-400':'hover:bg-red-400'}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-cart w-6 h-6 group-hover:text-blue-900"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
							</svg>
							<span className="absolute inset-y-auto text-[10px] font-bold mb-0.5 group-hover:text-green-700">
								{shoppingCart.length}
							</span>
						</Link>
					</li>
					<li className="md:hidden flex justify-center bg-amber-200/25 max-md:hover:bg-amber-200 md:bg-transparent p-2 md:p-0 border rounded-lg md:border-0 md:m-0">
						<Link
							to="cart"
							onClick={() => setShowMenu(!showMenu)}
							className="flex items-center justify-center hover:cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="bi bi-cart w-4 h-4 me-2"
								viewBox="0 0 16 16"
							>
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
							</svg>
							Carrito
							<span className={`w-5 h-5 ms-2 ${shoppingCart.length > 0 ?'bg-green-500':'bg-red-400'} rounded-full font-bold flex items-center justify-center text-xs`}>
								{shoppingCart.length}
							</span>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
