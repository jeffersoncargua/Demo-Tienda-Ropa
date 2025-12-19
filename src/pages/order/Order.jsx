import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { clearToCart } from "../../redux/cartSlice";
import { useState, useRef, useEffect } from "react";
import { BuscarUsuario } from "../../services/UserService";
import { GenerarVenta } from "../../services/SalesService";
import { Loading } from "../../components";
import { Link } from "react-router";
import {
	FormCostumerInfomation,
	FormPayment,
	DetalleCarrito,
} from "./components";
import {
	SweetAlertSuccess,
	SweetAlertFail,
} from "../../components/SweetAlertResponse";
//import { FormPay } from "./components";

export const Order = () => {
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const descuento = useSelector((state) => state.cartState.descuento);
	const totalIva = useSelector((state) => state.cartState.totalIva);
	const subTotal15 = useSelector((state) => state.cartState.subTotal15);
	const total = useSelector((state) => state.cartState.total);
	const [showFormPay, setShowFormPay] = useState(false);
	const [costumer, setCostumer] = useState({});
	const [token, setToken] = useState("");
	const [formPay, setFormPay] = useState(""); // Aqui va el codigo de la forma de pago del sri
	const [deferred, setDeferred] = useState({ isDeferred: false, plazos: 0 });
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [elementFocus, setElementFocus] = useState(null);
	const [identificacion, setIdentificacion] = useState("");
	const identificacionRef = useRef("");

	const { register, handleSubmit } = useForm({
		defaultValues: {
			rucEmpresa: import.meta.env.VITE_EMPRESA_RUC,
			shoppingCart: JSON.stringify(shoppingCart),
		},
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalProductos = shoppingCart.reduce((suma, item) => {
		return suma + item.cantidad;
	}, 0);

	const HandleBuy = () => {
		// setShowFormPay(true);
		const costumerInformation = document.getElementById("costumer-information");
		setElementFocus(costumerInformation);
		setShowFormPay(!showFormPay);
	};

	const HandleCancel = () => {
		dispatch(clearToCart());
		navigate("/");
	};

	const HandlePay = async () => {
		const ventaDto = {
			identificacionCliente: identificacion,
			shoppingCart: JSON.stringify(shoppingCart),
			rucEmpresa: import.meta.env.VITE_EMPRESA_RUC,
			descuento: +descuento.toFixed(2),
			total: +total.toFixed(2),
			subTotal15: +subTotal15.toFixed(2),
			totalIva: +totalIva.toFixed(2),
			token: token,
			isDeferred: deferred.isDeferred,
			plazos: deferred.plazos,
			formaPago: formPay,
		};
		setLoading(true);
		console.log(ventaDto);
		const response = await GenerarVenta(ventaDto);
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
		const response = await BuscarUsuario(identificacionRef.current.value);
		if (response.isSuccess) {
			setCostumer(response.result);
			setIdentificacion(response.result.identificacion);
			setMessage(
				"Verifique que la informacion sea válida para continuar con el proceso de pago. Caso contraio, modifique la información.",
			);
		} else if (response.statusCode === 400) {
			setCostumer({});
			setMessage(
				<span>
					{response.message}
					{". Para realizar la compra presione el enlace de "}
					<Link
						to={"/register"}
						className="text-purple-500 hover:text-purple-700 hover:underline hover:underline-offset-4"
					>
						Registrarse
					</Link>
					{" y rellene el formulario."}
				</span>,
			);
			setIdentificacion("");
		} else {
			setCostumer({});
			setMessage(response.message);
			setIdentificacion("");
		}
		setLoading(false);
	};

	useEffect(() => {
		setTimeout(() => {
			if (elementFocus != null) {
				elementFocus.scrollIntoView({ behavior: "smooth" });
			}
		}, 500);
	}, [elementFocus]);

	return (
		<div className="w-[95%] flex flex-col mx-auto my-10 space-y-10">
			{/* En esta seccion va el proceso de pago sea con tarjeta de credito o de debito */}
			<div className={`w-full flex flex-col space-y-4`}>
				<div className={`w-full flex flex-col justify-center p-4 space-y-1.5`}>
					<h1 className="text-2xl md:text-4xl text-shadow-lg/80 text-shadow-neutral-500 text-center font-extrabold">
						Detalles de Facturación
					</h1>
					<span className="w-[30%] md:w-[15%] h-1.5 mx-auto rounded-b-2xl bg-blue-600 border"></span>
				</div>
				<div className="w-full flex flex-col justify-center space-y-10">
					<div className="w-full md:w-[70%] mx-auto">
						<div className="w-full min-h-full">
							{/* Seccion para obtener la informacion del cliente */}
							<FormCostumerInfomation
								identificacionRef={identificacionRef}
								handleSubmit={handleSubmit}
								HandleCostumer={HandleCostumer}
								message={message}
								costumer={costumer}
							/>

							{/* Seccion para realizar el pago con tarjeta */}
							{/* {costumer.identificacion && ( */}
						</div>
					</div>
					<div className="w-full md:w-[70%] mx-auto">
						{costumer.identificacion && (
							<FormPayment
								name={costumer.nombres}
								HandleBuy={HandleBuy}
								setToken={setToken}
								setLoading={setLoading}
								deferred={deferred}
								setDeferred={setDeferred}
								token={token}
								setFormPay={setFormPay}
							/>
						)}
					</div>
				</div>
			</div>

			<div
				id="costumer-information"
				name="costumer-information"
				className={`snap-always snap-center ${showFormPay ? "" : "hidden"} w-full flex flex-col space-y-4`}
			>
				{/* Titulo del shopping cart */}
				<div className="text-xl text-center font-extrabold text-shadow-lg/80 text-shadow-neutral-500">
					Items /&nbsp;
					<span className="text-2xl underline underline-offset-4 text-pink-950">
						{shoppingCart.length}
					</span>
					&nbsp;- Cantidad Productos /&nbsp;
					<span className="text-2xl underline underline-offset-4 text-pink-950">
						{totalProductos}
					</span>
				</div>

				{/* Cuadro de los detalles del carrito */}
				<div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs">
					<DetalleCarrito />
				</div>

				{/* Seccion para procesar el pago */}
				<div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 justify-center md:justify-end md:space-x-4">
					<button
						type="button"
						onClick={() => HandlePay()}
						className="px-5 py-2 bg-green-400 hover:bg-green-600 rounded-lg hover:text-white flex flex-row justify-center items-center"
					>
						3. Confirmar Pago
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="w-5 h-5 bi bi-cash-coin ms-3"
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
					</button>
					<button
						type="button"
						onClick={() => HandleCancel()}
						className="px-5 py-2 bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex flex-row justify-center items-center"
					>
						Cancelar Compra
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							className="bi bi-x-circle w-5 h-5 ms-3"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
						</svg>
					</button>
				</div>
			</div>

			{/* {showFormPay && <FormPay setShowFormPay={setShowFormPay} />} */}
			{/* Este loading permite bloquear el acceso a los formularios mientras se realiza el proceso de pago */}
			{loading && <Loading />}
		</div>
	);
};
