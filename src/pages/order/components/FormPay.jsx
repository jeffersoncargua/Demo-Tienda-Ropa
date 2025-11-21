import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { BurcarUsuario } from "../../../services/UserService";
import { Loading } from "../../../components";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { GenerarVenta } from "../../../services/SalesService";
import {
	SweetAlertFail,
	SweetAlertSuccess,
} from "../../../components/SweetAlertResponse";
import { patterns } from "../../../utils/validation/Validation";

export const FormPay = ({ setShowFormPay }) => {
	const [costumer, setCostumer] = useState({});
	// const [message, setMessage] = useState("");
	const [message, setMessage] = useState("Esto es una prueba");
	const [loading, setLoading] = useState(false);
	const [idetificacion, setIdetificacion] = useState("");
	const indetificacionRef = useRef("");

	const total = useSelector((state) => state.cartState.total);
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const descuento = useSelector((state) => state.cartState.descuento);
	const subtotal15 = useSelector((state) => state.cartState.subTotal15);
	const totalIva = useSelector((state) => state.cartState.totalIva);

	const {
		register,
		handleSubmit,
	} = useForm({
		defaultValues: {
			rucEmpresa: import.meta.env.VITE_EMPRESA_RUC,
			shoppingCart: JSON.stringify(shoppingCart),
		},
	});

	const HandlePay = async (register) => {
		register.subTotal15 = +register.subTotal15;
		register.descuento = +register.descuento;
		register.totalIVA = +register.totalIVA;
		register.total = +register.total;
		setLoading(true);
		console.log(register);
		const response = await GenerarVenta(register);
		console.log(response);
		if (response.isSuccess) {
			SweetAlertSuccess(response.message);
		} else {
			SweetAlertFail(response.message);
		}
		setLoading(false);
		setShowFormPay(false);
	};

	const HandleCostumer = async () => {
		setMessage("");
		setLoading(true);
		const response = await BurcarUsuario(indetificacionRef.current.value);
		if (response.isSuccess) {
			setCostumer(response.result);
			setIdetificacion(response.result.identificacion);
			setMessage(
				"Verifique que la informacion sea válida para continuar con el proceso de pago. Caso contraio, modifique la información.",
			);
		} else if (response.statusCode === 400) {
			setCostumer({});
			setMessage(
				<span>
					{response.message}{" "}
					<Link
						to={"/register"}
						className="text-purple-500 hover:text-purple-700 hover:underline hover:underline-offset-4"
					>
						Registrarse
					</Link>
				</span>,
			);
			setIdetificacion("");
		} else {
			setCostumer({});
			setMessage(response.message);
			setIdetificacion("");
		}
		setLoading(false);
	};

	return (
		<div tabIndex={-1} className="overflow-y-auto bg-gray-900/70 w-full fixed top-0 left-0 right-0 max-md:inset-0 min-h-full flex items-center ">
			<div className="relative flex items-center w-full min-h-full md:min-h-screen">
				<div className="w-[95%] md:w-[70%] mx-auto min-h-full bg-gray-300 p-2 md:p-4 rounded-lg">
					<button
						type="button"
						onClick={() => setShowFormPay(false)}
						className="w-6 h-6 rounded-md border bg-red-400 hover:bg-red-500 text-sm flex p-1.5 items-center justify-self-end font-extrabold mb-2"
					>
						X
					</button>
					{/* Seccion para obtener la informacion del cliente */}
					<form
						className="w-full border rounded-lg mb-3 md:mb-5 text-xs md:text-sm"
						onSubmit={handleSubmit(HandleCostumer)}
					>
						<h1 className="text-lg md:text-xl text-center mt-2">
							Ingresa tu identificación
						</h1>
						<div className="w-full flex flex-col md:flex-row md:space-x-5 md:space-y-0 space-y-3 p-2">
							<label
								htmlFor="identificacion"
								className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
							>
								Identificacion:
								<input
									name="Identificacion"
									type="text"
									required
									placeholder="Ingresa tu cédula o RUC"
									className="absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4 "
									ref={indetificacionRef}
								/>
							</label>
							<button
								type="submit"
								className="flex flex-row justify-center items-center px-2.5 py-2 rounded-lg bg-green-600 hover:bg-green-700 hover:text-white"
							>
								Buscar
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-search w-5 h-5 ms-3"
									viewBox="0 0 16 16"
								>
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
								</svg>
							</button>
						</div>
						{/*Seccion de los datos el cliente */}
						{/* {costumer.identificacion && ( */}
						{costumer && (
							<>
								<h1 className="text-lg md:text-xl text-center">
									Información del Cliente:
								</h1>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-2 md:p-4">
									<label
										htmlFor="nombres"
										className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
									>
										Cliente:
										<input
											disabled
											name="nombres"
											type="text"
											className="absolute inset-y-0 left-0 w-[calc(100%-5rem)] ml-20 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
											defaultValue={costumer.nombres || ""}
										/>
									</label>
									<label
										htmlFor="telefono"
										className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
									>
										Telefono:
										<input
											disabled
											name="telefono"
											type="text"
											className="absolute inset-y-0 left-0 w-[calc(100%-5rem)] ml-20 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
											defaultValue={costumer.telefono || ""}
										/>
									</label>
									<label
										htmlFor="direccion"
										className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
									>
										Direccion:
										<input
											disabled
											name="direccion"
											type="text"
											className="absolute inset-y-0 left-0 w-[calc(100%-5rem)] ml-20 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
											defaultValue={costumer.direccion || ""}
										/>
									</label>
									<label
										htmlFor="email"
										className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
									>
										Correo:
										<input
											disabled
											name="email"
											type="text"
											className="absolute inset-y-0 left-0 w-[calc(100%-5rem)] ml-20 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
											defaultValue={costumer.email || ""}
										/>
									</label>
								</div>
							</>
						)}

						{/* {message !== "" && ( */}
						{message && (
							<p className="w-full font-semibold italic text-sm px-4">
								Nota: {message}
							</p>
						)}
					</form>

					{/* Seccion para realizar el pago con tarjeta */}
					{/* {costumer.identificacion && ( */}
					{costumer && (
						<form
							className="w-full border rounded-lg text-xs md:text-sm"
							onSubmit={handleSubmit(HandlePay)}
						>
							<h1 className="text-lg md:text-xl text-center">
								Detalle de Facturación
							</h1>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-4 p-2">
								<input
									name="identificacionCliente"
									type="text"
									{...register("identificacionCliente")}
									hidden
									disabled
									defaultValue={idetificacion}
								/>
								<label
									htmlFor="subTotal15"
									className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
								>
									Subtotal: $
									<input
										{...register("subTotal15")}
										disabled
										name="subTotal15"
										type="number"
										step={"0.1"}
										className="absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
										defaultValue={subtotal15.toFixed(2) || 0.0}
									/>
								</label>
								<label
									htmlFor="descuento"
									className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
								>
									Descuento: $
									<input
										{...register("descuento")}
										disabled
										name="descuento"
										type="number"
										step={"0.1"}
										className="absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
										defaultValue={descuento.toFixed(2) || 0.0}
									/>
								</label>
								<label
									htmlFor="totalIVA"
									className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
								>
									IVA 15%: $
									<input
										{...register("totalIVA")}
										disabled
										name="totalIVA"
										type="number"
										step={"0.1"}
										className="absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
										defaultValue={totalIva.toFixed(2) || 0.0}
									/>
								</label>
								<label
									htmlFor="total"
									className="relative w-full underline underline-offset-4 border rounded-lg bg-amber-300 p-1.5 md:p-2"
								>
									Total: $
									<input
										{...register("total")}
										disabled
										name="total"
										type="number"
										step={"0.1"}
										className="absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:right-2 focus:ring-blue-600 focus:ring-offset-4 "
										defaultValue={total.toFixed(2) || 0.0}
									/>
								</label>
							</div>

							<button
								type="submit"
								className="mx-auto px-4 py-2 rounded-lg bg-yellow-700 hover:bg-yellow-600 flex flex-row justify-center items-center hover:text-white mb-2 md:mb-5"
							>
								Confirmar Pago
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									class="bi bi-coin w-5 h-5 ms-2"
									viewBox="0 0 16 16"
								>
									<path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
									<path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
								</svg>
							</button>
						</form>
					)}
				</div>

			{loading && <Loading />}
			</div>
			
		</div>
	);
};
