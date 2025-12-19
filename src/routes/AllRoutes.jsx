import { Routes, Route } from "react-router";
import {
	Home,
	Cart,
	Order,
	Register,
	ProductDetail,
	Payment,
	EmptyCart,
} from "../pages";
import { useSelector } from "react-redux";

export const AllRoutes = () => {
	const shoppingCart = useSelector((state) => state.cartState.shoppingCart);
	const cartIsEmpty = shoppingCart.length > 0;

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="cart" element={cartIsEmpty ? <Cart /> : <EmptyCart />} />
			<Route path="order" element={cartIsEmpty ? <Order /> : <EmptyCart />} />
			<Route path="register" element={<Register />} />
			<Route path="productDetail/:id/:talla" element={<ProductDetail />} />
			<Route path="payment" element={<Payment />} />
		</Routes>
	);
};
