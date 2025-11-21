import Swal from "sweetalert2";

const SweetAlertSuccess = (title = "Se realizo la operacion con exito") => {
	Swal.fire({
		position: "center",
		icon: "success",
		title: title,
		showConfirmButton: false,
		timer: 1500,
	});
};

const SweetAlertFail = (text = "Ha ocurrido un error en la operacion") => {
	Swal.fire({
		icon: "error",
		title: "Oops...",
		text: text,
		showCancelButton: false,
		showConfirmButton: false,
		timer: 1500,
	});
};

export { SweetAlertSuccess, SweetAlertFail };
