// Estos componentes permiten mostrar mensajes cuando se efectuan operaciones con el back-end

import Swal from "sweetalert2";

const SweetAlertSuccess = (title = "Se realizó la operacion con éxito") => {
	Swal.fire({
		position: "center",
		icon: "success",
		title: title,
		showConfirmButton: false,
		timer: 3500,
	});
};

const SweetAlertFail = (text = "Ha ocurrido un error en la operación") => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: text,
		showCancelButton: false,
		showConfirmButton: false,
		timer: 3500,
	});
};

const SweetAlertDelete = async () => {
	const response = await Swal.fire({
		title: "Estás seguro de cancelar la venta?",
		text: "Se eliminará los artículos de tu carrito de compras",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Sí, estoy seguro",
		cancelButtonText: "Cancelar",
	});

	return response;
};

const SweetAlertSuccessDeleted = () => {
	Swal.fire({
		title: "Se eliminó los artículos del carrito con éxito",
		text: "Tu carrito esta vacío.",
		icon: "success",
	});
};

export {
	SweetAlertSuccess,
	SweetAlertFail,
	SweetAlertDelete,
	SweetAlertSuccessDeleted,
};
