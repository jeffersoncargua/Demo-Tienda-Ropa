// Este componente permite enviar la identificacion del usuario al back-end para buscar su informacion
// para continuar con el proceso de compra y facturacion

export const FormCostumerInfomation = ({
	identificacionRef,
	handleSubmit,
	HandleCostumer,
	message,
	costumer,
}) => {
	// Este metodo permite bloquear el ingreso de cualquier caracter que no sea un numero o la tecla de borrado
	const HandleKeyDown = (event) => {
		if ((event.keyCode <= 47 || event.keyCode >= 58) && event.keyCode !== 8) {
			event.preventDefault();
		}
	};

	return (
		<form
			className="w-full ring-4 ring-amber-600 border rounded-lg mb-3 md:mb-5 text-xs md:text-sm md:shadow-lg md:shadow-black bg-amber-100"
			onSubmit={handleSubmit(HandleCostumer)}
		>
			<h1 className="text-lg md:text-xl text-center mt-2">
				1. Ingresa tu identificación
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
						className={`${costumer.identificacion && "cursor-not-allowe"} absolute inset-y-0 left-0 w-[calc(100%-7.5rem)] ml-30 px-4 rounded-r-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4 `}
						ref={identificacionRef}
						disabled={costumer.identificacion}
						onKeyDown={HandleKeyDown}
						minLength={10}
						maxLength={13}
					/>
				</label>
				<button
					type="submit"
					disabled={costumer.identificacion}
					className={`${costumer.identificacion ? "cursor-not-allowed" : "cursor-pointer"} flex flex-row justify-center items-center px-2.5 py-2 rounded-lg bg-green-600 hover:bg-green-700 hover:text-white hover:border-2 hover:border-black font-semibold`}
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
			{costumer.identificacion && (
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

			{message !== "" && (
				<p className="w-full font-semibold italic my-3 text-sm px-4">
					Nota: {message}
				</p>
			)}
		</form>
	);
};
