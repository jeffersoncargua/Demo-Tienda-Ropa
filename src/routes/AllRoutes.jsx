import { Routes, Route } from "react-router";
import { Home, Cart, Order, Register, ProductDetail } from "../pages";

export const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="cart" element={<Cart />} />
			<Route path="order" element={<Order />} />
			<Route path="register" element={<Register />} />
			<Route path="productDetail/:id" element={<ProductDetail />} />
		</Routes>
	);
};
