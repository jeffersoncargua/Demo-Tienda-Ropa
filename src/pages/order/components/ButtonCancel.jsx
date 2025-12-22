import { useDispatch } from "react-redux";
import {
	SweetAlertDelete,
	SweetAlertSuccessDeleted,
} from "../../../components/SweetAlertResponse";
import { clearToCart } from "../../../redux/cartSlice";
import { useNavigate } from "react-router";

export const ButtonCancel = ({
	identificacion = "",
	token = "",
	tipo = "",
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let styleClass;

	const HandleCancel = async () => {
		const result = await SweetAlertDelete();
		if (result.isConfirmed) {
			dispatch(clearToCart());
			SweetAlertSuccessDeleted();
			navigate("/fail");
		}
	};

	switch (tipo) {
		case "identificacion":
			styleClass = `${identificacion ? "hidden" : "flex"} px-5 py-2 mx-auto bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex-row justify-center items-center hover:border-2 hover:border-black`;
			break;

		case "token":
			styleClass = `${token === "" ? "flex" : "hidden"} px-4 py-2 bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex-row justify-center items-center hover:border-2 hover:border-black`;
			break;

		default:
			styleClass =
				"px-5 py-2 bg-red-400 hover:bg-red-600 rounded-lg hover:text-white flex flex-row justify-center items-center hover:border-2 hover:border-black";
			break;
	}

	return (
		<button
			type="button"
			onClick={() => HandleCancel()}
			className={`${styleClass} font-semibold`}
		>
			Cancelar Compra
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				className="bi bi-x-circle w-5 h-5 ms-3 font-extrabold"
				viewBox="0 0 16 16"
			>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
				<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
			</svg>
		</button>
	);
};
