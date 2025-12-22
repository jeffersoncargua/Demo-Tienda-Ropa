// Esta es la pagina de inicio que muestra los articulos de venta para la facturacion electronica

import { useCallback, useEffect, useMemo, useState } from "react";
import { CardShop } from "./components";
import { GetCantProducts, GetProductos } from "../../services/ProductService";
import { Loading } from "../../components";
import { toast } from "react-toastify";

export const Home = () => {
	const [cantProduct, setCantProduct] = useState(0);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({ pageSize: 4, pageNumber: 1 });
	const [pagina, setPagina] = useState(0);
	const [pageList, setPageList] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [pageLimit, setPageLimit] = useState([]);

	const GetAllProducts = useCallback(async () => {
		var response = await GetProductos({
			pageSize: pagination.pageSize,
			pageNumber: pagination.pageNumber,
		});

		if (response.isSuccess) {
			setProducts(response.result);
		} else {
			setProducts([]);
		}
		setLoading(false);
	}, [pagination]);

	useMemo(async () => {
		const response = await GetCantProducts();
		setPagina(0);
		if (response.isSuccess) {
			setCantProduct(response.result);
			const numeroPaginas = parseInt(response.result / pagination.pageSize, 10);
			if (response.result % pagination.pageSize === 0) {
				setPagina(numeroPaginas);
			} else {
				setPagina(numeroPaginas + 1);
			}
		} else {
			setCantProduct(0);
			setPagina(0);
			setLoading(false);
		}
	}, [pagination]);

	useMemo(() => {
		setPageList(new Array(pagina).fill(Math.random()));
		// setPageList(new Array(15).fill(Math.random()));
		setPageLimit(new Array(2).fill(Math.random()));
	}, [pagina]);

	const HandleNextPagination = useCallback(async () => {
		if (pageList.length > pagination.pageNumber) {
			setPagination({ ...pagination, pageNumber: pagination.pageNumber + 1 });
			setLoading(true);
			await GetAllProducts();
			setLoading(false);
			setCurrentPage((currentPage) => currentPage + 1);
		} else {
			//alert("No hay mas paginas.");
			toast.error("No hay mas paginas.");
		}
		window.scrollTo(0, 0);
	}, [pagination, GetAllProducts, pageList]);

	const HandleBackPagination = useCallback(async () => {
		if (pagination.pageNumber > 1) {
			setPagination({ ...pagination, pageNumber: pagination.pageNumber - 1 });
			setLoading(true);
			await GetAllProducts();
			setLoading(false);
			setCurrentPage((currentPage) => currentPage - 1);
		} else {
			// alert("No hay mas paginas.");
			toast.error("No hay mas paginas.");
		}
		window.scrollTo(0, 0);
	}, [pagination, GetAllProducts]);

	const HandleSelectedPagination = useCallback(
		async (index) => {
			if (currentPage > index) {
				setCurrentPage(index + 1);
			} else {
				setCurrentPage(index - 1);
			}
			setPagination({ ...pagination, pageNumber: index + 1 });
			setLoading(true);
			await GetAllProducts();
			setLoading(false);
			window.scrollTo(0, 0);
		},
		[pagination, GetAllProducts, currentPage],
	);

	useEffect(() => {
		if (cantProduct > 0) {
			GetAllProducts();
		}
	}, [GetAllProducts, cantProduct]);

	return (
		<div className="p-4 w-[95%] mx-auto">
			{loading ? (
				<Loading />
			) : (
				<div className={`w-full flex flex-col space-y-5`}>
					<div
						className={`w-full flex flex-col justify-center p-4 space-y-1.5`}
					>
						<h1 className="text-2xl md:text-4xl font-extrabold text-center text-shadow-lg/80 text-shadow-neutral-500">
							Tienda de Ropa Xtreme
						</h1>
						<span className="w-[30%] md:w-[15%] h-1.5 mx-auto rounded-b-2xl bg-blue-600 border"></span>
					</div>

					{/* Esta Seccion es de chompas */}
					<section
						className={`w-full md:w-[70%] mx-auto flex flex-wrap justify-center gap-10`}
					>
						{products.length > 0 ? (
							products.map((item) => (
								<CardShop key={item.codigoPrincipal} item={item} />
							))
						) : (
							<span
								className={`text-semibold text-2xl text-center text-shadow-lg/90 text-shadow-gray-400 underline decoration-4 underline-offset-8 decoration-purple-700`}
							>
								No se encontraron registros de los productos. Inténtalo más
								tarde.
							</span>
						)}
					</section>

					{/* Seccion de la paginacion */}
					{products.length > 0 && (
						<section className="w-full flex flex-row items-center my-10">
							{/* Boton pagina regreso */}
							<div className="w-[10%] flex justify-center">
								<button
									type="button"
									onClick={() => HandleBackPagination()}
									className="bg-amber-400 flex justify-center items-center px-2 py-1.5 w-10 text-black hover:text-white rounded-l-lg"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										className="bi bi-chevron-left w-5 h-5"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
										/>
									</svg>
								</button>
							</div>

							{/* Seccion para mostrar el numero de pagina */}
							{pageList.length > 0 && (
								<div className="flex flex-row w-[80%] mx-auto">
									<div
										className={`w-full flex flex-row ${pagination.pageNumber < pageList.length - 2 ? "justify-between" : "justify-center"}`}
									>
										<div className="flex flex-row overflow-hidden w-[35%] md:w-[30%] mx-auto">
											{pageList.map((item, index) => (
												<button
													type="button"
													onClick={() => HandleSelectedPagination(index)}
													key={item}
													className={`${pagination.pageNumber === index + 1 ? "border bg-amber-300  text-gray-500" : "border bg-amber-400  text-black"} font-semibold hover:text-white flex items-center px-2 py-1.5 mx-3 w-10`}
													style={{
														transform: `translateX(-${currentPage * 3.25}rem)`,
													}}
												>
													{index + 1}
												</button>
											))}
										</div>

										{pagination.pageNumber < pageList.length - 2 && (
											<div className="w-[65%] md:w-[70%] mx-auto flex">
												<div className="space-x-3 flex justify-end items-center w-[40%]">
													<span className="rounded-full bg-amber-200 w-2 h-2"></span>
													<span className="rounded-full bg-amber-200 w-2 h-2"></span>
													<span className="rounded-full bg-amber-200 w-2 h-2"></span>
													<span className="rounded-full bg-amber-200 w-2 h-2"></span>
													<span className="rounded-full bg-amber-200 w-2 h-2"></span>
												</div>

												<div className="flex flex-row w-[60%] justify-end">
													{pageLimit.length > 0 &&
														pageLimit.map((item, index) => (
															<button
																type="button"
																onClick={() => HandleSelectedPagination(index)}
																key={item}
																className={`border bg-amber-400  text-black cursor-not-allowed font-semibold hover:text-white flex items-center px-2 py-1.5 mx-3 w-10`}
																disabled
															>
																{pageList.length + index - 1}
															</button>
														))}
												</div>
											</div>
										)}
									</div>
								</div>
							)}

							{/* Boton pagina siguiente */}
							<div className="w-[10%] flex justify-center">
								<button
									type="button"
									onClick={() => HandleNextPagination()}
									className="bg-amber-400 w-10 flex justify-end items-center px-2 py-1.5 text-black hover:text-white rounded-r-lg"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										className="bi bi-chevron-right w-5 h-5"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
										/>
									</svg>
								</button>
							</div>
						</section>
					)}
				</div>
			)}
		</div>
	);
};
