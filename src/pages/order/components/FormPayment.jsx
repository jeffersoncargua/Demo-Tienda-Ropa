// Este formulario permite recibir la informacion de la tarjeta de credito/ debito,
// asi como el diferido y la forma de pago para continuar con el proceso de facturacion

import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { ErrorMessageValidator } from "../../../components";
import { CreateTokenPay } from "../../../services/SalesService";
import LogoMastercard from "../../../assets/mastercard.png";
import LogoVisa from "../../../assets/visa.png";
import { message, patterns } from "../../../utils/validation/Validation";
import { SweetAlertFail } from "../../../components/SweetAlertResponse";
import { ButtonCancel } from "./ButtonCancel";
import { pattern } from "motion/react-client";

export const FormPayment = ({
	name,
	HandleBuy,
	setToken,
	setLoading,
	deferred,
	setDeferred,
	token,
	setFormPay,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showDeferred, setShowDeferred] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [expiratioCard, setExpirationCard] = useState({
		month: null,
		year: null,
	});
	const total = useSelector((state) => state.cartState.total);

	const HandleFormPay = (event) => {
		const formaPago = event.target.value;
		if (formaPago === "credito") {
			setFormPay("19"); // Aqui va el codigo en la forma de pago con tarjeta de credito
			setShowDeferred(true);
		} else {
			setShowDeferred(false);
			setFormPay("16"); // Aqui va el codigo en la forma de pago con tarjeta de debito
			setDeferred({ isDeferred: false, plazos: 0 });
		}
	};

	const HandleDeferred = (event) => {
		if (event.target.value === "true") {
			setDeferred({ ...deferred, isDeferred: true });
		} else {
			setDeferred({ isDeferred: false, plazos: 0 });
		}
	};

	const HandlePlazos = (event) => {
		const plazo = +event.target.value;
		setDeferred({ ...deferred, plazos: plazo });
	};

	// Este metodo permite bloquear el ingreso de cualquier caracter que no sea un numero o la tecla de borrado
	const HandleChangeNumber = (event) => {
		if ((event.keyCode <= 47 || event.keyCode >= 58) && event.keyCode !== 8) {
			event.preventDefault();
		} else {
			event.target.value = event.target.value
				.replace(/[^\dA-Z]/g, "")
				.replace(/(.{4})/g, "$1 ")
				.trim();
		}
	};

	// En este metodo se recibe la fecha seleccionada del datepicker
	const HandleExpiration = (selectDate) => {
		setSelectedDate(selectDate);
		setExpirationCard({
			month: (selectDate.getMonth() + 1).toString().padStart(2, "0"),
			year: selectDate.getFullYear().toString().slice(-2),
		});
	};

	//Esta funcion permite generar un token para proceder con el pago en kushki,
	//es decir aun no se realizo el cobro como tal, solo es un token para autorizar el pago
	const HandleRequestToken = async (register) => {
		const requestToken = {
			card: {
				name: name,
				//number: register.number.replaceAll(" ", ""),
				number: import.meta.env.VITE_CARD_NUMBER,
				expiryMonth: expiratioCard.month,
				expiryYear: expiratioCard.year,
				cvv: register.cvv,
			},
			totalAmount: +total.toFixed(2),
			currency: "USD",
			isDeferred: deferred.isDeferred,
		};

		setLoading(true);

		const response = await CreateTokenPay(requestToken);

		if (response.isSuccess) {
			setToken(response.result);
			HandleBuy();
		} else {
			setToken("");
			SweetAlertFail(response.message);
		}
		setLoading(false);
	};

	return (
		<form
			onSubmit={handleSubmit(HandleRequestToken)}
			className="w-full ring-4 ring-amber-600 border rounded-lg text-xs md:text-sm md:shadow-lg md:shadow-black bg-amber-100"
		>
			<h1 className="text-lg md:text-xl text-center my-2">
				2. Seleccione la forma de pago
			</h1>

			{/*Seccion para escoger la forma de pago */}
			<div className="flex flex-row justify-center items-center my-2 space-x-8">
				<div className="flex items-center space-x-2">
					<input
						// onChange={() => HandleFormPay("debito")}
						type="radio"
						value="debito"
						name="paymentMethod"
						id="debito"
						className="w-4 h-4"
						disabled={token !== ""}
						{...register("paymentMethod", {
							required: message.required.paymentMethod,
							onChange: HandleFormPay,
						})}
					/>
					<label htmlFor="debito">Débito</label>
				</div>
				<div className="flex items-center space-x-2">
					<input
						// onChange={() => HandleFormPay("credito")}
						type="radio"
						value="credito"
						name="paymentMethod"
						id="credito"
						className="w-4 h-4"
						disabled={token !== ""}
						{...register("paymentMethod", {
							required: message.required.paymentMethod,
							onChange: HandleFormPay,
						})}
					/>
					<label htmlFor="credito">Crédito</label>
				</div>
				{errors.paymentMethod && (
					<ErrorMessageValidator message={errors.paymentMethod.message} />
				)}
			</div>

			{/* Seccion para esocger si desea diferir el pago */}
			{showDeferred && (
				<div className="flex flex-row justify-center my-1 items-center space-x-8">
					<span>Dese diferir el pago?</span>
					<div className="flex items-center space-x-2">
						<input
							// onChange={() => HandleDeferred(true)}
							type="radio"
							value={true}
							name="diferido"
							id="Si"
							className="w-4 h-4"
							disabled={token !== ""}
							{...register("diferido", {
								required: message.required.diferido,
								onChange: HandleDeferred,
							})}
						/>
						<label htmlFor="Si">Si</label>
					</div>
					<div className="flex items-center space-x-2">
						<input
							// onChange={() => HandleDeferred(false)}
							type="radio"
							value={false}
							name="diferido"
							id="No"
							className="w-4 h-4"
							disabled={token !== ""}
							{...register("diferido", {
								required: message.required.diferido,
								onChange: HandleDeferred,
							})}
						/>
						<label htmlFor="No">No</label>
					</div>
					{errors.diferido && (
						<ErrorMessageValidator message={errors.diferido.message} />
					)}
				</div>
			)}

			{/* Seccion para escoger a cuantos meses se va a diferir */}
			{deferred.isDeferred && (
				<div className="flex flex-row justify-center my-1.5 items-center space-x-8">
					<span>Escoja a cuantos meses desea diferir:</span>
					<div className="flex items-center space-x-2">
						<input
							// onChange={() => HandlePlazos(3)}
							type="radio"
							value={3}
							name="plazos"
							id="3"
							className="w-4 h-4"
							disabled={token !== ""}
							{...register("plazos", {
								required: message.required.plazos,
								onChange: HandlePlazos,
							})}
						/>
						<label htmlFor="3">3</label>
					</div>
					<div className="flex items-center space-x-2">
						<input
							// onChange={() => HandlePlazos(6)}
							type="radio"
							value={6}
							name="plazos"
							id="6"
							className="w-4 h-4"
							disabled={token !== ""}
							{...register("plazos", {
								required: message.required.plazos,
								onChange: HandlePlazos,
							})}
						/>
						<label htmlFor="6">6</label>
					</div>
					<div className="flex items-center space-x-2">
						<input
							//onChange={() => HandlePlazos(9)}
							type="radio"
							value={9}
							name="plazos"
							id="9"
							className="w-4 h-4"
							disabled={token !== ""}
							{...register("plazos", {
								required: message.required.plazos,
								onChange: HandlePlazos,
							})}
						/>
						<label htmlFor="9">9</label>
					</div>
					{errors.plazos && (
						<ErrorMessageValidator message={errors.plazos.message} />
					)}
				</div>
			)}

			{/* Seccion para recolectar informacion de la tarjeta de credito o debito */}
			<div className="w-full flex flex-col space-y-4">
				<label
					htmlFor="number"
					className="relative w-[95%] border rounded-lg bg-amber-300 mx-auto flex flex-row justify-start items-center p-1 md:p-1.5"
				>
					<img
						src={LogoMastercard}
						className="w-10 h-6 md:w-12 md:h-7 ms-3.5 md:ms-1.5"
						alt="Logo Mastercard"
					/>
					<img
						src={LogoVisa}
						className="w-8 h-6 md:w-10 md:h-7 ms-1.5 px-1 py-0.5 rounded-md bg-amber-50"
						alt="Logo Mastercard"
					/>
					<input
						{...register("number", { required: message.required.number, pattern: {value: patterns.patternCardNumber, message: message.error.number}})}
						type="text"
						name="number"
						className="w-[calc(100%-7.5rem)] bg-amber-50 absolute inset-y-0 left-0 ml-30 pl-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-blue-700"
						placeholder="Ingrese el número de la Tarjeta"
						disabled={token !== ""}
						maxLength={19}
						onKeyDown={(e) => HandleChangeNumber(e)}
					/>
				</label>
				<span className="w-[95%] mx-auto">
					{errors.number && (
						<ErrorMessageValidator message={errors.number.message} />
					)}
				</span>

				<div className="w-[95%] mx-auto flex flex-col md:flex-row items-center space-y-5 md:space-y-0 space-x-4">
					<div className="w-full max-md:mx-auto md:w-[55%] flex flex-row items-center border rounded-lg">
						<span className="bg-amber-300 p-1.5 md:p-2 rounded-l-lg underline underline-offset-4">
							Fecha Expiración:
						</span>
						<DatePicker
							className="focus:outline-none"
							showIcon
							selected={selectedDate}
							onChange={(selectDate) => HandleExpiration(selectDate)}
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="w-8 h-8 bi bi-calendar3"
									viewBox="0 0 16 16"
								>
									<path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
									<path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
								</svg>
							}
							showMonthYearPicker
							dateFormat="MM/yy"
							required
							disabled={token !== ""}
						/>
					</div>
					<div className="w-full md:w-[45%]">
						<div className="w-full flex flex-col">
							<label
								htmlFor="cvv"
								className="underline underline-offset-4 relative w-full border rounded-lg bg-amber-300 mx-auto flex flex-row p-1.5 md:p-2"
							>
								CVV:
								<input
									{...register("cvv", { required: message.required.cvv, pattern: {value: patterns.patternCVV, message: message.error.cvv}})}
									type="text"
									name="cvv"
									className="w-[calc(100%-3rem)] bg-amber-50 absolute inset-y-0 left-0 ml-12 pl-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-blue-700"
									placeholder="Ingrese el CVV de la Tarjeta"
									disabled={token !== ""}
									maxLength={3}
									onKeyDown={HandleChangeNumber}
								/>
							</label>
							{errors.cvv && (
								<ErrorMessageValidator message={errors.cvv.message} />
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-row items-center justify-center space-x-4 mb-2 md:mb-5 my-4">
				<button
					type="submit"
					//onClick={() => HandleBuy()}
					disabled={token !== ""}
					className={`${token === "" ? "cursor-pointer" : "cursor-not-allowed"} px-4 py-2 rounded-lg bg-green-700 hover:bg-green-600 flex flex-row justify-center items-center hover:text-white hover:border-2 hover:border-black font-semibold`}
				>
					Generar Pago
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="w-4 h-4 bi bi-credit-card-fill ms-2"
						viewBox="0 0 16 16"
					>
						<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
					</svg>
				</button>

				<ButtonCancel token={token} tipo="token" />
				{/* <button
					type="button"
					onClick={() => HandleCancel()}
					className={`${token === "" ? "flex" : "hidden"} px-4 py-2 bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex-row justify-center items-center`}
				>
					Cancelar Compra
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						className="bi bi-x-circle w-4 h-4 ms-2"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
					</svg>
				</button> */}
			</div>
		</form>
	);
};
