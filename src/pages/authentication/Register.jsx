// Este componente permite realizar el registro de los usuarios para la venta y facturacion

import { useForm } from "react-hook-form";
import { message, patterns } from "../../utils/validation/Validation";
import { ErrorMessageValidator } from "../../components";
import {
	SweetAlertSuccess,
	SweetAlertFail,
} from "../../components/SweetAlertResponse";
import { RegistrarUsuario } from "../../services/UserService";
import { useState } from "react";
import { Loading } from "../../components";
import { useNavigate } from "react-router";

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function HandleFormSumbit(register) {
		setLoading(true);
		const response = await RegistrarUsuario(register);
		console.log(response);
		if (response.isSuccess) {
			SweetAlertSuccess(response.message);
			navigate("/");
		} else {
			SweetAlertFail(response.message);
		}
		setLoading(false);
	}

	return (
		<div className="w-[95%] mx-auto flex flex-col my-10 items-center">
			<div className={`w-full flex flex-col justify-center p-4 space-y-1.5`}>
				<h1 className="text-2xl md:text-4xl font-extrabold text-center text-shadow-lg/80 text-shadow-neutral-500">
					Registro de Usuario
				</h1>
				<span className="w-[30%] md:w-[15%] h-1.5 mx-auto rounded-b-2xl bg-blue-600 border"></span>
			</div>

			<form
				onSubmit={handleSubmit(HandleFormSumbit)}
				className="w-[90%] md:w-[80%] mx-auto text-xs md:text-sm flex flex-col justify-center space-y-5 my-10 p-4 border-2 border-ambar-500 rounded-lg shadow-xs/30 shadow-green-600 bg-amber-400/60"
			>
				<div className="w-full grid grid-col-1 md:grid-cols-2 gap-y-4 md:gap-14 ">
					{/*Nombre completo */}
					<div className="flex flex-col space-y-2 relative">
						<label
							className="bg-amber-300 w-full relative p-2 underline underline-offset-4 rounded-lg border"
							htmlFor="nombreCompleto"
						>
							Nombre :
							<input
								name="nombreCompleto"
								type="text"
								{...register("nombres", {
									required: message.required.nombre,
									pattern: {
										value: patterns.patternLetter,
										message: message.error.nombre,
									},
								})}
								placeholder="Escribe tu Nombre y Apellido o Razón Social"
								className="bg-white absolute inset-y-0 left-0 w-[calc(100%-5.5rem)] px-4 rounded-r-lg ml-22  focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
							/>
						</label>
						{errors.nombres && (
							<ErrorMessageValidator message={errors.nombres.message} />
						)}
					</div>
					{/*Identificacion */}
					<div className="flex flex-col space-y-2 relative">
						<label
							className="bg-amber-300 w-full relative p-2 underline underline-offset-4 rounded-lg border"
							htmlFor="identificacion"
						>
							Identificacion:
							<input
								name="identificacion"
								type="text"
								{...register("identificacion", {
									required: message.required.identificacion,
									pattern: {
										value: patterns.patternNumber,
										message: message.error.identificacion,
									},
								})}
								placeholder="Escribe tu cédula o RUC"
								className="bg-white absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] px-4 rounded-r-lg ml-30  focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
							/>
						</label>
						{errors.identificacion && (
							<ErrorMessageValidator message={errors.identificacion.message} />
						)}
					</div>
					{/*Direccion */}
					<div className="flex flex-col space-y-2 relative">
						<label
							className="bg-amber-300 w-full relative p-2 underline underline-offset-4 rounded-lg border"
							htmlFor="direccion"
						>
							Direccion:
							<input
								name="direccion"
								type="text"
								{...register("direccion", {
									required: message.required.direccion,
									pattern: {
										value: patterns.patternAlfanumber,
										message: message.error.direccion,
									},
								})}
								placeholder="Escribe la dirección de tu domicilio"
								className="bg-white absolute inset-y-0 left-0 w-[calc(100%-5.5rem)] px-4 rounded-r-lg ml-22  focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
							/>
						</label>
						{errors.direccion && (
							<ErrorMessageValidator message={errors.direccion.message} />
						)}
					</div>
					{/*Correo */}
					<div className="flex flex-col space-y-2 relative">
						<label
							className="bg-amber-300 w-full relative p-2 underline underline-offset-4 rounded-lg border"
							htmlFor="email"
						>
							Correo:
							<input
								name="email"
								type="text"
								{...register("email", {
									required: message.required.email,
									pattern: {
										value: patterns.patternEmail,
										message: message.error.email,
									},
								})}
								placeholder="Escribe tu correo electrónico"
								className="bg-white absolute inset-y-0 left-0 w-[calc(100%-4.5rem)] px-4 rounded-r-lg ml-18  focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
							/>
						</label>
						{errors.email && (
							<ErrorMessageValidator message={errors.email.message} />
						)}
					</div>
					{/*Telefono */}
					<div className="flex flex-col space-y-2 relative">
						<label
							className="bg-amber-300 w-full relative p-2 underline underline-offset-4 rounded-lg border"
							htmlFor="telefono"
						>
							Telefono:
							<input
								name="telefono"
								type="text"
								{...register("telefono", {
									required: message.required.telefono,
									pattern: {
										value: patterns.patternPhone,
										message: message.error.telefono,
									},
								})}
								placeholder="Escribe numero de celular"
								className="bg-white absolute inset-y-0 left-0 w-[calc(100%-5.5rem)] px-4 rounded-r-lg ml-22  focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
							/>
						</label>
						{errors.telefono && (
							<ErrorMessageValidator message={errors.telefono.message} />
						)}
					</div>
				</div>

				<button
					type="submit"
					className={`w-full px-2 py-2 flex items-center justify-center bg-green-600 hover:bg-green-700 hover:text-white rounded-lg ${!loading ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}`}
					disabled={loading}
				>
					Enviar Registro
					{!loading ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-box-arrow-up w-5 h-5 ms-3"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"
							/>
							<path
								fillRule="evenodd"
								d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"
							/>
						</svg>
					) : (
						<>
							<svg
								aria-hidden="true"
								//role="status"
								className="inline w-6 h-6 ms-3 text-black animate-spin"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="#E5E7EB"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentColor"
								/>
							</svg>
							<span className="sr-only">Loading...</span>
						</>
					)}
				</button>
			</form>
			{loading && <Loading />}
		</div>
	);
};
