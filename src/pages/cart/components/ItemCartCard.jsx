import ProductoImagen from "../../../assets/LogoChompra.png";

export const ItemCartCard = ({ item }) => {
	return (
		<div className=" p-4 w-full flex flex-row items-center mx-auto">
			<div className="">
				<img className="m-2" src={ProductoImagen} alt="Aqui va la imagen" />
			</div>
			<div className="">
				<span>{item.cantidad}</span>
				<span>{item.total}</span>
				<div className=""></div>
			</div>
		</div>
	);
};
