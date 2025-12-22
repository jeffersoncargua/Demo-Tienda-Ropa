// La configuracion principal de redux, permite crear los Slice necesarios para almacenar informacion y 
// recuperar los estados en cualquier parte de la aplicacion

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";

export const store = configureStore({
	reducer: {
		cartState: cartReducer,
	},
});