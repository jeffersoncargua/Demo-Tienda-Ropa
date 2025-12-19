import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		shoppingCart: [],
		descuento: 0.0,
		subTotal15: 0.0,
		totalIva: 0.0,
		total: 0.0,
	},
	reducers: {
		addToCart(state, action) {
			const cartItem = state.shoppingCart.find(
				(item) =>
					item.productoId === action.payload.productoId &&
					item.talla === action.payload.talla,
			);

			console.log(action.payload);

			let subtotal, totalIva, descuento, total, updatedShoppingCart;

			if (cartItem) {
				updatedShoppingCart = state.shoppingCart;
				updatedShoppingCart = updatedShoppingCart.map((item) =>
					item.productoId === action.payload.productoId &&
					item.talla === action.payload.talla
						? {
								...item,
								cantidad: action.payload.cantidad,
								total: action.payload.total,
								descuento: action.payload.descuento,
								ventaIva: action.payload.ventaIva,
							}
						: item,
				);
				subtotal = state.subTotal15 - cartItem.total; // Es el nuevo valor subtotal que se quita con el registro anterior del item ya registrado
				subtotal = subtotal + action.payload.total; // Es el nuevo valor del subtotal con la cantidad agregado al carrito de compras con el item ya registrado
				totalIva = subtotal * 0.15;
				descuento = state.descuento - cartItem.descuento;
				descuento = descuento + action.payload.descuento;
				total = subtotal + totalIva;

				// return {...state, total:total, subTotal15:subtotal, totalIva:totalIva, descuento:descuento, shoppingCart:updateShoppingCart}
			} else {
				updatedShoppingCart = state.shoppingCart.concat(action.payload);
				subtotal = state.subTotal15 + action.payload.total; // Es el valor del subtotal con el registro ingresado
				totalIva = subtotal * 0.15;
				descuento = state.descuento + action.payload.descuento;
				total = subtotal + totalIva;

				// return {...state, total:total, subTotal15:subtotal, totalIva:totalIva, descuento:descuento, shoppingCart:updateShoppingCart}
			}

			// console.log(
			// 	`CartList: ${JSON.stringify(updatedShoppingCart)}, subtotal15: ${subtotal}, descuento: ${descuento}, totalIva: ${totalIva}, total: ${total}`,
			// );

			return {
				...state,
				total: total,
				subTotal15: subtotal,
				totalIva: totalIva,
				descuento: descuento,
				shoppingCart: updatedShoppingCart,
			};
		},
		removeToCart(state, action) {
			const shoppingFilter = state.shoppingCart.filter(
				(item) => item.descripcion !== action.payload.descripcion,
			);
			const subtotal =
				state.subTotal15 -
				action.payload.precioUnitario * action.payload.cantidad; // Es el nuevo valor subtotal que se quita con el registro anterior del item ya registrado
			const totalIva = subtotal * 0.15;
			const descuento =
				state.descuento - action.payload.descuento * action.payload.cantidad;
			const total = subtotal + totalIva - descuento;

			return {
				...state,
				total: total,
				subTotal15: subtotal,
				totalIva: totalIva,
				descuento: descuento,
				shoppingCart: shoppingFilter,
			};
		},
		clearToCart(state) {
			return {
				...state,
				total: 0,
				subTotal15: 0,
				descuento: 0,
				totalIva: 0,
				shoppingCart: [],
			};
		},
	},
});

export const { addToCart, removeToCart, clearToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
